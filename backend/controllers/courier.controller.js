import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Courier from "../models/courier.model.js";

// Fetch all couriers
export const getAllCouriers = async (req, res) => {
	try {
		const couriers = await Courier.find({}).lean();  // Use .lean() for better performance
		// Add formattedInfo to each courier
		const formattedCouriers = couriers.map(courier => ({
			...courier,
			formattedInfo: courier.formattedInfo,  // Include the virtual field
		}));

		res.json({ couriers: formattedCouriers });
	} catch (error) {
		console.log("Error in getAllCouriers controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Fetch featured couriers
export const getFeaturedCouriers = async (req, res) => {
	try {
		let featuredCouriers = await redis.get("featured_couriers");
		if (featuredCouriers) {
			return res.json(JSON.parse(featuredCouriers));
		}

		// If not in redis, fetch from MongoDB
		featuredCouriers = await Courier.find({ isFeatured: true }).lean();

		if (!featuredCouriers) {
			return res.status(404).json({ message: "No featured couriers found" });
		}

		// Add formattedInfo to each featured courier
		const formattedFeaturedCouriers = featuredCouriers.map(courier => ({
			...courier,
			formattedInfo: courier.formattedInfo,  // Include the virtual field
		}));

		// Store in Redis for future quick access
		await redis.set("featured_couriers", JSON.stringify(formattedFeaturedCouriers));

		res.json(formattedFeaturedCouriers);
	} catch (error) {
		console.log("Error in getFeaturedCouriers controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Create a new courier
export const createCourier = async (req, res) => {
	try {
		const { courierService, description, image, localMaxKilometers, localRateKilometers, regionalMaxKilometers, regionalRateKilometers, nationalMaxKilometers, nationalRateKilometers, localRateKilograms, localKilogramOverweightCharge, regionalRateKilograms, regionalKilogramOverweightCharge, nationalRateKilograms, nationalKilogramOverweightCharge, localBaseRate, localFuelSurcharge, regionalBaseRate, regionalFuelSurcharge, nationalBaseRate, nationalFuelSurcharge, localDimensionRate, localDimensionOverweightCharge, regionalDimensionRate, regionalDimensionOverweightCharge, nationalDimensionRate, nationalDimensionOverweightCharge, residentialDeliveryFee, signatureRequired, packageRedeliveryFee, dangerousGoodsHandlingFee, specialHandlingFee, saturdayDeliveryFee, holidayDeliveryFee, weekendPickupFee, nonStandardPickupFee, } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "couriers" });
		}

		const courier = await Courier.create({
			courierService,
			description,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			localMaxKilometers, localRateKilometers, regionalMaxKilometers, regionalRateKilometers, nationalMaxKilometers, nationalRateKilometers, 
			localRateKilograms, localKilogramOverweightCharge, regionalRateKilograms, regionalKilogramOverweightCharge, nationalRateKilograms, nationalKilogramOverweightCharge,
			localBaseRate, localFuelSurcharge, regionalBaseRate, regionalFuelSurcharge, nationalBaseRate, nationalFuelSurcharge,
			localDimensionRate, localDimensionOverweightCharge, regionalDimensionRate, regionalDimensionOverweightCharge, nationalDimensionRate, nationalDimensionOverweightCharge,
			residentialDeliveryFee, signatureRequired, packageRedeliveryFee, dangerousGoodsHandlingFee, specialHandlingFee, saturdayDeliveryFee, holidayDeliveryFee, weekendPickupFee, nonStandardPickupFee,
		}); 

		res.status(201).json(courier);
	} catch (error) {
		console.log("Error in createCourier controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Delete a courier
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
				console.log("deleted image from Cloudinary");
			} catch (error) {
				console.log("Error deleting image from Cloudinary", error);
			}
		}

		await Courier.findByIdAndDelete(req.params.id);

		res.json({ message: "Courier deleted successfully" });
	} catch (error) {
		console.log("Error in deleteCourier controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Get recommended couriers (random sample)
export const getRecommendedCouriers = async (req, res) => {
	try {
		const couriers = await Courier.aggregate([
			{
				$sample: { size: 4 },  // Sample 4 random couriers
			},
			{
				$project: {
					_id: 1,
					courierService: 1,
					description: 1,
					image: 1,
					localMaxKilometers: 1, localRateKilometers: 1, regionalMaxKilometers: 1, regionalRateKilometers: 1, nationalMaxKilometers: 1, nationalRateKilometers: 1,
					localRateKilograms: 1, localKilogramOverweightCharge: 1, regionalRateKilograms: 1, regionalKilogramOverweightCharge: 1, nationalRateKilograms: 1, nationalKilogramOverweightCharge: 1,
					localBaseRate: 1, localFuelSurcharge: 1, regionalBaseRate: 1, regionalFuelSurcharge: 1, nationalBaseRate: 1, nationalFuelSurcharge: 1,
					localDimensionRate: 1, localDimensionOverweightCharge: 1, regionalDimensionRate: 1, regionalDimensionOverweightCharge: 1, nationalDimensionRate: 1, nationalDimensionOverweightCharge: 1,
					residentialDeliveryFee: 1, signatureRequired: 1, packageRedeliveryFee: 1, dangerousGoodsHandlingFee: 1, specialHandlingFee: 1, saturdayDeliveryFee: 1, holidayDeliveryFee: 1, weekendPickupFee: 1, nonStandardPickupFee: 1,
				},
			},
		]);

		res.json(couriers);
	} catch (error) {
		console.log("Error in getRecommendedCouriers controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Get couriers by ETA (estimated time of arrival)
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

// Toggle featured status of a courier
export const toggleFeaturedCourier = async (req, res) => {
	try {
		const courier = await Courier.findById(req.params.id);
		if (courier) {
			courier.isFeatured = !courier.isFeatured;
			const updatedCourier = await courier.save();
			await updateFeaturedCouriersCache();  // Update the cache after toggling the featured status
			res.json(updatedCourier);
		} else {
			res.status(404).json({ message: "Courier not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedCourier controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Helper function to update the featured couriers cache in Redis
async function updateFeaturedCouriersCache() {
	try {
		const featuredCouriers = await Courier.find({ isFeatured: true }).lean();
		await redis.set("featured_couriers", JSON.stringify(featuredCouriers));
	} catch (error) {
		console.log("Error in updateFeaturedCouriersCache", error);
	}
}
