import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.VARON_AI_API_KEY});

async function ModelVaronAI({ prompt }) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a Varon AI. Powerful AI assistant",
    },
  });
  const VaronAIResponse = response.text;
  return VaronAIResponse;
}

export default ModelVaronAI;
