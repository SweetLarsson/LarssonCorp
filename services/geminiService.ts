
import { GoogleGenAI } from "@google/genai";

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
        systemInstruction: "You are the Larsson Corp Creative Consultant. Your tone is Visionary, Confident, Innovative, and Trustworthy. When providing reports or strategy, use structured formats: use '---' for section dividers, use Markdown-style tables for comparisons or data, and use clear indentations for hierarchies. DO NOT use double asterisks (**) for bolding; instead, just write the text clearly as you are speaking to an executive. Focus on being concise and authoritative. Ensure your output is polished and ready for presentation.",
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm experiencing a creative block right now. Please try again in a moment, or contact our team directly!";
  }
};
