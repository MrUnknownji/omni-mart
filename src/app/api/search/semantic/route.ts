import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Product, IProduct } from "@/lib/models/Product";
import { generateEmbedding } from "@/lib/ai";
import { cosineSimilarity } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // 1. Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query);
    if (!queryEmbedding || queryEmbedding.length === 0) {
      return NextResponse.json({ error: "Failed to generate embedding" }, { status: 500 });
    }

    // 2. Fetch all active products
    const products = (await Product.find({ status: "Active" })) as IProduct[];

    // 3. Ensure products have embeddings (Lazy generation for demo)
    const productsWithEmbeddings = await Promise.all(products.map(async (p) => {
      if (!p.embedding || p.embedding.length !== queryEmbedding.length) {
        const textToEmbed = `${p.title} ${p.description} ${p.category} ${p.brand}`;
        const embedding = await generateEmbedding(textToEmbed);
        p.embedding = embedding;
        await Product.updateOne({ _id: p._id }, { embedding });
      }
      return p;
    }));

    // 4. Calculate similarity and sort
    const scoredProducts = productsWithEmbeddings.map(p => ({
      ...p.toObject(),
      score: cosineSimilarity(queryEmbedding, p.embedding || [])
    }));

    const results = scoredProducts
      .filter(p => p.score > 0.3) // Threshold for relevance
      .sort((a, b) => b.score - a.score)
      .slice(0, 12); // Limit results

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Semantic search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
