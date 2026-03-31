# 🗺️ MAPA DE RUTA COMPLETO
## De Programador React a Negocio de Páginas Web + Chatbots con IA

> **Perfil:** JavaScript / React / HTML-CSS | Cusco, Perú | Tiempo completo
>
> **Servicios:** Páginas web con Astro + Chatbots con IA (web y WhatsApp)
>
> **Este documento consolida TODO lo que necesitas. Úsalo como checklist.**

---

## 1. LO QUE NECESITAS SABER (Conocimientos)

### 1.1 Lo que YA sabes (tu ventaja)
- JavaScript / React
- HTML / CSS
- Astro (ya tienes template)
- Deploy en Vercel

### 1.2 Lo que necesitas aprender

**APIs de IA (1-2 días)**
- Crear cuenta en Anthropic: https://console.anthropic.com
- Obtener API key
- Hacer tu primera llamada a la API de Claude desde Node.js
- Entender tokens, costos y rate limits
- Recurso: https://docs.anthropic.com

**Prompting para negocios (1-2 días)**
- Escribir system prompts efectivos con info de un negocio
- Definir reglas de comportamiento del bot
- Manejar casos límite (preguntas fuera de tema, clientes molestos)
- Recurso: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview

**Node.js backend básico (ya sabes JS, esto es rápido)**
- Express.js (API simple)
- Funciones serverless en Vercel
- Variables de entorno (.env)

**Baileys — Bot de WhatsApp (1-2 días)**
- Instalación y configuración
- Conexión con QR
- Manejo de mensajes entrantes
- Delays para evitar bloqueos
- Repo: https://github.com/WhiskeySockets/Baileys

**n8n — Automatizaciones (opcional, semana 2+)**
- Workflows visuales
- Conexión con APIs
- Recurso: https://docs.n8n.io

---

## 2. LO QUE NECESITAS TENER (Herramientas y Cuentas)

### 2.1 Cuentas (todas gratuitas o de bajo costo)

| Cuenta | Para qué | Costo |
|--------|----------|-------|
| Anthropic (Claude API) | Inteligencia del chatbot | ~$3-5/mes por cliente |
| Vercel | Hosting de webs y backend | Gratis (plan hobby) |
| GitHub | Tu código y repositorios | Gratis |
| Namecheap o Porkbun | Comprar dominios | ~$10-12/año por dominio |
| Canva | Diseñar mockups e imágenes para vender | Gratis |
| WhatsApp Business | Número dedicado para bots | Chip S/. 5-10 |
| Railway o DigitalOcean | VPS para bot WhatsApp 24/7 | ~$5/mes |
| Facebook | Publicar y conseguir clientes | Gratis |
| Upwork / Workana | Freelance internacional (opcional) | Gratis |

### 2.2 Herramientas en tu computadora

```
- Node.js (v18+)
- npm
- VS Code o Cursor
- Git
- Terminal
```

### 2.3 Hardware mínimo
- Computadora con internet estable
- Celular con WhatsApp (para escanear QR del bot)
- Chip extra para el número del bot

---

## 3. LO QUE VAS A VENDER (Servicios)

### 3.1 Servicio: Páginas Web con Astro

**Qué es para el cliente:**
"Una página web profesional para tu negocio que se ve increíble en celular, carga rápido y tiene WhatsApp integrado."

**Qué es técnicamente:**
Template de Astro personalizado, deployado en Vercel, con dominio propio.

**Qué incluye:**
- Diseño personalizado (colores, logo, fotos del cliente)
- Responsive (celular + desktop)
- Hasta 5 secciones: inicio, servicios, nosotros, galería, contacto
- Botón flotante de WhatsApp
- Formulario de contacto
- SEO básico (meta tags, sitemap)
- Certificado SSL (Vercel lo da automático)
- Hosting (Vercel gratis)
- Dominio (1 año incluido)

**Qué NO incluye (cobrar aparte):**
- Tienda online / e-commerce
- Blog con publicaciones
- Secciones adicionales (más de 5)
- Rediseño completo
- Fotos profesionales
- Redacción de textos (el cliente los da)

