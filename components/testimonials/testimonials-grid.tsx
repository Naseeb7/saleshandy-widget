import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { cn } from "@/lib/cn";
import type { PublishedTestimonial } from "@/types/testimonial";

type TestimonialsGridProps = {
  compact?: boolean;
  testimonials: PublishedTestimonial[];
  useWidgetAccent?: boolean;
};

export function TestimonialsGrid({
  compact = false,
  testimonials,
  useWidgetAccent = false,
}: TestimonialsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
        compact && "grid-cols-1 gap-4 sm:grid-cols-2",
      )}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard
          compact={compact}
          key={testimonial.id}
          testimonial={testimonial}
          useWidgetAccent={useWidgetAccent}
        />
      ))}
    </div>
  );
}
