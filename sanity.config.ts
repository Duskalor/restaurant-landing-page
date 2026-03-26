import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Tourism Agency',
  projectId: 'uo53rq2a',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuración del Sitio')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Hero')
              .child(
                S.document()
                  .schemaType('heroContent')
                  .documentId('heroContent')
              ),
            S.divider(),
            S.documentTypeListItem('tour').title('Tours'),
            S.documentTypeListItem('tourCategory').title('Categorías de Tour'),
            S.documentTypeListItem('galleryImage').title('Galería'),
            S.documentTypeListItem('testimonial').title('Testimonios'),
            S.documentTypeListItem('certification').title('Certificaciones'),
            S.divider(),
            S.listItem()
              .title('¿Por qué Elegirnos?')
              .child(
                S.document()
                  .schemaType('whyChooseUs')
                  .documentId('whyChooseUs')
              ),
            S.listItem()
              .title('Sobre Nosotros')
              .child(
                S.document()
                  .schemaType('aboutContent')
                  .documentId('aboutContent')
              ),
            S.listItem()
              .title('Contacto')
              .child(
                S.document()
                  .schemaType('contactContent')
                  .documentId('contactContent')
              ),
            S.divider(),
            S.documentTypeListItem('menuItem').title('Menú'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