**Proceso de entrega:**
1. Reunión con cliente (30 min) → recopilar info, fotos, textos
2. Personalizar template de Astro (2-3 horas)
3. Comprar dominio
4. Deploy en Vercel
5. Enviar link al cliente para revisión
6. Ajustes menores (máximo 2 rondas)
7. Entrega final

**Tiempo de entrega:** 3-5 días

**Tu costo real:**

| Concepto | Costo |
|----------|-------|
| Astro | Gratis |
| Vercel hosting | Gratis |
| Dominio .com | ~S/. 40/año |
| Tu tiempo (3-5 horas) | S/. 0 |
| **Total** | **~S/. 40** |

---

### 3.2 Servicio: Chatbot Web con IA

**Qué es para el cliente:**
"Un asistente virtual en tu página web que responde clientes automáticamente las 24 horas, como si fueras tú."

**Qué es técnicamente:**
Widget JavaScript (chat-widget.js) embebido en la web del cliente + backend API en Vercel que llama a Claude.

**Arquitectura (3 piezas):**

```
Pieza 1: chat-widget.js
→ JavaScript puro (vanilla JS)
→ Se pega en cualquier web con 1 línea de código
→ Funciona en: WordPress, Wix, Shopify, Astro, HTML, cualquiera
→ Se configura con data-attributes (nombre, color, API URL)

Pieza 2: API Backend
→ Node.js (función serverless en Vercel)
→ Recibe el mensaje del usuario
→ Le agrega el contexto del negocio (system prompt)
→ Llama a la API de Claude
→ Devuelve la respuesta
→ Hosting: Vercel (gratis)

Pieza 3: API de Claude (Anthropic)
→ La inteligencia del chatbot
→ Costo: ~$0.003 por mensaje
→ ~$3-5/mes por cliente activo
```

**Cómo se integra en la web del cliente:**
```html
<script
  src="https://tudominio.com/chat-widget.js"
  data-business="Nombre del Negocio"
  data-color="#dc2626"
  data-api="https://tu-api.vercel.app/api/chat"
  data-welcome="¡Hola! 👋 ¿En qué puedo ayudarte?"
></script>
```

**Dónde pega eso el cliente (WordPress):**
- Opción 1: Apariencia → Personalizar → HTML adicional
- Opción 2: Plugin "Insert Headers and Footers" → footer
- Opción 3: Editor de temas → footer.php → antes de `</body>`

**Qué incluye:**
- Widget de chat personalizado (colores de la marca)
- Configuración con toda la info del negocio
- Responde preguntas frecuentes 24/7
- Tono personalizado (formal, casual, amigable)
- 2 semanas de ajustes incluidos
- Capacitación básica al cliente

**Proceso de entrega:**
1. Reunión con cliente (30 min) → preguntas frecuentes, productos/precios, horarios, tono
2. Escribir el system prompt personalizado
3. Configurar backend (nueva función o nuevo prompt)
4. Personalizar widget (colores, nombre, mensaje de bienvenida)
5. Integrar en la web del cliente
6. Probar con 10-20 preguntas reales
7. Ajustar prompt según resultados
8. Entrega y capacitación

**Tiempo de entrega:** 2-3 días

**Tu costo real por cliente:**

| Concepto | Costo |
|----------|-------|
| chat-widget.js | Gratis (tu código) |
| Vercel hosting | Gratis |
| API de Claude | ~$3-5/mes |
| **Total mensual** | **~$3-5/mes** |

---

### 3.3 Servicio: Chatbot WhatsApp con IA

**Qué es para el cliente:**
"Tu WhatsApp responde solo. Los clientes preguntan por precios, horarios o disponibilidad y reciben respuesta al instante, a cualquier hora."

**Qué es técnicamente:**
Bot con Baileys (conexión a WhatsApp Web) + API de Claude, corriendo en un VPS.

**Arquitectura:**

