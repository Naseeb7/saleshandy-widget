import type { Metadata } from "next";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";

export const metadata: Metadata = {
  title: "Submit a Testimonial",
  description: "Share your experience with Saleshandy.",
};

export default function SubmitTestimonialPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
      <section className="w-full max-w-2xl rounded-card border border-default bg-surface p-6 shadow-card sm:p-10">
        <div className="mb-10 flex flex-col gap-4">
          <p className="text-sm font-medium text-primary">Customer feedback</p>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            Share your testimonial
          </h1>
          <p className="text-text-secondary">
            Tell us about your experience. Your testimonial will be reviewed before it
            appears publicly.
          </p>
        </div>
        <TestimonialForm />
      </section>
    </main>
  );
}
