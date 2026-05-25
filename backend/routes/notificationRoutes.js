import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getUserNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/getUserNotifications", protect, getUserNotifications)

export default router;