```
Cliente manda mensaje por WhatsApp
        ↓
WhatsApp lo recibe
        ↓
Tu bot (Baileys en VPS) lo intercepta
        ↓
Manda el mensaje a la API de Claude con el contexto del negocio
        ↓
Claude genera la respuesta
        ↓
El bot envía la respuesta por WhatsApp automáticamente
(con delay aleatorio de 1-4 segundos para parecer humano)
```

**2 opciones técnicas:**

| | Baileys (recomendado para empezar) | Twilio / API oficial |
|---|---|---|
| Costo | Gratis | ~$0.005/mensaje |
| Límite | ~1,000-2,000 msg/día | Ilimitado |
| Riesgo | Posible bloqueo si abusas | Ninguno |
| Setup | Escanear QR | Configurar webhook |
| Requiere | VPS $5/mes | Cuenta Twilio |
| Ideal para | Negocios pequeños/medianos | Negocios con alto volumen |

**Trucos para evitar bloqueos con Baileys:**
```javascript
// Delay aleatorio antes de responder (parecer humano)
const delay = Math.floor(Math.random() * 3000) + 1000; // 1-4 seg
await new Promise(resolve => setTimeout(resolve, delay));
```
- Usar número con antigüedad (no chip nuevo)
- Solo responder a quienes escriben primero (no spam masivo)
- Para un negocio normal con uso legítimo, no hay problema

**Qué incluye:**
- Configuración completa del bot
- System prompt con toda la info del negocio
- Número dedicado de WhatsApp
- Funciona 24/7
- 2 semanas de ajustes
- Capacitación al cliente

**Proceso de entrega:**
1. Reunión con cliente (30 min)
2. Escribir system prompt personalizado
3. Configurar bot con Baileys
4. Conseguir chip/número dedicado
5. Deploy en VPS (Railway o DigitalOcean)
6. Vincular WhatsApp (escanear QR)
7. Probar con preguntas reales
8. Ajustar y entregar

**Tiempo de entrega:** 3-5 días

**Tu costo real por cliente:**

| Concepto | Costo |
|----------|-------|
| Baileys | Gratis |
| API de Claude | ~$3-5/mes |
| VPS (compartido entre clientes) | ~$1-2/mes por cliente |
| Chip celular | S/. 5-10 (una vez) |
| **Total mensual** | **~$5-7/mes** |

---

### 3.4 Combos (vender juntos)

| Combo | Incluye | Precio sugerido |
|-------|---------|-----------------|
| Web básica | Astro + dominio + hosting 1 año | S/. 500-800 |
| Web + Chatbot web | Web + widget de chat en la web | S/. 800-1,200 |
| Web + Chatbot WhatsApp | Web + bot de WhatsApp | S/. 900-1,300 |
| Paquete completo | Web + chatbot web + chatbot WhatsApp | S/. 1,200-1,800 |

---

## 4. CUÁNTO COBRAR (Precios)

### 4.1 Precios por fase

**Fase 1: Primeros 1-3 clientes (ganar testimonios)**

| Servicio | Precio único | Mensualidad |
|----------|-------------|-------------|
| Página web | S/. 300-500 | S/. 0 (o S/. 50 opcional) |
| Chatbot web | S/. 400-600 | S/. 100-150 |
| Chatbot WhatsApp | S/. 500-700 | S/. 100-150 |
| Combo completo | S/. 800-1,200 | S/. 150-200 |

**Fase 2: Ya tienes testimonios (3-10 clientes)**

| Servicio | Precio único | Mensualidad |
|----------|-------------|-------------|
| Página web | S/. 600-1,000 | S/. 50-80 |
| Chatbot web | S/. 700-1,000 | S/. 150-250 |
| Chatbot WhatsApp | S/. 800-1,200 | S/. 150-250 |
| Combo completo | S/. 1,500-2,500 | S/. 200-350 |

**Fase 3: Negocio establecido (10+ clientes)**

