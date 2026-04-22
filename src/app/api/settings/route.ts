import { NextResponse } from "next/server";
import { getServerConfig, saveServerConfig } from "@/lib/config";

export async function GET() {
  const config = getServerConfig();
  // Don't return secrets, just indicate if they exist
  return NextResponse.json({
    hasMongoUri: !!(config?.MONGO_URI || process.env.MONGO_URI),
    hasCloudinary: !!(
      (config?.CLOUDINARY_API_KEY && config?.CLOUDINARY_CLOUD_NAME) ||
      (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME)
    ),
    mongoUri: config?.MONGO_URI || "",
    cloudinaryCloudName: config?.CLOUDINARY_CLOUD_NAME || "",
    cloudinaryApiKey: config?.CLOUDINARY_API_KEY || "",
    cloudinaryApiSecret: config?.CLOUDINARY_API_SECRET || "",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newConfig = saveServerConfig(body);
    return NextResponse.json({ success: true, config: {
      hasMongoUri: !!newConfig.MONGO_URI,
      hasCloudinary: !!(newConfig.CLOUDINARY_API_KEY && newConfig.CLOUDINARY_CLOUD_NAME)
    } });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save config" },
      { status: 500 }
    );
  }
}
