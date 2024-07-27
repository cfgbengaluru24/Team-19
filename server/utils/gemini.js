const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are an assessment evaluator of communication skills based on the quality of answer for the given question and answer and you have to return the score between 1 to 5 and do not respond anything else.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(inputMessage) {
  try {
    const chatSession = model.startChat({
      generationConfig,
    });

    const result = await chatSession.sendMessage(inputMessage);
    return result.response; // Return the correct response object
  } catch (error) {
    console.error("Error during chat session:", error);
    throw error;
  }
}

module.exports = { run }; // Export the function correctly as an object
