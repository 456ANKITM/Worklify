import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { postJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/postJob", protect, postJob)

export default router; 

