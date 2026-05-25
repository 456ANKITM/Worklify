import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getUnreadNotificationsCount, getUserNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/getUserNotifications", protect, getUserNotifications)
router.get("/unread-count", protect, getUnreadNotificationsCount);

export default router;