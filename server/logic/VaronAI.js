import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main({ prompt }) {
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

export default main;
