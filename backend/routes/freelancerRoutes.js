import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addCategory, addCertification, addEducation, addExperience, addLinks, addSkills, getAllReviews, removeCategory, removeCertification, removeEducation, removeExperience, removeLinks, removeProfileImage, removeSkills, toogleAvailability, updateBasicProfile, updateProfileImage } from "../controllers/freelancerController.js";
import { uploadFields } from "../middleware/upload.js";

const router = express.Router();

router.post("/update/basic-profile", protect, updateBasicProfile);
router.post("/addSkills", protect, addSkills);
router.post("/removeSkills", protect, removeSkills);
router.post("/addCategory", protect, addCategory);
router.post("/removeCategory", protect, removeCategory);
router.post("/addLinks", protect, addLinks);
router.delete("/removeLinks", protect, removeLinks);
router.post("/addExperience", protect, addExperience);
router.delete("/removeExperience", protect, removeExperience);
router.post("/addEducation", protect, addEducation);
router.delete("/removeEducation", protect, removeEducation );
router.post("/addCertification", protect, addCertification);
router.delete("/removeCertification", protect, removeCertification);
router.put("/changeAvailability", protect, toogleAvailability)
router.put("/updateProfileImage", protect, uploadFields, updateProfileImage)
router.delete("/removeProfileImage", protect, removeProfileImage);
router.get("/reviews/:freelancerId", getAllReviews);

export default router;