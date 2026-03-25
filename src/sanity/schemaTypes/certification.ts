import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certificación',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: "MINCETUR", "TripAdvisor"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link de verificación',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
