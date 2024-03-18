import { Schema, models } from 'mongoose';
import mongoose from 'mongoose';

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    postal: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserInfo = models?.UserInfo || mongoose.model('UserInfo', UserInfoSchema);
