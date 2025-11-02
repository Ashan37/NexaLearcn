// backend/controllers/aiController.js
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAdvice = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }

    const prompt = `You are an AI Education Advisor. User question: "${question}". 
Provide a personalized learning path, recommended courses, and steps to achieve the goal.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI Advice Error:", error);
    res.status(500).json({ error: "Failed to get advice from AI." });
  }
};
