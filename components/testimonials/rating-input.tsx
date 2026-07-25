"use client";

import { Controller, type Control } from "react-hook-form";

import { cn } from "@/lib/cn";
import type { TestimonialFormValues } from "@/lib/validators/testimonial-form";

type RatingInputProps = {
  value: number;
  control: Control<TestimonialFormValues>;
  error?: string;
};

const ratings = [1, 2, 3, 4, 5];

export function RatingInput({ value, control, error }: RatingInputProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-text-primary">
        Rating
      </legend>
      <Controller
        control={control}
        name="rating"
        render={({ field }) => (
          <div
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "rating-error" : undefined}
            className="flex gap-2"
            role="radiogroup"
          >
            {ratings.map((rating) => (
              <label
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-1 rounded-control border border-default bg-surface px-3 py-2 text-xs text-text-secondary transition-colors hover:border-primary hover:bg-surface-muted focus-within:ring-2 focus-within:ring-primary/30",
                  value === rating &&
                    "border-primary bg-surface-muted text-primary",
                )}
                key={rating}
              >
                <input
                  aria-label={`${rating} out of 5 stars`}
                  checked={value === rating}
                  className="sr-only"
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange(rating)}
                  ref={field.ref}
                  type="radio"
                />
                <span
                  aria-hidden="true"
                  className="text-lg leading-none text-warning"
                >
                  ★
                </span>
                <span>{rating}</span>
              </label>
            ))}
          </div>
        )}
      />
      {error ? (
        <p className="mt-2 text-sm text-danger-foreground" id="rating-error" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
