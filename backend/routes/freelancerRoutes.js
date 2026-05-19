import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addCategory, addLinks, addSkills, removeCategory, removeLinks, removeSkills, updateBasicProfile } from "../controllers/freelancerController.js";

const router = express.Router();

router.post("/update/basic-profile", protect, updateBasicProfile);
router.post("/addSkills", protect, addSkills);
router.post("/removeSkills", protect, removeSkills);
router.post("/addCategory", protect, addCategory);
router.post("/removeCategory", protect, removeCategory);
router.post("/addLinks", protect, addLinks);
router.delete("/removeLinks", protect, removeLinks);

export default router;