import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import type { PublishedTestimonial } from "@/types/testimonial";

type TestimonialsGridProps = {
  testimonials: PublishedTestimonial[];
};

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
