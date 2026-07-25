export const TESTIMONIAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type TestimonialStatus =
  (typeof TESTIMONIAL_STATUS)[keyof typeof TESTIMONIAL_STATUS];

export const REJECT_TTL_DAYS_ENV = "REJECT_TTL_DAYS";
