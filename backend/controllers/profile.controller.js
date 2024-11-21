import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Profile from "../models/profile.model.js";

export const getAllProfiles = async (req, res) => {
	try {
		const profile = await Profile.find({}); // find all products
		res.json({ profile });
	} catch (error) {
		console.log("Error in getAllProfile controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
  
export const getFeaturedProfiles = async (req, res) => {
	try {
		let featuredProfiles = await redis.get("featured_profiles");
		if (featuredProfiles) {
			return res.json(JSON.parse(featuredProfiles));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProfiles = await Profile.find({ isFeatured: true }).lean();

		if (!featuredProfiles) {
			return res.status(404).json({ message: "No featured profiles found" });
		}

		// store in redis for future quick access

		await redis.set("featured_profiles", JSON.stringify(featuredProfiles));

		res.json(featuredProfiles);
	} catch (error) {
		console.log("Error in getFeaturedProfiles controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProfile = async (req, res) => {
	try {
		const { companyName, contactNumber, contactName, businessEmail, website, province, price, category, country, description, image } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "profiles" });
		}

		const profiles = await Profile.create({
			companyName,
			contactNumber,
			contactName,
			businessEmail,
			website,
			province,
			country,
			price,
			category,
			description,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
		});

		res.status(201).json(profiles);
	} catch (error) {
		console.log("Error in createProfile controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProfile = async (req, res) => {
	try {
		const profile = await Profile.findById(req.params.id);

		if (!profile) {
			return res.status(404).json({ message: "Profile not found" });
		}

		if (profile.image) {
			const publicId = profile.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`profiles/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Profile.findByIdAndDelete(req.params.id);

		res.json({ message: "Profile deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProfile controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProfiles = async (req, res) => {
	try {
		const profiles = await Profile.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					companyName: 1,
					contactNumber: 1,
					contactName: 1,
					businessEmail: 1,
					website: 1,
					province: 1, 
					country: 1,
					description: 1,
					image: 1,
					price: 1, 
				},
			},
		]);

		res.json(profiles);
	} catch (error) {
		console.log("Error in getRecommendedProfiles controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProfile = async (req, res) => {
	try {
		const profile = await Profile.findById(req.params.id);
		if (profile) {
			profile.isFeatured = !profile.isFeatured;
			const updatedProfile = await profile.save();
			await updateFeaturedProfilesCache();
			res.json(updatedProfile);
		} else {
			res.status(404).json({ message: "Profile not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProfile controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProfilesCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProfiles = await Profile.find({ isFeatured: true }).lean();
		await redis.set("featured_profiles", JSON.stringify(featuredProfiles));
	} catch (error) {
		console.log("error in update cache function");
	}
}

export const updateProfile = async (req, res) => {

	try {
		const { image, ...otherData } = req.body;

		let updatedData = otherData;

		if (image) {
			// base64 format
			if (image.startsWith("data:image")) {
				try {
					const uploadResponse = await cloudinary.uploader.upload(image);
					updatedData.image = uploadResponse.secure_url;
				} catch (error) {
					console.error("Error uploading image:", uploadError);

					return res.status(400).json({
						success: false,
						message: "Error uploading image",
					});
				}
			}
		}

		const updatedOperator = await Operator.findByIdAndUpdate(req.operator.id, updatedData, { new: true });

		res.status(200).json({
			success: true,
			operator: updatedOperator,
		});
	} catch (error) {
		console.log("Error in updateProfile: ", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};