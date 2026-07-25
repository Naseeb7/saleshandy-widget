import { errorResponse, failureResponse, successResponse } from "@/lib/api-response";
import { validateTestimonialStatusUpdate } from "@/lib/validators/testimonial";
import { updateTestimonialStatus } from "@/services/testimonials";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const validation = validateTestimonialStatusUpdate(await request.json());

    if (!validation.success) {
      return failureResponse(validation.error, 400);
    }

    const testimonial = await updateTestimonialStatus(id, validation.data);
    return successResponse(testimonial);
  } catch (error) {
    return errorResponse(error);
  }
}
