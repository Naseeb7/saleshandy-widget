import { ModerationCard } from "@/components/dashboard/moderation-card";
import { TESTIMONIAL_STATUS } from "@/lib/constants";
import type { DashboardTestimonial } from "@/types/testimonial";

type ModerationAction =
  | typeof TESTIMONIAL_STATUS.APPROVED
  | typeof TESTIMONIAL_STATUS.REJECTED;

type DashboardListProps = {
  testimonials: DashboardTestimonial[];
  processingIds: Set<string>;
  onModerate: (id: string, status: ModerationAction) => void;
};

export function DashboardList({
  testimonials,
  processingIds,
  onModerate,
}: DashboardListProps) {
  return (
    <div className="flex flex-col gap-6">
      {testimonials.map((testimonial) => (
        <ModerationCard
          isProcessing={processingIds.has(testimonial.id)}
          key={testimonial.id}
          onModerate={(status) => onModerate(testimonial.id, status)}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}
