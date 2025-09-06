import { GoogleGenAI } from "@google/genai";

export async function Embed() {
    console.log(process.env.GEMINI_API_KEY)
    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: 'What is the meaning of life?',
        config:{
            outputDimensionality:32
        }
    });

    console.log(response.embeddings);
}