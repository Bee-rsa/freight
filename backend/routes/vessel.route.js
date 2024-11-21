import express from "express";
import {
	createVessel,
	deleteVessel,
	getAllVessels,
	getFeaturedVessels,
	getRecommendedVessels,
	toggleFeaturedVessel,
} from "../controllers/vessel.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllVessels);
router.get("/featured", getFeaturedVessels);
router.get("/recommendations", getRecommendedVessels);
router.post("/", protectRoute, createVessel);
router.patch("/:id", protectRoute, toggleFeaturedVessel);
router.delete("/:id", protectRoute, deleteVessel);

export default router;