| Servicio | Precio único | Mensualidad |
|----------|-------------|-------------|
| Página web | S/. 1,000-2,000 | S/. 80-150 |
| Chatbot web | S/. 1,000-2,000 | S/. 250-400 |
| Chatbot WhatsApp | S/. 1,200-2,500 | S/. 250-400 |
| Combo completo | S/. 2,500-5,000 | S/. 350-600 |

### 4.2 Modelo de cobro para páginas web

**Opción A: Proyecto + mensualidad (ingreso recurrente)**
- Cobras S/. 500 por el proyecto
- Cobras S/. 50-80/mes por "hosting y mantenimiento"
- Tu costo mensual: ~S/. 4 (dominio prorrateado)
- Tú controlas Vercel y el dominio
- Si quiere cambios: hasta 3 cambios menores/mes incluidos
- Cambios grandes: se cotizan aparte (S/. 50-200)

**Opción B: Proyecto único (sin compromiso)**
- Cobras S/. 800-1,500 de una vez
- Le entregas todo (código + accesos)
- Si después quiere cambios, te contrata de nuevo
- Sin ingreso recurrente pero sin soporte

### 4.3 Modelo de cobro para chatbots

Siempre con mensualidad (el bot necesita estar activo):
- Setup: S/. 500-1,200 (una vez)
- Mantenimiento: S/. 100-250/mes
- Incluye: bot funcionando, ajustes menores al prompt, soporte básico
- Si deja de pagar: desactivas el endpoint y el bot deja de funcionar

### 4.4 Formas de pago
- Yape
- Plin
- Transferencia bancaria
- PayPal (clientes internacionales)
- 50% al inicio, 50% al entregar

### 4.5 Qué incluir en el "mantenimiento"

**SÍ incluye (cosas de 5 minutos):**
- Cambios de texto (precio, horario, teléfono)
- Cambiar 1-2 fotos
- Que la web siga online (automático con Vercel)
- Renovar dominio
- Arreglar link roto
- Máximo 2-3 cambios menores/mes
- Ajustes al prompt del chatbot

**NO incluye (cobrar aparte):**
- Páginas o secciones nuevas
- Rediseño completo
- Crear contenido (textos, fotos)
- Funcionalidades nuevas
- Urgencias fuera de horario

**Comunicar al cliente al cerrar trato:**
"Tu plan incluye hasta 3 modificaciones menores al mes. Los cambios se atienden en 24-48 horas, de lunes a viernes. Cualquier cambio mayor se cotiza por separado."

---

## 5. CÓMO CONSEGUIR CLIENTES

### 5.1 Facebook (canal principal)

**Dónde publicar:**
1. Grupos de Facebook (PRIORIDAD)
   - "Emprendedores Cusco"
   - "Negocios digitales Perú"
   - "Marketing digital para emprendedores"
   - "Emprendedores Latinoamérica"
   - Grupos de nicho: "Dentistas", "Restaurantes Cusco", etc.
   - Meta: 15-20 grupos, publicar en 3-5 por día (rotando)

2. Facebook Marketplace (secundario)
   - Publicar como servicio/producto digital
   - Algunos se eliminan, pero vale intentar

3. Tu perfil personal
   - Posts de valor 2-3 veces por semana

**Regla de oro: NUNCA vendas la tecnología, vende el resultado**

| ❌ NO digas | ✅ SÍ di |
|-------------|----------|
| "Chatbot con IA" | "Tu negocio responde solo 24/7" |
| "API de Claude" | "Asistente inteligente" |
| "JavaScript, React" | "Página web profesional" |
| "Integración con WhatsApp" | "No pierdes clientes de noche" |
| "Automatización" | "Ahorra 4 horas diarias" |

**Estrategia de los primeros 30 días:**
- Semana 1-2: Solo publicas contenido de valor (tips, datos útiles). NO vendes nada.
- Semana 3: Primer post de servicio. Ofrece 1-2 trabajos baratos a cambio de testimonio.
- Semana 4+: 2-3 posts de servicio por semana alternando con valor. Usa testimonios reales.

**Calendario semanal:**

