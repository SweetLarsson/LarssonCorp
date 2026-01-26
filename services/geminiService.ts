
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly as per Gemini API guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCreativeAdvice = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are the Larsson Corp Creative Consultant. Your tone is Visionary, Confident, Innovative, and Trustworthy. You help users with graphic design ideas, media strategy, and course recommendations for Larsson Corp. Keep responses professional, concise, and inspiring.",
        temperature: 0.7,
      }
    });
    
    // Access response.text property directly as it returns the extracted string output
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing a creative block right now. Please try again in a moment, or contact our team directly!";
  }
};
