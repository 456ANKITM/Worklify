import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { removeProfileImage, updateClientBasicProfile, updateClientProfileImage } from "../controllers/clientController.js";
import { uploadFields } from "../middleware/upload.js";

const router = express.Router();

router.post("/update/basic-profile", protect, updateClientBasicProfile )
router.put("/updateProfileImage", protect, uploadFields, updateClientProfileImage )
router.delete("/removeProfileImage", protect, removeProfileImage);

export default router;

