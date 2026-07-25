import { Card, CardContent } from "@/components/ui/card";
import type { PublishedTestimonial } from "@/types/testimonial";

type TestimonialCardProps = {
  testimonial: PublishedTestimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="flex h-full flex-col gap-6">
        <div
          aria-label={`${testimonial.rating} out of 5 stars`}
          className="text-warning"
          role="img"
        >
          {"★".repeat(testimonial.rating)}
          <span className="sr-only"> {testimonial.rating} out of 5</span>
        </div>
        <blockquote className="flex-1 text-lg leading-8 text-text-primary">
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
        <footer className="flex flex-col gap-1 border-t border-default pt-4">
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
