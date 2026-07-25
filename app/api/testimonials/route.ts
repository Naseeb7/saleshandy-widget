import { errorResponse, failureResponse, successResponse } from "@/lib/api-response";
import { validateTestimonialInput } from "@/lib/validators/testimonial";
import {
  createTestimonial,
  getApprovedTestimonials,
} from "@/services/testimonials";

export async function GET() {
  try {
    const testimonials = await getApprovedTestimonials();
    return successResponse(testimonials);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const validation = validateTestimonialInput(await request.json());

    if (!validation.success) {
      return failureResponse(validation.error, 400);
    }

    const testimonial = await createTestimonial(validation.data);
    return successResponse(testimonial, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
