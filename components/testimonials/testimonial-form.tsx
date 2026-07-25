"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitTestimonial } from "@/lib/api/testimonials";
import {
  testimonialFormSchema,
  type TestimonialFormValues,
} from "@/lib/validators/testimonial-form";
import { RatingInput } from "@/components/testimonials/rating-input";

type SubmissionState = "idle" | "success" | "error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-danger-foreground" id={id} role="alert">
      {message}
    </p>
  );
}

export function TestimonialForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    control,
  } = useForm<TestimonialFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      testimonial: "",
      rating: 0,
    },
    resolver: zodResolver(testimonialFormSchema),
  });
  const selectedRating = useWatch({ control, name: "rating" });

  async function onSubmit(values: TestimonialFormValues) {
    setSubmissionState("idle");
    setSubmissionError("");

    try {
      await submitTestimonial(values);
      reset();
      setSubmissionState("success");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We could not submit your testimonial. Please try again.",
      );
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submissionState === "success" ? (
        <Alert variant="success">
          Thank you! Your testimonial has been submitted and is awaiting moderation.
        </Alert>
      ) : null}
      {submissionState === "error" ? (
        <Alert variant="danger">{submissionError}</Alert>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            id="name"
            placeholder="Your name"
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            id="email"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          aria-describedby={errors.company ? "company-error" : undefined}
          aria-invalid={Boolean(errors.company)}
          id="company"
          placeholder="Your company"
          {...register("company")}
        />
        <FieldError id="company-error" message={errors.company?.message} />
      </div>

      <div>
        <Label htmlFor="testimonial">Testimonial</Label>
        <Textarea
          aria-describedby={errors.testimonial ? "testimonial-error" : undefined}
          aria-invalid={Boolean(errors.testimonial)}
          id="testimonial"
          placeholder="Tell us about your experience"
          {...register("testimonial")}
        />
        <FieldError
          id="testimonial-error"
          message={errors.testimonial?.message}
        />
      </div>

      <RatingInput
        error={errors.rating?.message}
        register={register}
        value={selectedRating}
      />

      <Button className="w-full sm:w-fit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting…" : "Submit testimonial"}
      </Button>
    </form>
  );
}
