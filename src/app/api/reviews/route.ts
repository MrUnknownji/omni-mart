import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Review } from "@/lib/models/Review";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const productId = req.nextUrl.searchParams.get("productId");
    if (!productId) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const newReview = await Review.create({
      ...data,
      reviewId: Date.now().toString(),
    });
    return NextResponse.json({ review: newReview });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
