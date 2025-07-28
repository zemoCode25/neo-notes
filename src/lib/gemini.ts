import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Initialize model (use Gemini 1.5 or 1.0 depending on your use case)
export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-pro" }); // or 'gemini-pro-vision' for images
};
