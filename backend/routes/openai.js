// backend/routes/openai.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/summarize", async (req, res) => {
  const { title, description } = req.body;

  try {
    const prompt = `Provide a concise summary for the book titled "${title}". Description: ${description}. Also, recommend 3 similar books with brief descriptions.`;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    res.json({ summary: aiResponse });
  } catch (error) {
    console.error("Error fetching summary from OpenAI:", error);
    res.status(500).send("Error fetching summary");
  }
});

module.exports = router;
