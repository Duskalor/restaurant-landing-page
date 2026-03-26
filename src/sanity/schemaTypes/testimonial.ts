import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comentario',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número menor = aparece primero',
    }),
    defineField({
      name: 'origin',
      title: 'País / Ciudad de origen',
      type: 'string',
      description: 'ej: Buenos Aires, Argentina',
    }),
    defineField({
      name: 'tourVisited',
      title: 'Tour que realizó',
      type: 'string',
      description: 'ej: Camino Inca Clásico 4 días',
    }),
  ],
})
