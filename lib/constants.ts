export const TESTIMONIAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type TestimonialStatus =
  (typeof TESTIMONIAL_STATUS)[keyof typeof TESTIMONIAL_STATUS];

export const REJECT_TTL_DAYS_ENV = "REJECT_TTL_DAYS";

export const MIN_NAME_LENGTH = 1;
export const MAX_NAME_LENGTH = 100;
export const MIN_COMPANY_LENGTH = 1;
export const MAX_COMPANY_LENGTH = 100;
export const MIN_TESTIMONIAL_LENGTH = 1;
export const MAX_TESTIMONIAL_LENGTH = 2_000;
export const MAX_EMAIL_LENGTH = 254;
