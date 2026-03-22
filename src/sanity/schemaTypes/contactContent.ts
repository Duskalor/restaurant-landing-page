import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactContent',
  title: 'Sección Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la sección',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'URL del embed de Google Maps',
      type: 'url',
    }),
    defineField({
      name: 'openingHours',
      title: 'Horarios',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'reservationCtaText',
      title: 'Texto del botón de reserva',
      type: 'string',
    }),
  ],
})
