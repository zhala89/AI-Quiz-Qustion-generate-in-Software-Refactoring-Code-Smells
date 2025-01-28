import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",  // Changed to use the standard gemini-pro model
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 2048,
};

export async function generateQuestion(topic: string) {
  try {
    const prompt = `Generate a quiz question about ${topic} in software engineering, specifically focusing on refactoring and code smells. The question should be clear and concise.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating question:', error);
    throw error;
  }
}