| Día | Qué publicar | Dónde |
|-----|-------------|-------|
| Lunes | Post de valor (tip útil) | 3 grupos |
| Martes | Post de servicio web | 2 grupos + Marketplace |
| Miércoles | Comentar en posts de otros | 5 grupos |
| Jueves | Post de chatbot (nicho específico) | 3 grupos |
| Viernes | Post combo u oferta | 3 grupos + Marketplace |
| Sábado | Historia mostrando tu trabajo | Perfil personal |

### 5.2 Clientes locales en Cusco (directo)

1. Haz lista de 20-30 negocios que podrían beneficiarse
2. Crea demo personalizada rápida (30 min) para ESE negocio
3. Ve al local, o envía WhatsApp, o contacta por Instagram
4. Muestra el demo en tu celular
5. Primeros 2-3: cobra precio bajo a cambio de testimonio

**Negocios ideales en Cusco:**
- Hoteles y hostales (turismo)
- Restaurantes
- Agencias de turismo
- Clínicas y consultorios
- Tiendas de artesanía
- Escuelas de español
- Centros de yoga/spa

### 5.3 Cómo responder cuando te contacten

**Si preguntan precio:**
"¡Hola! Para darte un precio exacto necesito entender tu negocio:
1. ¿A qué te dedicas?
2. ¿Ya tienes web o es desde cero?
3. ¿Qué te interesa más: que te encuentren en Google o automatizar las respuestas a clientes?
Con esa info te armo una propuesta."

**Si dicen "está caro":**
"Entiendo. Piénsalo así: si tu web o tu chatbot te trae 2-3 clientes nuevos al mes, ya se pagó solo. Puedo ofrecerte pago en 2 partes: 50% al inicio y 50% al entregar."

**Si dicen "lo voy a pensar":**
"Perfecto, tómate tu tiempo. Te dejo un dato: cada día sin responder mensajes a tiempo son clientes que se van. ¿Te parece si te escribo en 3 días por si tienes dudas?"

---

## 6. LO QUE NECESITAS CREAR (Archivos y Código)

### 6.1 Para páginas web

```
tu-negocio-template/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          ← Layout base reutilizable
│   ├── components/
│   │   ├── Header.astro          ← Navegación
│   │   ├── Hero.astro            ← Sección principal
│   │   ├── Services.astro        ← Servicios del negocio
│   │   ├── About.astro           ← Sobre nosotros
│   │   ├── Gallery.astro         ← Galería de fotos
│   │   ├── Contact.astro         ← Formulario de contacto
│   │   ├── Footer.astro          ← Pie de página
│   │   └── WhatsAppButton.astro  ← Botón flotante WhatsApp
│   ├── pages/
│   │   └── index.astro           ← Página principal
│   └── styles/
│       └── global.css            ← Estilos (Tailwind)
├── public/
│   └── images/                   ← Fotos del cliente
├── astro.config.mjs
└── package.json
```

**Personalización por cliente (solo cambias esto):**
- Colores (variables CSS)
- Textos (nombre, descripción, servicios, precios)
- Fotos (las que te da el cliente)
- Logo
- Número de WhatsApp
- Info de contacto

**Tiempo por cliente: 2-5 horas**

### 6.2 Para chatbot web

```
chatbot-api/
├── api/
│   └── chat.js                   ← Función serverless (Vercel)
├── public/
│   └── chat-widget.js            ← Widget embebible (vanilla JS)
├── prompts/
│   └── template.txt              ← Template de system prompt
├── package.json
└── vercel.json
```

**chat.js (backend):**
- Recibe mensaje + historial
- Agrega system prompt del negocio
- Llama a Claude API
- Devuelve respuesta
- ~30 líneas de código

**chat-widget.js (frontend):**
- Widget JavaScript puro (sin React)
- Se configura con data-attributes
- Se pega en cualquier web con 1 línea
- Ventana de chat con botón flotante
- Responsive (funciona en celular)
- Indicador de "escribiendo..."

