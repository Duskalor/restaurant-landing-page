import type { APIRoute } from 'astro'
import { Resend } from 'resend'
import * as v from 'valibot'
import { getSiteSettings } from '../../lib/sanity'

export const prerender = false

const resend = new Resend(import.meta.env.RESEND_API_KEY)

const ContactSchema = v.object({
  nombre: v.pipe(v.string(), v.trim(), v.minLength(2, 'El nombre debe tener al menos 2 caracteres.')),
  email: v.pipe(v.string(), v.trim(), v.email('El correo no es válido.')),
  fecha: v.pipe(v.string(), v.trim(), v.minLength(1, 'La fecha es requerida.')),
  personas: v.optional(v.string()),
  mensaje: v.optional(v.pipe(v.string(), v.maxLength(500, 'El mensaje no puede superar los 500 caracteres.'))),
})

export const POST: APIRoute = async ({ request }) => {
  const settings = await getSiteSettings()
  const businessName = settings?.businessName ?? 'Agencia de Turismo'
  const data = await request.formData()

  const raw = {
    nombre: data.get('nombre')?.toString() ?? '',
    email: data.get('email')?.toString() ?? '',
    fecha: data.get('fecha')?.toString() ?? '',
    personas: data.get('personas')?.toString() ?? '',
    mensaje: data.get('mensaje')?.toString() ?? '',
  }

  const result = v.safeParse(ContactSchema, raw)

  if (!result.success) {
    const firstError = result.issues[0].message
    return new Response(JSON.stringify({ error: firstError }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { nombre, email, fecha, personas, mensaje } = result.output

  const contactEmail = import.meta.env.CONTACT_EMAIL
  if (!contactEmail) {
    return new Response(JSON.stringify({ error: 'Servicio de contacto no configurado.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: `Consultas ${businessName} <${fromEmail}>`,
    to: [contactEmail],
    subject: `Nueva consulta de tour de ${nombre}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #F0F4F0; border: 1px solid #E8F0E8;">
        <!-- Header -->
        <div style="background: #1A2E1A; padding: 32px; text-align: center;">
          <p style="color: #2D6A4F; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 8px;">${businessName}</p>
          <h1 style="color: #F0F4F0; font-size: 24px; margin: 0; font-weight: normal;">Nueva Consulta de Tour</h1>
        </div>

        <!-- Body -->
        <div style="padding: 40px 32px;">
          <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 32px;">
            Se ha recibido una nueva consulta de tour. A continuación los detalles:
          </p>

          <!-- Details -->
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #E8F0E8;">
              <td style="padding: 12px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 40%;">Nombre</td>
              <td style="padding: 12px 0; color: #1A2E1A; font-size: 15px; font-weight: bold;">${nombre}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8F0E8;">
              <td style="padding: 12px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Correo</td>
              <td style="padding: 12px 0; color: #1A2E1A; font-size: 15px;">
                <a href="mailto:${email}" style="color: #2D6A4F; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #E8F0E8;">
              <td style="padding: 12px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Fecha</td>
              <td style="padding: 12px 0; color: #1A2E1A; font-size: 15px;">${fecha}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8F0E8;">
              <td style="padding: 12px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Personas</td>
              <td style="padding: 12px 0; color: #1A2E1A; font-size: 15px;">${personas}</td>
            </tr>
            ${mensaje ? `
            <tr>
              <td style="padding: 12px 0; color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Mensaje</td>
              <td style="padding: 12px 0; color: #1A2E1A; font-size: 15px; line-height: 1.6;">${mensaje}</td>
            </tr>
            ` : ''}
          </table>

          <!-- CTA -->
          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${email}"
              style="display: inline-block; padding: 12px 32px; background: #2D6A4F; color: #fff; text-decoration: none; font-size: 14px; letter-spacing: 1px;">
              Responder al cliente
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #E8F0E8; padding: 20px 32px; text-align: center; border-top: 1px solid #E8F0E8;">
          <p style="color: #6B6B6B; font-size: 12px; margin: 0;">
            Este mensaje fue enviado desde el formulario de consultas de ${businessName}.
          </p>
        </div>
      </div>
    `,
  })

  if (error) {
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje. Intentá de nuevo.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
