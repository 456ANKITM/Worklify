import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addCategory, addSkills, removeCategory, removeSkills, updateBasicProfile } from "../controllers/freelancerController.js";

const router = express.Router();

router.post("/update/basic-profile", protect, updateBasicProfile);
router.post("/addSkills", protect, addSkills);
router.post("/removeSkills", protect, removeSkills);
router.post("/addCategory", protect, addCategory);
router.post("/removeCategory", protect, removeCategory);

export default router;