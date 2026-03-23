import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Imagen de galería',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      description: 'Texto que aparece bajo la imagen en el lightbox',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número menor = aparece primero',
    }),
  ],
})
