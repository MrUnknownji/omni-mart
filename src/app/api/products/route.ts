import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Product } from "@/lib/models/Product";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Database not configured or error fetching products" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Database not configured or error creating product" }, { status: 503 });
  }
}
