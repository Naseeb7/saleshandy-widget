import { WidgetWall } from "@/components/testimonials/widget-wall";

export default function WidgetPage() {
  return (
    <main className="min-h-full bg-background p-4">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <h1 className="text-lg font-semibold text-text-primary">
          Customer testimonials
        </h1>
        <WidgetWall />
      </section>
    </main>
  );
}
