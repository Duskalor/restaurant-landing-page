import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Plato del menú',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Entrada', value: 'entrada' },
          { title: 'Plato principal', value: 'principal' },
          { title: 'Postre', value: 'postre' },
          { title: 'Bebida', value: 'bebida' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texto alternativo de la imagen',
      type: 'string',
      description: 'Describe la imagen para accesibilidad y SEO',
    }),
    defineField({
      name: 'featured',
      title: '¿Destacado en la página principal?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número menor = aparece primero',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