**Personalización por cliente:**
- data-business="Nombre del Negocio"
- data-color="#color"
- data-api="URL del backend"
- data-welcome="Mensaje de bienvenida"
- System prompt con info del negocio

### 6.3 Para chatbot WhatsApp

```
whatsapp-bot/
├── bot.js                        ← Bot principal con Baileys
├── prompts/
│   └── template.txt              ← Template de system prompt
├── auth_info/                    ← Credenciales de sesión WhatsApp (auto)
├── .env                          ← API key y configuración
└── package.json
```

**bot.js:**
- Conecta a WhatsApp vía Baileys
- Muestra QR para vincular
- Escucha mensajes entrantes
- Ignora grupos y mensajes propios
- Llama a Claude con contexto del negocio
- Responde con delay aleatorio (1-4 seg)
- Mantiene historial por número de teléfono

**Personalización por cliente:**
- System prompt con info del negocio
- Número de WhatsApp dedicado
- Reglas de comportamiento del bot

### 6.4 Template de System Prompt (reutilizable)

```
Eres el asistente virtual de "[NOMBRE]", un/una [TIPO] ubicado en [CIUDAD].

INFORMACIÓN BÁSICA:
- Dirección: [DIRECCIÓN]
- Horario: [HORARIOS]
- Contacto: [TELÉFONO/WHATSAPP]
- Formas de pago: [MÉTODOS]

PRODUCTOS/SERVICIOS:
[LISTA CON PRECIOS]

PREGUNTAS FRECUENTES:
- [PREGUNTA]: [RESPUESTA]

PROMOCIONES ACTUALES:
[SI HAY ALGUNA]

REGLAS:
- Responde siempre en español
- Tono: [amable/formal/casual]
- Respuestas cortas (máximo 3-4 oraciones)
- NO inventes información
- Si no sabes: "Voy a consultar con el equipo"
- Si el cliente quiere comprar/reservar: pide [DATOS]
- Si está molesto: ofrece comunicarlo con [PERSONA]
```

---

## 7. COSTOS TOTALES DE OPERACIÓN

### 7.1 Inversión inicial (para arrancar)

| Concepto | Costo | Frecuencia |
|----------|-------|-----------|
| Cuenta Anthropic (Claude API) | $5 crédito inicial | Una vez |
| Chip celular para bot WhatsApp | S/. 5-10 | Una vez |
| Dominio para tu portfolio personal | ~S/. 40 | Anual |
| **Total para arrancar** | **~S/. 60-70** | |

### 7.2 Costos mensuales fijos

| Concepto | Costo |
|----------|-------|
| Vercel (webs + backend) | Gratis |
| VPS para bot WhatsApp (Railway) | ~$5/mes (~S/. 19) |
| Internet (ya lo tienes) | S/. 0 extra |
| **Total fijo mensual** | **~S/. 19** |

### 7.3 Costos variables por cliente

| Concepto | Costo/mes |
|----------|-----------|
| API de Claude por cliente | ~$3-5 (~S/. 12-19) |
| Dominio del cliente (prorrateado) | ~S/. 3.5/mes |
| **Total por cliente** | **~S/. 15-23/mes** |

### 7.4 Margen de ganancia

| Servicio | Cobras/mes | Te cuesta/mes | Ganancia/mes |
|----------|-----------|--------------|-------------|
| Web con mantenimiento | S/. 50-80 | ~S/. 4 | S/. 46-76 |
| Chatbot web | S/. 150-250 | ~S/. 15 | S/. 135-235 |
| Chatbot WhatsApp | S/. 150-250 | ~S/. 20 | S/. 130-230 |
| Combo completo | S/. 250-400 | ~S/. 25 | S/. 225-375 |

**Con 10 clientes en combo:** S/. 2,250 - 3,750/mes recurrentes + proyectos nuevos.

---

## 8. PROYECCIÓN DE INGRESOS

### Mes 1-2 (Arranque)
- Publicar en Facebook diariamente
- Conseguir 1-3 clientes a precio bajo
- Ingresos: S/. 500 - 2,000

