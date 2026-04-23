import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { Review } from "./types";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
export const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface GeneratedProductData {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  error?: string;
}

interface ReviewAnalysis {
  summary: string;
  sentiment: string;
}

/**
 * Generates an embedding for a given text string.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Error generating embedding:", error);
    return [];
  }
}

/**
 * Generates product metadata from an image (base64) or title.
 */
export async function generateProductData(prompt: string, imageBase64?: string): Promise<GeneratedProductData> {
  try {
    const parts: Part[] = [{ text: prompt }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64.split(",")[1] || imageBase64,
          mimeType: "image/png",
        },
      });
    }

    const result = await visionModel.generateContent(parts);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as GeneratedProductData;
    }
    return { error: "Failed to parse AI response" };
  } catch (error) {
    console.error("Error generating product data:", error);
    throw error;
  }
}

/**
 * Summarizes product reviews.
 */
export async function summarizeReviews(reviews: Array<{ rating: number, comment: string }>): Promise<ReviewAnalysis> {
  const reviewsText = reviews.map(r => `Rating: ${r.rating}, Comment: ${r.comment}`).join("\n\n");
  const prompt = `
    Analyze the following product reviews and provide a concise, engaging one-paragraph summary for potential buyers. 
    Highlight key strengths and common complaints. Also, determine the overall sentiment (Positive, Neutral, or Negative).
    Format the response as JSON: { "summary": "...", "sentiment": "..." }

    Reviews:
    ${reviewsText}
  `;

  try {
    const result = await chatModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as ReviewAnalysis;
    }
    return { summary: text, sentiment: "Unknown" };
  } catch (error) {
    console.error("Error summarizing reviews:", error);
    return { summary: "Reviews summary unavailable.", sentiment: "Unknown" };
  }
}
