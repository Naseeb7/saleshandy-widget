import type { TestimonialInput } from "@/types/testimonial";

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

export async function submitTestimonial(input: TestimonialInput): Promise<void> {
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
