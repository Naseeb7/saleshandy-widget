import type { TestimonialStatus } from "@/lib/constants";

export type Testimonial = {
  _id?: string;
  name: string;
  email: string;
  company: string;
  testimonial: string;
  rating: number;
  status: TestimonialStatus;
  expiresAt: Date | null;
};

export type TestimonialInput = Pick<
  Testimonial,
  "name" | "email" | "company" | "testimonial" | "rating"
>;

export type UpdateTestimonialStatusInput = Pick<Testimonial, "status">;
