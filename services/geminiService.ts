
import { GoogleGenAI } from "@google/genai";

const getGenAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey });
};

const callGemini = async (prompt: string): Promise<string> => {
    try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        
        if (response.text) {
            return response.text;
        } else {
            throw new Error("No text response from Gemini.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from AI.");
    }
};

export const summarizeText = async (text: string): Promise<string> => {
    const prompt = `Resuma o seguinte texto para uma entrada de bloco de notas concisa. Concentre-se nos pontos-chave e nas informações mais importantes:\n\n---\n${text}`;
    return callGemini(prompt);
};

export const improveWriting = async (text: string): Promise<string> => {
    const prompt = `Melhore o texto a seguir, corrigindo a gramática, tornando-o mais conciso e claro, sem alterar seu significado original. O texto é para uma nota pessoal:\n\n---\n${text}`;
    return callGemini(prompt);
};
