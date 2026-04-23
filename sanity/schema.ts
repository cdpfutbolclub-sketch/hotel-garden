import { roomSchema } from "./schemas/room";
import { testimonialSchema } from "./schemas/testimonial";
import { gallerySchema } from "./schemas/gallery";
import { faqSchema } from "./schemas/faq";

export const schema = {
  types: [roomSchema, testimonialSchema, gallerySchema, faqSchema],
};
