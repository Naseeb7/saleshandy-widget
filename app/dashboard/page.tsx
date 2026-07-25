import { ModerationDashboard } from "@/components/dashboard/moderation-dashboard";

export default function DashboardPage() {
  return (
    <main className="min-h-full flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium text-primary">Moderation</p>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            Testimonial dashboard
          </h1>
          <p className="max-w-2xl text-text-secondary">
            Review customer feedback before it appears on the public testimonials wall.
          </p>
        </header>
        <ModerationDashboard />
      </section>
    </main>
  );
}
