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
      title: 'Descripción / historia de la agencia',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'mission',
      title: 'Misión / propuesta de valor',
      description: 'Frase corta que resume el compromiso de la agencia con el viajero',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texto alternativo de la imagen',
      type: 'string',
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Etiqueta del badge',
      description: 'Texto pequeño bajo el ícono del badge. Ej: "Certificados por MINCETUR"',
      type: 'string',
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Años de experiencia',
      description: 'Número que se muestra en el badge. Ej: 15',
      type: 'number',
    }),
  ],
})
