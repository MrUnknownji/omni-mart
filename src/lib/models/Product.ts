import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  brand: string;
  extraImages: string[];
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  status: "Active" | "Draft" | "Archived";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    extraImages: [{ type: String }],
    stock: { type: Number, default: 0 },
    sku: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
