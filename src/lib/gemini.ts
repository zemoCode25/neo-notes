import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({});
// Initialize model (use Gemini 1.5 or 1.0 depending on your use case)
export const getGenAI = () => {
  return genAI;
};
