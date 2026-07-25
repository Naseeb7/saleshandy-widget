import { z } from "zod";

import {
  MAX_COMPANY_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TESTIMONIAL_LENGTH,
  MIN_COMPANY_LENGTH,
  MIN_NAME_LENGTH,
  MIN_TESTIMONIAL_LENGTH,
} from "@/lib/constants";

export const testimonialFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(MIN_NAME_LENGTH, "Name is required")
    .max(
      MAX_NAME_LENGTH,
      `Name must be ${MAX_NAME_LENGTH} characters or fewer`,
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(
      MAX_EMAIL_LENGTH,
      `Email must be ${MAX_EMAIL_LENGTH} characters or fewer`,
    )
    .email("Please enter a valid email address"),
  company: z
    .string()
    .trim()
    .min(MIN_COMPANY_LENGTH, "Company is required")
    .max(
      MAX_COMPANY_LENGTH,
      `Company must be ${MAX_COMPANY_LENGTH} characters or fewer`,
    ),
  testimonial: z
    .string()
    .trim()
    .min(MIN_TESTIMONIAL_LENGTH, "Testimonial is required")
    .max(
      MAX_TESTIMONIAL_LENGTH,
      `Testimonial must be ${MAX_TESTIMONIAL_LENGTH.toLocaleString()} characters or fewer`,
    ),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 1 and 5"),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
