import express from "express";
import {
	createTrucking,
	deleteTrucking,
	getAllTrucking,
	getFeaturedTruckings,
	getTruckingsByCategory,
	getRecommendedTruckings,
	toggleFeaturedTrucking,
} from "../controllers/trucking.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllTrucking);
router.get("/featured", getFeaturedTruckings);
router.get("/category/:category", getTruckingsByCategory);
router.get("/recommendations", getRecommendedTruckings);
router.post("/", protectRoute, createTrucking);
router.patch("/:id", protectRoute, toggleFeaturedTrucking);
router.delete("/:id", protectRoute, deleteTrucking);

export default router;