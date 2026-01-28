
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIInsights = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Proporciona un resumen técnico y profesional de un párrafo sobre el impacto ambiental (EIQ) en el cultivo de ${topic} en Latinoamérica, mencionando desafíos de resistencia de malezas o plagas.`,
      config: {
        systemInstruction: "Eres un experto senior en agronomía y toxicología ambiental especializado en el mercado de Sudamérica (Cono Sur). Tu tono es científico, objetivo y preventivo.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "No se pudieron obtener insights en este momento.";
  }
};

export const searchGroundingLatestReports = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Busca los últimos reportes de 2024 sobre ${query} en Argentina, Brasil y Uruguay.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return {
      text: response.text,
      links: links
    };
  } catch (error) {
    console.error("Search Grounding Error:", error);
    return null;
  }
};
