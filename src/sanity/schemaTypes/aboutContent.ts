import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'Sección Nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la sección',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción / historia del restaurante',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texto alternativo',
      type: 'string',
    }),
    defineField({
      name: 'chefName',
      title: 'Nombre del chef',
      type: 'string',
    }),
    defineField({
      name: 'chefTitle',
      title: 'Cargo del chef',
      description: 'Ej: Chef Ejecutivo',
      type: 'string',
    }),
    defineField({
      name: 'chefImage',
      title: 'Foto del chef',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'chefImageAlt',
      title: 'Alt de la foto del chef',
      type: 'string',
    }),
  ],
})
