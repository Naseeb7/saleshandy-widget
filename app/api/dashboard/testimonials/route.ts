import { errorResponse, successResponse } from "@/lib/api-response";
import { getPendingTestimonials } from "@/services/testimonials";

export async function GET() {
  try {
    const testimonials = await getPendingTestimonials();
    return successResponse(testimonials);
  } catch (error) {
    return errorResponse(error);
  }
}
