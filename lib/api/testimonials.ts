import { TESTIMONIAL_STATUS } from "@/lib/constants";
import type { TestimonialStatus } from "@/lib/constants";
import type {
  DashboardTestimonial,
  PublishedTestimonial,
  TestimonialInput,
} from "@/types/testimonial";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSafeApiError(message: string): boolean {
  const normalizedMessage = message.trim().toLowerCase();

  return (
    normalizedMessage.length > 0 &&
    normalizedMessage.length <= 200 &&
    !/(internal server error|mongodb|mongoose|stack trace|not configured|reject_ttl_days)/i.test(
      normalizedMessage,
    )
  );
}

function getApiError(payload: unknown, fallback: string): string {
  if (
    isRecord(payload) &&
    typeof payload.error === "string" &&
    isSafeApiError(payload.error)
  ) {
    return payload.error;
  }

  return fallback;
}

function isDashboardTestimonial(value: unknown): value is DashboardTestimonial {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.company === "string" &&
    typeof value.testimonial === "string" &&
    typeof value.rating === "number" &&
    value.status === TESTIMONIAL_STATUS.PENDING &&
    typeof value.createdAt === "string"
  );
}

type ModerationAction = Exclude<
  TestimonialStatus,
  typeof TESTIMONIAL_STATUS.PENDING
>;

const DASHBOARD_FETCH_ERROR =
  "We could not load pending testimonials. Please try again.";
const MODERATION_ERROR =
  "We could not update this testimonial. Please try again.";
const PUBLIC_FETCH_ERROR =
  "We could not load published testimonials. Please try again.";

async function readResponse(
  response: Response,
  fallback: string,
): Promise<unknown> {
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getApiError(payload, fallback));
  }

  return payload;
}

export async function submitTestimonial(
  input: TestimonialInput,
): Promise<void> {
  const response = await fetch("/api/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      getApiError(
        payload,
        "We could not submit your testimonial. Please try again.",
      ),
    );
  }

  if (!isRecord(payload) || payload.success !== true) {
    throw new Error("We could not submit your testimonial. Please try again.");
  }
}

export async function getPendingTestimonials(): Promise<
  DashboardTestimonial[]
> {
  let response: Response;

  try {
    response = await fetch("/api/dashboard/testimonials");
  } catch {
    throw new Error(DASHBOARD_FETCH_ERROR);
  }

  const payload = await readResponse(response, DASHBOARD_FETCH_ERROR);

  if (
    !isRecord(payload) ||
    payload.success !== true ||
    !Array.isArray(payload.data) ||
    !payload.data.every(isDashboardTestimonial)
  ) {
    throw new Error(DASHBOARD_FETCH_ERROR);
  }

  return payload.data;
}

export async function moderateTestimonial(
  id: string,
  status: ModerationAction,
): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`/api/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  } catch {
    throw new Error(MODERATION_ERROR);
  }

  const payload = await readResponse(response, MODERATION_ERROR);

  if (!isRecord(payload) || payload.success !== true) {
    throw new Error(MODERATION_ERROR);
  }
}

function isPublishedTestimonial(value: unknown): value is PublishedTestimonial {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.company === "string" &&
    typeof value.testimonial === "string" &&
    typeof value.rating === "number" &&
    Number.isInteger(value.rating) &&
    value.rating >= 1 &&
    value.rating <= 5
  );
}

export async function getApprovedTestimonials(): Promise<
  PublishedTestimonial[]
> {
  let response: Response;

  try {
    response = await fetch("/api/testimonials");
  } catch {
    throw new Error(PUBLIC_FETCH_ERROR);
  }

  const payload = await readResponse(response, PUBLIC_FETCH_ERROR);

  if (
    !isRecord(payload) ||
    payload.success !== true ||
    !Array.isArray(payload.data) ||
    !payload.data.every(isPublishedTestimonial)
  ) {
    throw new Error(PUBLIC_FETCH_ERROR);
  }

  return payload.data;
}
