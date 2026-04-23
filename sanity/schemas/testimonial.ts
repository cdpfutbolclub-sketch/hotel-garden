import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Guest Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "origin",
      title: "Country / City",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'e.g. "March 2025"',
    }),
    defineField({
      name: "text",
      title: "Review Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "text" },
  },
});
