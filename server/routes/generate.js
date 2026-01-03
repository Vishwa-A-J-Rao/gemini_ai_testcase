import express from "express";
import { generateTestCases } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { requirement } = req.body;
    let data = await generateTestCases(requirement);

    // Clean AI output
    data = data.replace(/```json|```/g, "").trim();

    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

export default router;
