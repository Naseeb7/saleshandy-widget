import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { REJECT_TTL_DAYS_ENV, TESTIMONIAL_STATUS } from "@/lib/constants";
import { AppError } from "@/lib/errors";
import {
  TestimonialModel,
  type TestimonialDocument,
} from "@/models/testimonial";
import type {
  PublicTestimonial,
  SerializedTestimonial,
  TestimonialInput,
  UpdateTestimonialStatusInput,
} from "@/types/testimonial";

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1_000;

type SerializableTestimonial = Omit<TestimonialDocument, "_id"> & {
  _id: { toString(): string };
  email?: string;
};

type SerializableTestimonialWithEmail = SerializableTestimonial & {
  email: string;
};

function serializeTestimonial(
  testimonial: SerializableTestimonialWithEmail,
): SerializedTestimonial {
  return {
    id: testimonial._id.toString(),
    name: testimonial.name,
    email: testimonial.email,
    company: testimonial.company,
    testimonial: testimonial.testimonial,
    rating: testimonial.rating,
    status: testimonial.status,
    expiresAt: testimonial.expiresAt,
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt,
  };
}

function serializePublicTestimonial(
  testimonial: SerializableTestimonial,
): PublicTestimonial {
  return {
    id: testimonial._id.toString(),
    name: testimonial.name,
    company: testimonial.company,
    testimonial: testimonial.testimonial,
    rating: testimonial.rating,
    status: testimonial.status,
    expiresAt: testimonial.expiresAt,
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt,
  };
}

function getRejectedExpiryDate(): Date {
  const ttlDays = Number(process.env[REJECT_TTL_DAYS_ENV]);

  if (!Number.isFinite(ttlDays) || ttlDays <= 0) {
    throw new AppError("REJECT_TTL_DAYS must be a positive number", 500);
  }

  return new Date(Date.now() + ttlDays * DAY_IN_MILLISECONDS);
}

export async function createTestimonial(
  input: TestimonialInput,
): Promise<SerializedTestimonial> {
  await connectToDatabase();

  const testimonial = await TestimonialModel.create({
    ...input,
    status: TESTIMONIAL_STATUS.PENDING,
  });

  return serializeTestimonial(testimonial);
}

export async function getApprovedTestimonials(): Promise<PublicTestimonial[]> {
  await connectToDatabase();

  const testimonials = await TestimonialModel.find({
    status: TESTIMONIAL_STATUS.APPROVED,
  })
    .sort({ createdAt: -1 })
    .select("-email")
    .lean<SerializableTestimonial[]>();

  return testimonials.map(serializePublicTestimonial);
}

export async function getPendingTestimonials(): Promise<
  SerializedTestimonial[]
> {
  await connectToDatabase();

  const testimonials = await TestimonialModel.find({
    status: TESTIMONIAL_STATUS.PENDING,
  })
    .sort({ createdAt: -1 })
    .lean<SerializableTestimonialWithEmail[]>();

  return testimonials.map(serializeTestimonial);
}

export async function updateTestimonialStatus(
  id: string,
  input: UpdateTestimonialStatusInput,
): Promise<SerializedTestimonial> {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("Invalid testimonial id", 400);
  }

  await connectToDatabase();

  const expiresAt =
    input.status === TESTIMONIAL_STATUS.REJECTED
      ? getRejectedExpiryDate()
      : null;

  const testimonial = await TestimonialModel.findOneAndUpdate(
    { _id: id, status: TESTIMONIAL_STATUS.PENDING },
    { status: input.status, expiresAt },
    { new: true, runValidators: true },
  ).exec();

  if (!testimonial) {
    throw new AppError("Testimonial not found or already moderated", 404);
  }

  return serializeTestimonial(testimonial);
}
