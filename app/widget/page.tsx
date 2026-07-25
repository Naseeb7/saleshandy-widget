import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { WidgetWall } from "@/components/testimonials/widget-wall";

export const metadata: Metadata = {
  title: "Customer Testimonials Widget",
  description: "An embeddable display of approved customer testimonials.",
  robots: {
    index: false,
    follow: false,
  },
};

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

type WidgetPageProps = {
  searchParams: Promise<{ accent?: string | string[] }>;
};

function getValidAccent(accent: string | string[] | undefined): string | undefined {
  const value = Array.isArray(accent) ? accent[0] : accent;

  return value && HEX_COLOR_PATTERN.test(value) ? value : undefined;
}

export default async function WidgetPage({ searchParams }: WidgetPageProps) {
  const { accent } = await searchParams;
  const validAccent = getValidAccent(accent);
  const widgetStyle = validAccent
    ? ({ "--widget-accent": validAccent } as CSSProperties)
    : undefined;

  return (
    <main className="widget-scope min-h-full bg-background p-4 sm:p-6" style={widgetStyle}>
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <h1 className="text-lg font-semibold text-text-primary">
          Customer testimonials
        </h1>
        <WidgetWall />
      </section>
    </main>
  );
}
