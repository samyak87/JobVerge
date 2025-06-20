import express from "express";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import resumeController from "../controllers/resumeController.js";
const router = express.Router();

router.post("/upload-resume",authMiddleware, upload, resumeController);

export default router;