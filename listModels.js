import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const listModels = async () => {
  try {
    const res = await axios.get(
      'https://generativelanguage.googleapis.com/v1/models',
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );
    console.log("✅ Available Models:");
    console.log(res.data.models.map(m => m.name));
  } catch (err) {
    console.error("❌ Error fetching models:", err.response?.data || err.message);
  }
};

listModels();
