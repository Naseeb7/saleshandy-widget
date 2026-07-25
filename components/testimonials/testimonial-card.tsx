"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/cn";
import type { PublishedTestimonial } from "@/types/testimonial";

type TestimonialCardProps = {
  compact?: boolean;
  testimonial: PublishedTestimonial;
  useWidgetAccent?: boolean;
};

export function TestimonialCard({
  compact = false,
  testimonial,
  useWidgetAccent = false,
}: TestimonialCardProps) {
  const testimonialRef = useRef<HTMLQuoteElement>(null);
  const readMoreRef = useRef<HTMLButtonElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const element = testimonialRef.current;

    if (!element) {
      return;
    }

    const updateClampState = () => {
      setIsClamped(element.scrollHeight > element.clientHeight + 1);
    };

    updateClampState();
    const resizeObserver = new ResizeObserver(updateClampState);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [testimonial.testimonial]);

  function closeDialog() {
    setIsDialogOpen(false);
    requestAnimationFrame(() => readMoreRef.current?.focus());
  }

  return (
    <Card>
      <CardContent
        className={cn(
          "flex h-full min-w-0 flex-col gap-6",
          compact && "gap-4 p-4",
        )}
      >
        <div
          aria-label={`${testimonial.rating} out of 5 stars`}
          className={useWidgetAccent ? "widget-accent-text" : "text-warning"}
          role="img"
        >
          {String.fromCharCode(9733).repeat(testimonial.rating)}
          <span className="sr-only"> {testimonial.rating} out of 5</span>
        </div>
        <blockquote
          className={cn(
            "testimonial-preview min-w-0 flex-1 break-words text-lg leading-8 text-text-primary",
            compact && "text-base leading-6",
          )}
          ref={testimonialRef}
        >
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
        <div className="min-h-4 md:min-h-8">
          {isClamped ? (
            <button
              aria-controls={`testimonial-dialog-${testimonial.id}`}
              aria-expanded={isDialogOpen}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              onClick={() => setIsDialogOpen(true)}
              ref={readMoreRef}
              type="button"
            >
              Read more
            </button>
          ) : null}
        </div>
        <footer
          className={cn(
            "flex flex-col gap-1 border-t border-default pt-4",
            compact && "pt-3",
          )}
        >
          <cite className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-text-primary">
            {testimonial.name}
          </cite>
          <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-text-secondary">
            {testimonial.company}
          </span>
        </footer>
      </CardContent>
      <div id={`testimonial-dialog-${testimonial.id}`}>
        <Dialog
          onClose={closeDialog}
          open={isDialogOpen}
          title="Customer testimonial"
        >
          <div className="mt-6 flex flex-col gap-6">
            <div
              aria-label={`${testimonial.rating} out of 5 stars`}
              className={
                useWidgetAccent ? "widget-accent-text" : "text-warning"
              }
              role="img"
            >
              {String.fromCharCode(9733).repeat(testimonial.rating)}
              <span className="sr-only"> {testimonial.rating} out of 5</span>
            </div>
            <blockquote className="break-words text-lg leading-8 text-text-primary">
              &ldquo;{testimonial.testimonial}&rdquo;
            </blockquote>
            <footer className="flex flex-col gap-1 border-t border-default pt-4">
              <cite className="break-words not-italic font-semibold text-text-primary">
                {testimonial.name}
              </cite>
              <span className="break-words text-sm text-text-secondary">
                {testimonial.company}
              </span>
            </footer>
          </div>
        </Dialog>
      </div>
    </Card>
  );
}
