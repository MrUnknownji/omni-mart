import mongoose, { Document, Model, Schema } from "mongoose";

import { Address } from "../types";

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profileImage?: string;
  address?: Address;
  phone?: string;
  cartId?: string;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImage: { type: String },
    address: { type: Object },
    phone: { type: String },
    cartId: { type: String },
    role: { type: String, default: "customer" },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
