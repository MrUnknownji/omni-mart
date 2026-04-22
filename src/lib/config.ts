import fs from "fs";
import path from "path";

export interface ServerConfig {
  MONGO_URI: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const CONFIG_PATH = path.join(process.cwd(), "server-config.json");

export const getServerConfig = (): ServerConfig | null => {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      return JSON.parse(data) as ServerConfig;
    }
  } catch (error) {
    console.error("Error reading server config:", error);
  }
  return null;
};

export const saveServerConfig = (config: Partial<ServerConfig>) => {
  try {
    let currentConfig: Partial<ServerConfig> = {};
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      currentConfig = JSON.parse(data);
    }
    const newConfig = { ...currentConfig, ...config };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
    return newConfig;
  } catch (error) {
    console.error("Error saving server config:", error);
    throw new Error("Failed to save configuration");
  }
};
