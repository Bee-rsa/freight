import express from "express";
import {
	createProfile,
	deleteProfile,
	getAllProfiles,
	getFeaturedProfiles,
	getRecommendedProfiles,
	toggleFeaturedProfile,
	updateProfile,
} from "../controllers/profile.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllProfiles);
router.get("/featured", getFeaturedProfiles);
router.get("/recommendations", getRecommendedProfiles);
router.post("/", protectRoute, createProfile);
router.patch("/:id", protectRoute, toggleFeaturedProfile);
router.delete("/:id", protectRoute, deleteProfile);
router.put("/update", protectRoute, updateProfile);

export default router;