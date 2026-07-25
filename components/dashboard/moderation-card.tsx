import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIAL_STATUS } from "@/lib/constants";
import type { DashboardTestimonial } from "@/types/testimonial";

type ModerationAction =
  | typeof TESTIMONIAL_STATUS.APPROVED
  | typeof TESTIMONIAL_STATUS.REJECTED;

type ModerationCardProps = {
  testimonial: DashboardTestimonial;
  isProcessing: boolean;
  onModerate: (status: ModerationAction) => void;
};

function formatSubmissionDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function ModerationCard({
  testimonial,
  isProcessing,
  onModerate,
}: ModerationCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-text-primary">
              {testimonial.name}
            </h2>
            <p className="text-sm text-text-secondary">
              {testimonial.email} · {testimonial.company}
            </p>
          </div>
          <Badge variant="warning">Pending</Badge>
        </div>

        <div className="flex flex-col gap-2">
          <div
            aria-label={`${testimonial.rating} out of 5 stars`}
            className="text-warning"
            role="img"
          >
            {"★".repeat(testimonial.rating)}
            <span className="sr-only"> {testimonial.rating} out of 5</span>
          </div>
          <blockquote className="text-text-primary">
            &ldquo;{testimonial.testimonial}&rdquo;
          </blockquote>
        </div>

        <div className="flex flex-col gap-4 border-t border-default pt-4 sm:flex-row sm:items-center sm:justify-between">
          <time className="text-sm text-text-muted" dateTime={testimonial.createdAt}>
            Submitted {formatSubmissionDate(testimonial.createdAt)}
          </time>
          <div className="flex gap-3">
            <Button
              disabled={isProcessing}
              onClick={() => onModerate(TESTIMONIAL_STATUS.REJECTED)}
              type="button"
              variant="danger"
            >
              {isProcessing ? "Updating…" : "Reject"}
            </Button>
            <Button
              disabled={isProcessing}
              onClick={() => onModerate(TESTIMONIAL_STATUS.APPROVED)}
              type="button"
            >
              {isProcessing ? "Updating…" : "Approve"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
