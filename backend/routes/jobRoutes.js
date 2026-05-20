import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllJobs, getJobsBasedOnProfile, getJobsByCategory, postJob, searchJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/postJob", protect, postJob)
router.get("/getAllJobs", getAllJobs);
router.get("/searchJobs", searchJobs);
router.get("/getJobsByProfile", protect, getJobsBasedOnProfile);
router.get("/getJobsByCategory", protect, getJobsByCategory );

export default router; 

