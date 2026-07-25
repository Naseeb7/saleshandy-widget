"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DashboardList } from "@/components/dashboard/dashboard-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getPendingTestimonials, moderateTestimonial } from "@/lib/api/testimonials";
import { TESTIMONIAL_STATUS } from "@/lib/constants";
import type { DashboardTestimonial } from "@/types/testimonial";

type Feedback = {
  message: string;
  variant: "danger" | "success";
};

type ModerationAction =
  | typeof TESTIMONIAL_STATUS.APPROVED
  | typeof TESTIMONIAL_STATUS.REJECTED;

const FETCH_ERROR = "We could not load pending testimonials. Please try again.";

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

function LoadingState() {
  return (
    <div
      aria-live="polite"
      className="flex items-center justify-center gap-3 py-16 text-sm text-text-secondary"
      role="status"
    >
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-default border-t-primary"
      />
      Loading pending testimonials…
    </div>
  );
}

export function ModerationDashboard() {
  const [testimonials, setTestimonials] = useState<DashboardTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const processingIdsRef = useRef(new Set<string>());

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setTestimonials(await getPendingTestimonials());
    } catch (loadError) {
      setError(getErrorMessage(loadError, FETCH_ERROR));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void loadTestimonials();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [loadTestimonials]);

  async function handleModeration(id: string, status: ModerationAction) {
    if (processingIdsRef.current.has(id)) {
      return;
    }

    processingIdsRef.current.add(id);
    setProcessingIds(new Set(processingIdsRef.current));
    setFeedback(null);

    try {
      await moderateTestimonial(id, status);
      setTestimonials((current) =>
        current.filter((testimonial) => testimonial.id !== id),
      );
      setFeedback({
        message:
          status === TESTIMONIAL_STATUS.APPROVED
            ? "Testimonial approved."
            : "Testimonial rejected.",
        variant: "success",
      });
    } catch (moderationError) {
      setFeedback({
        message: getErrorMessage(
          moderationError,
          "We could not update this testimonial. Please try again.",
        ),
        variant: "danger",
      });
    } finally {
      processingIdsRef.current.delete(id);
      setProcessingIds(new Set(processingIdsRef.current));
    }
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => void loadTestimonials()} type="button" variant="secondary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {feedback ? <Alert variant={feedback.variant}>{feedback.message}</Alert> : null}
      {testimonials.length > 0 ? (
        <DashboardList
          onModerate={handleModeration}
          processingIds={processingIds}
          testimonials={testimonials}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
