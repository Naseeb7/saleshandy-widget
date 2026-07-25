import mongoose, { Schema, type Model } from "mongoose";

import { TESTIMONIAL_STATUS } from "@/lib/constants";
import type { TestimonialStatus } from "@/lib/constants";
import type { Testimonial } from "@/types/testimonial";

export type TestimonialDocument = Testimonial & {
  createdAt: Date;
  updatedAt: Date;
};

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    testimonial: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    status: {
      type: String,
      required: true,
      enum: Object.values(TESTIMONIAL_STATUS),
      default: TESTIMONIAL_STATUS.PENDING,
    },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

testimonialSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
testimonialSchema.index({ status: 1, createdAt: -1 });

export const TestimonialModel: Model<TestimonialDocument> =
  mongoose.models.Testimonial ??
  mongoose.model<TestimonialDocument>("Testimonial", testimonialSchema);

export function isTestimonialStatus(value: string): value is TestimonialStatus {
  return Object.values(TESTIMONIAL_STATUS).includes(
    value as TestimonialStatus,
  );
}
