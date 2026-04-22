import mongoose from "mongoose";
import { getServerConfig } from "./config";

// Disable strict query warning
mongoose.set("strictQuery", false);

// Global is used here to maintain a cached connection across hot reloads in development.
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  const config = getServerConfig();
  const MONGO_URI = config?.MONGO_URI || process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI in your server-config.json or .env.local"
    );
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
