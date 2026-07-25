import type { Metadata } from "next";
import { WidgetWall } from "@/components/testimonials/widget-wall";

export const metadata: Metadata = {
  title: "Customer Testimonials Widget",
  description: "An embeddable display of approved customer testimonials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WidgetPage() {
  return (
    <main className="min-h-full bg-background p-4 sm:p-6">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <h1 className="text-lg font-semibold text-text-primary">
          Customer testimonials
        </h1>
        <WidgetWall />
      </section>
    </main>
  );
}
