// server.js
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables from the .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey:
    "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",
});

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint to generate a summary and similar books
app.post("/api/summary", async (req, res) => {
  try {
    const { description, categories } = req.body;

    console.log("Description:", description);
    console.log("Categories:", categories);

    const summaryPrompt = `Provide a brief summary of the following book description: "${description}"`;

    const similarBooksPrompt = `Suggest 5 books similar to the description: "${description}" and based on the categories: "${categories.join(
      ", "
    )}"`;

    const summaryCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: summaryPrompt }],
    });

    const similarBooksCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: similarBooksPrompt }],
    });

    const summaryResponse = summaryCompletion.choices[0].message.content.trim();
    console.log("Summary Response:", summaryResponse);

    const similarBooksResponse =
      similarBooksCompletion.choices[0].message.content
        .trim()
        .split("\n")
        .slice(0, 5);

    console.log("Similar Books Response:", similarBooksResponse);

    res.json({
      summary: summaryResponse,
      similarBooks: similarBooksResponse,
    });
  } catch (error) {
    console.error("Error generating summary and similar books:", error);
    res
      .status(500)
      .json({ error: "Unable to generate summary and similar books." });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
