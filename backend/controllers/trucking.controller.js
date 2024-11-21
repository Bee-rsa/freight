import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Trucking from "../models/trucking.model.js";

export const getAllTrucking = async (req, res) => {
	try {
		const trucking = await Trucking.find({}); // find all products
		res.json({ trucking });
	} catch (error) {
		console.log("Error in getAllTrucking controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedTruckings = async (req, res) => {
	try {
		let featuredTruckings = await redis.get("featured_truckings");
		if (featuredTruckings) {
			return res.json(JSON.parse(featuredTruckings));
		}

		featuredTruckings = await Trucking.find({ isFeatured: true }).lean();

		if (!featuredTruckings) {
			return res.status(404).json({ message: "No featured truckings found" });
		}

		// store in redis for future quick access

		await redis.set("featured_truckings", JSON.stringify(featuredTruckings));

		res.json(featuredTruckings);
	} catch (error) {
		console.log("Error in getFeaturedTruckings controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createTrucking = async (req, res) => {
	try {
		const { companyName, contactNumber, contactName, businessEmail, website, province, country, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "truckings" });
		}

		const trucking = await Trucking.create({
			companyName,
			contactNumber,
			contactName,
			businessEmail,
			website,
			province,
			country,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		});

		res.status(201).json(trucking);
	} catch (error) {
		console.log("Error in createTrucking controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteTrucking = async (req, res) => {
	try {
		const trucking = await Trucking.findById(req.params.id);

		if (!trucking) {
			return res.status(404).json({ message: "Trucking not found" });
		}

		if (trucking.image) {
			const publicId = trucking.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`truckings/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Trucking.findByIdAndDelete(req.params.id);

		res.json({ message: "Trucking deleted successfully" });
	} catch (error) {
		console.log("Error in deleteTrucking controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedTruckings = async (req, res) => {
	try {
		const truckings = await Trucking.aggregate([
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

		res.json(truckings);
	} catch (error) {
		console.log("Error in getRecommendedTruckings controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getTruckingsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const truckings = await Trucking.find({ category });
		res.json({ truckings });
	} catch (error) {
		console.log("Error in getTruckingsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedTrucking = async (req, res) => {
	try {
		const trucking = await Trucking.findById(req.params.id);
		if (product) {
			trucking.isFeatured = !trucking.isFeatured;
			const updatedTrucking = await trucking.save();
			await updateFeaturedTruckingsCache();
			res.json(updatedTrucking);
		} else {
			res.status(404).json({ message: "Trucking not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedTrucking controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedTruckingsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredTruckings = await Trucking.find({ isFeatured: true }).lean();
		await redis.set("featured_truckings", JSON.stringify(featuredTruckings));
	} catch (error) {
		console.log("error in update cache function");
	}
}