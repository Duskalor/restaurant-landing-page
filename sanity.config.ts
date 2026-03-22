import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Restaurant Landing',
  projectId: process.env.SANITY_PROJECT_ID ?? 'q2ywqdj2',
  dataset: process.env.SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Configuración del sitio')
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
            S.listItem()
              .title('Nosotros')
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
            S.documentTypeListItem('menuItem').title('Platos del menú'),
            S.documentTypeListItem('galleryImage').title('Galería'),
            S.documentTypeListItem('testimonial').title('Testimonios'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
