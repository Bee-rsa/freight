import express from "express";
import {
	createCourier,
	deleteCourier,
	getAllCouriers,
	getFeaturedCouriers,
	getCouriersByEta,
	getRecommendedCouriers,
	toggleFeaturedCourier,
} from "../controllers/courier.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllCouriers); // Fetch all couriers
router.get("/featured", getFeaturedCouriers); // Fetch featured couriers
router.get("/category/:category", getCouriersByEta); // Fetch couriers by category
router.get("/recommendations", getRecommendedCouriers); // Fetch recommended couriers
router.post("/", protectRoute, createCourier); // Create a new courier
router.patch("/:id", protectRoute, toggleFeaturedCourier); // Toggle featured status for courier
router.delete("/:id", protectRoute, deleteCourier); // Delete a courier

export default router;
