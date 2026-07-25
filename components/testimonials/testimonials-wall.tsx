"use client";

import { useCallback, useEffect, useState } from "react";

import { PublicEmptyState } from "@/components/testimonials/public-empty-state";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getApprovedTestimonials } from "@/lib/api/testimonials";
import type { PublishedTestimonial } from "@/types/testimonial";

const FETCH_ERROR =
  "We could not load published testimonials. Please try again.";

function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : FETCH_ERROR;
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
      Loading testimonials…
    </div>
  );
}

export function TestimonialsWall() {
  const [testimonials, setTestimonials] = useState<PublishedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setTestimonials(await getApprovedTestimonials());
    } catch (loadError) {
      setError(getErrorMessage(loadError));
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

  return testimonials.length > 0 ? (
    <TestimonialsGrid testimonials={testimonials} />
  ) : (
    <PublicEmptyState />
  );
}
