import { NextRequest, NextResponse } from "next/server";
import { generateProductData } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { title, image } = await req.json();

    const prompt = `
      You are an expert e-commerce content strategist. 
      Generate a professional, SEO-optimized product listing based on the following information:
      ${title ? `Title: ${title}` : "An image of a product"}

      Provide the following in JSON format:
      {
        "title": "Compelling, SEO-optimized title",
        "description": "Detailed, persuasive product description with key features",
        "category": "One of: Electronics, Smartwatches, Laptops, Gaming, Audio, Accessories",
        "brand": "Suggested brand name",
        "price": 0, // Suggest a realistic price if possible, or 0
        "tags": ["tag1", "tag2", "tag3"],
        "marketingCopy": "A short, catchy marketing slogan"
      }
    `;

    const result = await generateProductData(prompt, image);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Generation error:", error);
    return NextResponse.json({ error: "Failed to generate product data" }, { status: 500 });
  }
}
