import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Review, IReview } from "@/lib/models/Review";
import { summarizeReviews } from "@/lib/ai";
import { Review as ReviewType } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const productId = req.nextUrl.searchParams.get("productId");
    if (!productId) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const reviews = (await Review.find({ productId })) as IReview[];
    if (reviews.length === 0) {
      return NextResponse.json({ summary: "No reviews yet.", sentiment: "Neutral" });
    }

    const analysis = await summarizeReviews(reviews);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Summarization API error:", error);
    return NextResponse.json({ error: "Failed to summarize reviews" }, { status: 500 });
  }
}
