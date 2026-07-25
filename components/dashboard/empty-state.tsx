import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
        <h2 className="text-lg font-semibold text-text-primary">
          You&apos;re all caught up!
        </h2>
        <p className="max-w-md text-sm text-text-secondary">
          There are no testimonials awaiting moderation.
        </p>
      </CardContent>
    </Card>
  );
}
