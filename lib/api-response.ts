import mongoose from "mongoose";

import { AppError } from "@/lib/errors";

export function successResponse<T>(data: T, status = 200): Response {
  return Response.json({ success: true, data }, { status });
}

export function failureResponse(error: string, status = 500): Response {
  return Response.json({ success: false, error }, { status });
}

export function errorResponse(error: unknown): Response {
  if (error instanceof AppError) {
    return failureResponse(error.message, error.statusCode);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return failureResponse("Invalid testimonial data", 400);
  }

  if (error instanceof SyntaxError) {
    return failureResponse("Request body must contain valid JSON", 400);
  }

  console.error(error);
  return failureResponse("Internal server error", 500);
}
