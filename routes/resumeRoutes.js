import express from "express";
import { resumeController } from "../controllers/resumeController.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

router.post("/upload-resume",upload.single('file'),resumeController);

export default router;