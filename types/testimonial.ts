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
  createdAt: Date;
  updatedAt: Date;
};

export type TestimonialInput = Pick<
  Testimonial,
  "name" | "email" | "company" | "testimonial" | "rating"
>;

export type UpdateTestimonialStatusInput = Pick<Testimonial, "status">;

export type SerializedTestimonial = Omit<Testimonial, "_id"> & { id: string };

export type PublicTestimonial = Omit<SerializedTestimonial, "email">;

export type ModerationTestimonial = Pick<
  SerializedTestimonial,
  | "id"
  | "name"
  | "email"
  | "company"
  | "testimonial"
  | "rating"
  | "status"
  | "createdAt"
>;

export type DashboardTestimonial = Omit<
  ModerationTestimonial,
  "createdAt"
> & {
  createdAt: string;
};
