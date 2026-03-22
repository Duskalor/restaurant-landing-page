import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroContent',
  title: 'Contenido del Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de fondo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del botón CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Enlace del botón CTA',
      type: 'string',
    }),
  ],
})
