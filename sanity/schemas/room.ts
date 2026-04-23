import { defineField, defineType } from "sanity";

export const roomSchema = defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Room Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "Standard" },
          { title: "Superior", value: "Superior" },
          { title: "Family", value: "Family" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price per Night (€)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Full Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Room Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured (Most Popular)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      description: 'e.g. "Most Popular", "Ideal for Families"',
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      price: "price",
      media: "images.0",
    },
    prepare({ title, category, price, media }) {
      return {
        title: title,
        subtitle: `${category} · €${price}/night`,
        media,
      };
    },
  },
});
