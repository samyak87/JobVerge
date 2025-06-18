import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileSize: Number,
  data: Buffer, 
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Resume', resumeSchema);
