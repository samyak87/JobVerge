import Resume from '../models/resumeModel.js';

export const resumeController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newResume = new Resume({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      data: file.buffer,
    });

    await newResume.save();

    res.status(201).json({
      message: "Resume uploaded and stored in database",
      fileId: newResume._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading resume",
      error: error.message,
    });
  }
};
