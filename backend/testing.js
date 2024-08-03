import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

import OpenAI from "openai";

// Debugging: Log the API key to verify it's loaded
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "What is football" }],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
}

main();
