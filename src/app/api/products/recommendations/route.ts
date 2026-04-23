import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Product, IProduct } from "@/lib/models/Product";
import { cosineSimilarity } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { cartProductIds } = await req.json();

    if (!cartProductIds || cartProductIds.length === 0) {
      // If cart is empty, suggest top rated products
      const topRated = await Product.find({ status: "Active" })
        .sort({ rating: -1 })
        .limit(4);
      return NextResponse.json({ recommendations: topRated });
    }

    // 1. Get embeddings for cart products
    const cartProducts = (await Product.find({ productId: { $in: cartProductIds } })) as IProduct[];
    const cartEmbeddings = cartProducts
      .map(p => p.embedding)
      .filter((emb): emb is number[] => !!emb && emb.length > 0);

    if (cartEmbeddings.length === 0) {
       const topRated = await Product.find({ status: "Active" }).limit(4);
       return NextResponse.json({ recommendations: topRated });
    }

    // 2. Average the cart embeddings to find a "centroid" of interests
    const vectorSize = cartEmbeddings[0].length;
    const centroid = new Array(vectorSize).fill(0);
    cartEmbeddings.forEach(emb => {
      emb.forEach((val: number, i: number) => { centroid[i] += val; });
    });
    const avgCentroid = centroid.map(v => v / cartEmbeddings.length);

    // 3. Find similar products not in cart
    const allProducts = (await Product.find({ 
      status: "Active", 
      productId: { $nin: cartProductIds } 
    })) as IProduct[];

    const recommendations = allProducts
      .map(p => ({
        ...p.toObject(),
        score: cosineSimilarity(avgCentroid, p.embedding || [])
      }))
      .filter(p => p.score > 0.4)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
