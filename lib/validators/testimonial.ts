import type { TestimonialInput, UpdateTestimonialStatusInput } from "@/types/testimonial";

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export function validateTestimonialInput(
  _input: unknown,
): ValidationResult<TestimonialInput> {
  void _input;
  throw new Error("Testimonial validation is not implemented yet");
}

export function validateTestimonialStatusUpdate(
  _input: unknown,
): ValidationResult<UpdateTestimonialStatusInput> {
  void _input;
  throw new Error("Testimonial status validation is not implemented yet");
}
