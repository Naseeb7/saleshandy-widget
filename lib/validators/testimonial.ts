import {
  MAX_COMPANY_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TESTIMONIAL_LENGTH,
  MIN_COMPANY_LENGTH,
  MIN_NAME_LENGTH,
  MIN_TESTIMONIAL_LENGTH,
  TESTIMONIAL_STATUS,
} from "@/lib/constants";
import type {
  TestimonialInput,
  UpdateTestimonialStatusInput,
} from "@/types/testimonial";

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRequiredString(
  input: Record<string, unknown>,
  field: string,
  minLength: number,
  maxLength: number,
): string | null {
  const value = input[field];

  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (
    normalizedValue.length < minLength ||
    normalizedValue.length > maxLength
  ) {
    return null;
  }

  return normalizedValue;
}

export function validateTestimonialInput(
  input: unknown,
): ValidationResult<TestimonialInput> {
  if (!isRecord(input)) {
    return { success: false, error: "Request body must be an object" };
  }

  const name = readRequiredString(
    input,
    "name",
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
  );
  const email = readRequiredString(
    input,
    "email",
    MIN_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
  )?.toLowerCase();
  const company = readRequiredString(
    input,
    "company",
    MIN_COMPANY_LENGTH,
    MAX_COMPANY_LENGTH,
  );
  const testimonial = readRequiredString(
    input,
    "testimonial",
    MIN_TESTIMONIAL_LENGTH,
    MAX_TESTIMONIAL_LENGTH,
  );
  const rating = input.rating;

  if (!name || !email || !company || !testimonial) {
    return {
      success: false,
      error: "Name, email, company, and testimonial are required",
    };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { success: false, error: "A valid email address is required" };
  }

  if (
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return { success: false, error: "Rating must be an integer from 1 to 5" };
  }

  return { success: true, data: { name, email, company, testimonial, rating } };
}

export function validateTestimonialStatusUpdate(
  input: unknown,
): ValidationResult<UpdateTestimonialStatusInput> {
  if (!isRecord(input)) {
    return { success: false, error: "Request body must be an object" };
  }

  const status = input.status;

  if (
    status !== TESTIMONIAL_STATUS.APPROVED &&
    status !== TESTIMONIAL_STATUS.REJECTED
  ) {
    return {
      success: false,
      error: "Status must be approved or rejected",
    };
  }

  return { success: true, data: { status } };
}
