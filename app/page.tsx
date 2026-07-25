import { TestimonialsWall } from "@/components/testimonials/testimonials-wall";

export default function HomePage() {
  return (
    <main className="min-h-full flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-medium text-primary">Customer stories</p>
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            What our customers say
          </h1>
          <p className="max-w-2xl text-text-secondary">
            Hear how teams are building better experiences with Saleshandy.
          </p>
        </header>
        <TestimonialsWall />
      </section>
    </main>
  );
}
