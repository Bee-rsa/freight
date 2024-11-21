import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Vessel from "../models/vessel.model.js";

export const getAllVessels = async (req, res) => {
	try {
		const vessel = await Vessel.find({}); // find all products
		res.json({ vessel });
	} catch (error) {
		console.log("Error in getAllVessel controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
  
export const getFeaturedVessels = async (req, res) => {
	try {
		let featuredVessels = await redis.get("featured_vessels");
		if (featuredVessels) {
			return res.json(JSON.parse(featuredVessels));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredVessels = await Vessel.find({ isFeatured: true }).lean();

		if (!featuredVessels) {
			return res.status(404).json({ message: "No featured vessels found" });
		}

		// store in redis for future quick access

		await redis.set("featured_vessels", JSON.stringify(featuredVessels));

		res.json(featuredVessels);
	} catch (error) {
		console.log("Error in getFeaturedVessels controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createVessel = async (req, res) => {
	try {
		const { companyName, contactNumber, contactName, businessEmail, website, province, price, category, country, description, image } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "vessels" });
		}

		const vessels = await Vessel.create({
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

		res.status(201).json(vessels);
	} catch (error) {
		console.log("Error in createVessel controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteVessel = async (req, res) => {
	try {
		const vessel = await Vessel.findById(req.params.id);

		if (!vessel) {
			return res.status(404).json({ message: "Vessel not found" });
		}

		if (vessel.image) {
			const publicId = vessel.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`vessels/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Vessel.findByIdAndDelete(req.params.id);

		res.json({ message: "Vessel deleted successfully" });
	} catch (error) {
		console.log("Error in deleteVessel controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedVessels = async (req, res) => {
	try {
		const vessels = await Vessel.aggregate([
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

		res.json(vessels);
	} catch (error) {
		console.log("Error in getRecommendedVessels controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedVessel = async (req, res) => {
	try {
		const vessel = await Vessel.findById(req.params.id);
		if (vessel) {
			vessel.isFeatured = !vessel.isFeatured;
			const updatedVessel = await vessel.save();
			await updateFeaturedVesselsCache();
			res.json(updatedVessel);
		} else {
			res.status(404).json({ message: "Vessel not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedVessel controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedVesselsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredVessels = await Vessel.find({ isFeatured: true }).lean();
		await redis.set("featured_vessels", JSON.stringify(featuredVessels));
	} catch (error) {
		console.log("error in update cache function");
	}
}