import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export function PublicEmptyState({ compact = false }: { compact?: boolean }) {
  return (
    <Card>
      <CardContent
        className={cn(
          "flex flex-col items-center gap-2 py-12 text-center",
          compact && "py-8",
        )}
      >
        <h2 className="text-lg font-semibold text-text-primary">
          No testimonials have been published yet.
        </h2>
        <p className="max-w-md text-sm text-text-secondary">
          Check back soon to see what our customers have to say.
        </p>
      </CardContent>
    </Card>
  );
}
