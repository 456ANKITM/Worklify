import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllJobs, getAllProposalsForJob, getJobsBasedOnProfile, getJobsByCategory, postJob, searchJobs, submitProposal } from "../controllers/jobController.js";

const router = express.Router();

router.post("/postJob", protect, postJob)
router.get("/getAllJobs", getAllJobs);
router.get("/searchJobs", searchJobs);
router.get("/getJobsByProfile", protect, getJobsBasedOnProfile);
router.get("/category/:category", getJobsByCategory)
router.post("/:jobId/proposal", protect, submitProposal);
router.get("/:jobId/proposals", protect, getAllProposalsForJob);

export default router; 

