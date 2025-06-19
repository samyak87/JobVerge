import pdf from 'pdf-parse';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export default async function resumeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const buffer = req.file.buffer;
    const data = await pdf(buffer);
    const rawText = data.text;

    if (!rawText || rawText.trim().length < 50) {
      return res.status(400).json({ message: "Resume is too short or couldn't be parsed." });
    }

    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent',
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You're an expert resume writer. Improve the following resume to make it more ATS-friendly:
- Add clarity, better formatting, and relevant keywords
- Don't invent fake experiences or change job titles

Resume:
${rawText}`
              }
            ]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY }
      }
    );

    const improvedResume = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!improvedResume) {
      return res.status(500).json({ message: "Failed to generate improved resume." });
    }

    const filename = `Improved_${req.file.originalname.replace(/\.[^/.]+$/, "")}.txt`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'text/plain');
    res.send(improvedResume);

  } catch (error) {
    console.error("Error processing resume:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}
