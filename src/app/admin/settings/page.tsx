"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Lock, Database, Cloud, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminSettings() {
  const [config, setConfig] = useState({
    MONGO_URI: "",
    CLOUDINARY_CLOUD_NAME: "",
    CLOUDINARY_API_KEY: "",
    CLOUDINARY_API_SECRET: "",
  });
  const [status, setStatus] = useState({ hasMongo: false, hasCloudinary: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setStatus({
          hasMongo: data.hasMongoUri,
          hasCloudinary: data.hasCloudinary,
        });
        setConfig({
          MONGO_URI: data.mongoUri || "",
          CLOUDINARY_CLOUD_NAME: data.cloudinaryCloudName || "",
          CLOUDINARY_API_KEY: data.cloudinaryApiKey || "",
          CLOUDINARY_API_SECRET: data.cloudinaryApiSecret || "",
        });
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Settings saved successfully!");
        setStatus({
          hasMongo: data.config.hasMongoUri,
          hasCloudinary: data.config.hasCloudinary,
        });
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 text-sm text-muted-foreground tracking-wide">
        Loading settings...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      {/* Page Header */}
      <div className="mb-10 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-3xl font-light tracking-tight">Admin Settings</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Configure external integrations. If left empty, the application will automatically fall back to local storage and mock data.
        </p>
      </div>

      <div className="space-y-8">
        {/* MongoDB Section */}
        <div className="border border-border/40 bg-muted/10">
          <div className="px-6 py-5 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-medium tracking-widest uppercase">MongoDB Configuration</h2>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 ${status.hasMongo ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
              {status.hasMongo
                ? <><CheckCircle2 className="w-3 h-3" /> Configured</>
                : <><AlertCircle className="w-3 h-3" /> Using Local Fallback</>
              }
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="MONGO_URI" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Connection String
              </Label>
              <Input
                id="MONGO_URI"
                name="MONGO_URI"
                type="password"
                placeholder="mongodb+srv://..."
                value={config.MONGO_URI}
                onChange={handleChange}
                className="h-11 font-mono text-sm bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
              <p className="text-xs text-muted-foreground">The URI is stored securely on the server.</p>
            </div>
          </div>
        </div>

        {/* Cloudinary Section */}
        <div className="border border-border/40 bg-muted/10">
          <div className="px-6 py-5 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-medium tracking-widest uppercase">Cloudinary Configuration</h2>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 ${status.hasCloudinary ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
              {status.hasCloudinary
                ? <><CheckCircle2 className="w-3 h-3" /> Configured</>
                : <><AlertCircle className="w-3 h-3" /> Using Local Images</>
              }
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="CLOUDINARY_CLOUD_NAME" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Cloud Name
              </Label>
              <Input
                id="CLOUDINARY_CLOUD_NAME"
                name="CLOUDINARY_CLOUD_NAME"
                value={config.CLOUDINARY_CLOUD_NAME}
                onChange={handleChange}
                className="h-11 text-sm bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="CLOUDINARY_API_KEY" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  API Key
                </Label>
                <Input
                  id="CLOUDINARY_API_KEY"
                  name="CLOUDINARY_API_KEY"
                  type="password"
                  value={config.CLOUDINARY_API_KEY}
                  onChange={handleChange}
                  className="h-11 text-sm bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="CLOUDINARY_API_SECRET" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  API Secret
                </Label>
                <Input
                  id="CLOUDINARY_API_SECRET"
                  name="CLOUDINARY_API_SECRET"
                  type="password"
                  value={config.CLOUDINARY_API_SECRET}
                  onChange={handleChange}
                  className="h-11 text-sm bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-12 px-10 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all"
          >
            {saving ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </div>
    </div>
  );
}
