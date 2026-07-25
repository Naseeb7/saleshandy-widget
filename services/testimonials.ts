import type {
  Testimonial,
  TestimonialInput,
  UpdateTestimonialStatusInput,
} from "@/types/testimonial";

const NOT_IMPLEMENTED_ERROR = "Testimonial service is not implemented yet";

export async function createTestimonial(
  _input: TestimonialInput,
): Promise<Testimonial> {
  void _input;
  throw new Error(NOT_IMPLEMENTED_ERROR);
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  throw new Error(NOT_IMPLEMENTED_ERROR);
}

export async function getPendingTestimonials(): Promise<Testimonial[]> {
  throw new Error(NOT_IMPLEMENTED_ERROR);
}

export async function updateTestimonialStatus(
  _id: string,
  _input: UpdateTestimonialStatusInput,
): Promise<Testimonial> {
  void _id;
  void _input;
  throw new Error(NOT_IMPLEMENTED_ERROR);
}
