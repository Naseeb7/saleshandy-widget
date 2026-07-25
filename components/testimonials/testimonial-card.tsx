import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { PublishedTestimonial } from "@/types/testimonial";

type TestimonialCardProps = {
  compact?: boolean;
  testimonial: PublishedTestimonial;
};

export function TestimonialCard({
  compact = false,
  testimonial,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardContent
        className={cn("flex h-full flex-col gap-6", compact && "gap-4 p-4")}
      >
        <div
          aria-label={`${testimonial.rating} out of 5 stars`}
          className="text-warning"
          role="img"
        >
          {"★".repeat(testimonial.rating)}
          <span className="sr-only"> {testimonial.rating} out of 5</span>
        </div>
        <blockquote
          className={cn(
            "flex-1 text-lg leading-8 text-text-primary",
            compact && "text-base leading-6",
          )}
        >
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
        <footer
          className={cn(
            "flex flex-col gap-1 border-t border-default pt-4",
            compact && "pt-3",
          )}
        >
          <cite className="not-italic font-semibold text-text-primary">
            {testimonial.name}
          </cite>
          <span className="text-sm text-text-secondary">
            {testimonial.company}
          </span>
        </footer>
      </CardContent>
    </Card>
  );
}