### Mes 3-4 (Tracción)
- 3-5 clientes con mensualidad
- Testimonios reales
- Subir precios
- Ingresos: S/. 2,000 - 4,500

### Mes 6+ (Estabilidad)
- 8-15 clientes
- Ingresos recurrentes + proyectos nuevos
- Ingresos: S/. 4,000 - 8,000+

---

## 9. IMÁGENES QUE NECESITAS (Canva)

Para vender bien, necesitas imágenes. Crea estas en Canva (gratis):

1. **Mockup de página web** — Tu template en pantalla de laptop y celular
2. **Antes vs Después** — "Negocio SIN web vs CON web profesional"
3. **Screenshot de chatbot** — Conversación de ejemplo del bot respondiendo
4. **Infografía de beneficios** — "Tu negocio 24/7" con íconos
5. **Comparación de precios** — "Contratar recepcionista vs chatbot"
6. **Testimonio de cliente** — Cuando tengas el primero, crear gráfica
7. **Post de oferta** — Diseño llamativo con precio y beneficios
8. **Tu foto profesional** — Para perfil de Facebook y propuestas

---

## 10. CHECKLIST GENERAL

### Para arrancar (Semana 1)
- [ ] Crear cuenta en Anthropic y obtener API key
- [ ] Hacer primera llamada a la API de Claude desde Node.js
- [ ] Tener template de Astro listo y personalizable
- [ ] Crear el backend del chatbot (api/chat.js)
- [ ] Crear el widget embebible (chat-widget.js)
- [ ] Deploy en Vercel (web + backend)
- [ ] Probar chatbot web completo (frontend + backend)
- [ ] Comprar chip para bot WhatsApp
- [ ] Configurar bot de WhatsApp con Baileys
- [ ] Probar bot de WhatsApp

### Para vender (Semana 2)
- [ ] Crear perfil profesional en Facebook
- [ ] Unirte a 15-20 grupos relevantes
- [ ] Crear cuenta en WhatsApp Business
- [ ] Crear 3-4 imágenes en Canva
- [ ] Preparar respuestas para objeciones
- [ ] Definir precios y formas de pago
- [ ] Crear demo de chatbot con negocio ficticio (para mostrar)
- [ ] Crear demo de web con negocio ficticio

### Para publicar (Semana 3)
- [ ] Publicar contenido de valor en grupos (tips, datos)
- [ ] Comentar y ayudar a otros en grupos
- [ ] Primer post de servicio
- [ ] Ofrecer 1-2 trabajos a precio bajo por testimonios
- [ ] Publicar en Marketplace

### Para crecer (Mes 2+)
- [ ] Conseguir primeros testimonios
- [ ] Subir precios gradualmente
- [ ] Crear contenido regularmente
- [ ] Expandir a clientes locales (ir a negocios en Cusco)
- [ ] Considerar Upwork/Workana para clientes internacionales
- [ ] Crear canal de YouTube o TikTok mostrando tu trabajo

---

## 11. RECURSOS Y LINKS

### APIs
- Anthropic (Claude): https://console.anthropic.com
- OpenAI (alternativa): https://platform.openai.com

### Hosting y deploy
- Vercel: https://vercel.com
- Railway (VPS): https://railway.app
- DigitalOcean: https://digitalocean.com

### Dominios
- Namecheap: https://namecheap.com
- Porkbun: https://porkbun.com

### Herramientas
- Canva: https://canva.com
- Baileys: https://github.com/WhiskeySockets/Baileys
- n8n: https://n8n.io

### Aprendizaje
- Anthropic docs: https://docs.anthropic.com
- Prompting guide: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- Vercel docs: https://vercel.com/docs
- Astro docs: https://docs.astro.build

### Plataformas freelance
- Upwork: https://upwork.com
- Workana: https://workana.com
- GetOnBoard: https://getonbrd.com

---

*Última actualización: Marzo 2026*
*Todo lo que necesitas está aquí. Ahora ejecuta.*
