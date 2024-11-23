import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Courier from "../models/courier.model.js";

export const getAllCouriers = async (req, res) => {
	try {
		const couriers = await Courier.find({}); // find all products
		res.json({ couriers });
	} catch (error) {
		console.log("Error in getAllCouriers controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedCouriers = async (req, res) => {
	try {
		let featuredCouriers = await redis.get("featured_couriers");
		if (featuredCouriers) {
			return res.json(JSON.parse(featuredCouriers));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredCouriers = await Courier.find({ isFeatured: true }).lean();

		if (!featuredCouriers) {
			return res.status(404).json({ message: "No featured couriers found" });
		}

		// store in redis for future quick access

		await redis.set("featured_couriers", JSON.stringify(featuredCouriers));

		res.json(featuredCouriers);
	} catch (error) {
		console.log("Error in getFeaturedCouriers controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createCourier = async (req, res) => {
	try {
		const { courierService, baseRate, contactNumber, contactName, businessEmail, website, province, country, description, price, image, eta } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "couriers" });
		}

		const courier = await Courier.create({
			courierService,
			baseRate,
			contactNumber,
			contactName,
			businessEmail,
			website,
			province,
			country,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			eta,
		});

		res.status(201).json(courier);
	} catch (error) {
		console.log("Error in createCourier controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteCourier = async (req, res) => {
	try {
		const courier = await Courier.findById(req.params.id);

		if (!courier) {
			return res.status(404).json({ message: "Courier not found" });
		}

		if (courier.image) {
			const publicId = courier.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`couriers/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Courier.findByIdAndDelete(req.params.id);

		res.json({ message: "Courier deleted successfully" });
	} catch (error) {
		console.log("Error in deleteCourier controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedCouriers = async (req, res) => {
	try {
		const couriers = await Courier.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					courierService: 1,
					baseRate: 1,
					contactNumber: 1,
					contactName: 1,
					businessEmail: 1,
					website: 1,
					province: 1, 
					country: 1,
					description: 1,
					image: 1,
					price: 1,
					eta: 1, 
				},
			},
		]);

		res.json(couriers);
	} catch (error) {
		console.log("Error in getRecommendedCouriers controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getCouriersByEta = async (req, res) => {
	const { eta } = req.params;
	try {
		const couriers = await Courier.find({ eta });
		res.json({ couriers });
	} catch (error) {
		console.log("Error in getCouriersByEta controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedCourier = async (req, res) => {
	try {
		const courier = await Courier.findById(req.params.id);
		if (courier) {
			courier.isFeatured = !courier.isFeatured;
			const updatedCourier = await courier.save();  
			await updateFeaturedCouriersCache();
			res.json(updatedCourier);
		} else {
			res.status(404).json({ message: "Courier not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedCourier controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedCouriersCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredCouriers = await Courier.find({ isFeatured: true }).lean();
		await redis.set("featured_couriers", JSON.stringify(featuredCouriers));
	} catch (error) {
		console.log("error in update cache function");
	}
}