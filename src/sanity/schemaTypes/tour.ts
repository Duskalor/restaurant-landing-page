import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) => !!document?.__i18n_base,
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción corta',
      type: 'text',
      rows: 2,
      description: 'Resumen para las tarjetas (máx. 2 líneas)',
      validation: (Rule) => Rule.max(200).warning('Máximo 200 caracteres para no romper el layout de las cards'),
    }),
    defineField({
      name: 'price',
      title: 'Precio desde (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      description: 'Ej: "1 día", "2 días / 1 noche"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Dificultad',
      type: 'string',
      options: {
        list: [
          { title: 'Fácil', value: 'facil' },
          { title: 'Moderado', value: 'moderado' },
          { title: 'Difícil', value: 'dificil' },
          { title: 'Muy difícil', value: 'muy-dificil' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'tourCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Texto alternativo de la imagen',
      type: 'string',
      description: 'Descripción de la imagen para accesibilidad (ej: "Grupo de turistas en Machu Picchu al amanecer")',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'included',
      title: 'Lo que incluye',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notIncluded',
      title: 'No incluye',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'maxGroupSize',
      title: 'Tamaño máximo de grupo',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
    }),
    defineField({
      name: 'meetingPoint',
      title: 'Punto de encuentro',
      type: 'text',
      rows: 2,
      description: 'Dónde se encuentran los viajeros para iniciar el tour (dirección, referencia, hora)',
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
