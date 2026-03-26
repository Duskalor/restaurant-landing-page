import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'whyChooseUs',
  title: '¿Por qué Elegirnos?',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la sección',
      type: 'string',
      description: 'Ej: "¿Por qué elegirnos?"',
    }),
    defineField({
      name: 'items',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ícono (emoji o texto corto)',
              type: 'string',
              description: 'Ej: 🧭 o ✅',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Título del beneficio',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descripción breve',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'icon',
            },
          },
        },
      ],
    }),
  ],
})
