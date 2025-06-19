// middleware/upload.js
import multer from 'multer';

const storage = multer.memoryStorage(); // store in memory
const upload = multer({ storage });

export default upload.single('resume'); // ✅ export the middleware
