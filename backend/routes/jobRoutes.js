import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { approveCompletionRequest, getAllJobs, getAllProposalsForJob, getJobsBasedOnProfile, getJobsByCategory, hireFreelancer, postJob, rejectCompletionRequest, searchJobs, sendCompletionRequest, submitProposal } from "../controllers/jobController.js";

const router = express.Router();

router.post("/postJob", protect, postJob)
router.get("/getAllJobs", getAllJobs);
router.get("/searchJobs", searchJobs);
router.get("/getJobsByProfile", protect, getJobsBasedOnProfile);
router.get("/category", getJobsByCategory)
router.post("/:jobId/proposal", protect, submitProposal);
router.get("/:jobId/proposals", protect, getAllProposalsForJob);
router.patch("/hire/:jobId/:proposalId", protect, hireFreelancer);
router.patch("/:agreementId/completion-request", protect, sendCompletionRequest);
router.patch("/:agreementId/approve-completion", protect, approveCompletionRequest);
router.patch("/:agreementId/reject-completion", protect, rejectCompletionRequest);

export default router; 

