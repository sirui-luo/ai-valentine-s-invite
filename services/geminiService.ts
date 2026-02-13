import { GoogleGenAI } from "@google/genai";

export const generateRomanticMessage = async (
  sender: string,
  receiver: string,
  tone: string = "romantic and witty"
): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment variables.");
    return "I love you more than words can say!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Write a short, ${tone} Valentine's Day invitation message from ${sender} to ${receiver}. Keep it under 30 words. Make it personal and sweet.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Will you be my Valentine?";
  } catch (error) {
    console.error("Error generating message:", error);
    return "Will you be my Valentine?";
  }
};