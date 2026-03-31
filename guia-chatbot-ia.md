# 🤖 Guía Práctica: Cómo Armar un Chatbot con IA

> **Para:** Desarrollador JS/React que quiere ofrecer chatbots como servicio
>
> **Resultado:** Un chatbot funcional para web y WhatsApp que puedes vender a negocios

---

## Arquitectura General (Así funciona)

```
Cliente (web/WhatsApp)
        ↓
   Tu servidor (Node.js / Vercel)
        ↓
   API de IA (Claude o OpenAI)
        ↓
   Respuesta al cliente
```

Es así de simple. Tu servidor recibe el mensaje del cliente, le agrega el contexto del negocio (menú, precios, horarios), se lo manda a la API de IA, y devuelve la respuesta. Eso es todo.

---

## PARTE 1: Chatbot para WEB (el más fácil de hacer)

### Paso 1 — Crear el backend (API)

Crea un proyecto nuevo:

```bash
mkdir chatbot-api
cd chatbot-api
npm init -y
npm install express cors @anthropic-ai/sdk dotenv
```

Crea el archivo `.env`:

```env
ANTHROPIC_API_KEY=tu_api_key_aqui
PORT=3001
```

> 💡 Para obtener tu API key:
> - Claude: https://console.anthropic.com → API Keys
> - Cuesta aprox $0.003 por mensaje corto (prácticamente nada)

Crea `server.js`:

```javascript
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================
// CONFIGURACIÓN DEL NEGOCIO
// Esta es la parte que personalizas por cliente
// ============================================
const BUSINESS_CONFIG = {
  name: "Restaurante El Buen Sabor",
  type: "restaurante",
  systemPrompt: `Eres el asistente virtual de "El Buen Sabor", un restaurante de comida peruana en Cusco.

INFORMACIÓN DEL NEGOCIO:
- Dirección: Av. El Sol 456, Cusco
- Horario: Lunes a Sábado 12:00 - 22:00, Domingos 12:00 - 18:00
- Teléfono/WhatsApp: +51 984 123 456
- Delivery: Sí, en toda la zona urbana de Cusco (costo S/. 5)
- Formas de pago: Efectivo, Yape, Plin, tarjeta

MENÚ PRINCIPALES:
- Lomo Saltado: S/. 28
- Ají de Gallina: S/. 25
- Ceviche Clásico: S/. 30
- Pollo a la Brasa (1/4): S/. 18
- Pollo a la Brasa (1/2): S/. 32
- Pollo a la Brasa (Entero): S/. 58
- Chicharrón de Cerdo: S/. 26
- Arroz Chaufa: S/. 22

BEBIDAS:
- Chicha Morada (jarra): S/. 12
- Inca Kola 500ml: S/. 4
- Cerveza Cusqueña: S/. 8
- Limonada: S/. 7

REGLAS DE COMPORTAMIENTO:
- Responde SIEMPRE en español
- Sé amable, cálido y usa un tono peruano natural
- Si preguntan algo que no sabes, di que vas a consultar con el equipo
- Si el cliente quiere hacer un pedido, pídele: nombre, dirección (si es delivery) y método de pago
- NO inventes información que no está aquí arriba
- Si preguntan por platos que no están en el menú, sugiere los que sí tienes
- Mantén respuestas cortas y directas (máximo 3-4 oraciones)
- Si el cliente parece molesto, ofrece comunicarlo con una persona del equipo`
};

// ============================================
// ALMACENAMIENTO DE CONVERSACIONES
// En producción, usa una base de datos
// ============================================
const conversations = new Map();

// ============================================
// ENDPOINT PRINCIPAL DEL CHAT
// ============================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    // Obtener o crear historial de conversación
    const id = sessionId || crypto.randomUUID();
    if (!conversations.has(id)) {
      conversations.set(id, []);
    }
    const history = conversations.get(id);

    // Agregar mensaje del usuario al historial
    history.push({ role: 'user', content: message });

    // Mantener solo los últimos 20 mensajes para no gastar tokens
    const recentHistory = history.slice(-20);

    // Llamar a la API de Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: BUSINESS_CONFIG.systemPrompt,
      messages: recentHistory,
    });

    const assistantMessage = response.content[0].text;

    // Guardar respuesta en historial
    history.push({ role: 'assistant', content: assistantMessage });

    res.json({
      reply: assistantMessage,
      sessionId: id,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Hubo un error al procesar tu mensaje. Intenta de nuevo.',
    });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', business: BUSINESS_CONFIG.name });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Chatbot API corriendo en puerto ${PORT}`);
  console.log(`Negocio: ${BUSINESS_CONFIG.name}`);
});
```

Agrega `"type": "module"` en tu `package.json`.

Prueba que funciona:

```bash
node server.js

# En otra terminal:
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola, ¿cuál es su menú?"}'
```

---

### Paso 2 — Crear el widget de chat (Frontend)

Este es el componente React que puedes integrar en cualquier web (incluyendo Astro):

Crea `ChatWidget.jsx`:

```jsx
import { useState, useRef, useEffect } from 'react';

const CHAT_API_URL = 'https://tu-api.vercel.app/api/chat'; // Cambiar por tu URL

export default function ChatWidget({
  businessName = "Asistente Virtual",
  primaryColor = "#2563eb",
  welcomeMessage = "¡Hola! 👋 ¿En qué puedo ayudarte?",
  position = "right", // "right" o "left"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        setSessionId(data.sessionId);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, hubo un error. ¿Podrías intentar de nuevo?'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Estilos inline para que funcione en cualquier web */}
      <style>{`
        .chat-widget-container * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .chat-bubble {
          position: fixed;
          bottom: 24px;
          ${position}: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: ${primaryColor};
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          z-index: 9999;
          transition: transform 0.2s;
        }
        .chat-bubble:hover { transform: scale(1.1); }
        .chat-window {
          position: fixed;
          bottom: 96px;
          ${position}: 24px;
          width: 370px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
        }
        .chat-header {
          background: ${primaryColor};
          color: white;
          padding: 16px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chat-header-dot {
          width: 10px;
          height: 10px;
          background: #4ade80;
          border-radius: 50%;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f9fafb;
        }
        .chat-msg {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .chat-msg-user {
          align-self: flex-end;
          background: ${primaryColor};
          color: white;
          border-bottom-right-radius: 4px;
        }
        .chat-msg-assistant {
          align-self: flex-start;
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          border-bottom-left-radius: 4px;
        }
        .chat-input-area {
          display: flex;
          padding: 12px;
          border-top: 1px solid #e5e7eb;
          background: white;
          gap: 8px;
        }
        .chat-input {
          flex: 1;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          resize: none;
        }
        .chat-input:focus { border-color: ${primaryColor}; }
        .chat-send {
          background: ${primaryColor};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }
        .chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
        .chat-typing {
          display: flex;
          gap: 4px;
          padding: 10px 14px;
          align-self: flex-start;
        }
        .chat-typing span {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        @media (max-width: 480px) {
          .chat-window {
            width: calc(100vw - 32px);
            height: calc(100vh - 120px);
            bottom: 88px;
            ${position}: 16px;
          }
        }
      `}</style>

      <div className="chat-widget-container">
        {/* Ventana del chat */}
        {isOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-dot"></div>
              {businessName}
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="chat-typing">
                  <span></span><span></span><span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
              />
              <button
                className="chat-send"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        {/* Botón flotante */}
        <button className="chat-bubble" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '💬'}
        </button>
      </div>
    </>
  );
}
```

### Cómo integrarlo en Astro:

```astro
---
// En cualquier página de Astro
---

<html>
  <body>
    <!-- Tu contenido normal -->

    <!-- El chatbot -->
    <ChatWidget
      client:load
      businessName="El Buen Sabor"
      primaryColor="#dc2626"
      welcomeMessage="¡Hola! 👋 Bienvenido a El Buen Sabor. ¿Qué te gustaría saber?"
    />
  </body>
</html>
```

No olvides tener React configurado en Astro:

```bash
npx astro add react
```

---

### Paso 3 — Deployar el backend en Vercel

Transforma tu servidor en una función serverless de Vercel.

Crea la estructura:

```
chatbot-api/
├── api/
│   └── chat.js
├── package.json
└── vercel.json
```

`api/chat.js` (versión serverless):

```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================
// PERSONALIZAR POR CLIENTE
// ============================================
const SYSTEM_PROMPT = `Eres el asistente virtual de "El Buen Sabor", un restaurante de comida peruana en Cusco.

[... aquí va toda la info del negocio ...]

REGLAS:
- Responde siempre en español
- Sé amable y natural
- Respuestas cortas (máximo 3-4 oraciones)
- NO inventes información
- Si no sabes algo, di que consultarás con el equipo`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Construir mensajes con historial
    const messages = [
      ...history.slice(-16), // Últimos 16 mensajes
      { role: 'user', content: message },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    return res.status(200).json({
      reply: response.content[0].text,
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Error procesando el mensaje',
    });
  }
}
```

`vercel.json`:

```json
{
  "functions": {
    "api/chat.js": {
      "maxDuration": 30
    }
  }
}
```

Deploy:

```bash
npm i -g vercel
vercel --prod
# Configura ANTHROPIC_API_KEY en Vercel Dashboard → Settings → Environment Variables
```

Tu chatbot estará en: `https://tu-proyecto.vercel.app/api/chat`

---

## PARTE 2: Chatbot para WhatsApp

### Opción A — Con Baileys (GRATIS, sin API oficial)

Baileys conecta a WhatsApp Web sin costo. Es lo que usan la mayoría de bots pequeños.

```bash
mkdir whatsapp-bot
cd whatsapp-bot
npm init -y
npm install @whiskeysockets/baileys @anthropic-ai/sdk qrcode-terminal dotenv
```

`bot.js`:

```javascript
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys';
import Anthropic from '@anthropic-ai/sdk';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ============================================
// CONFIGURACIÓN DEL NEGOCIO (personalizar)
// ============================================
const SYSTEM_PROMPT = `Eres el asistente virtual por WhatsApp de "Clínica Dental Sonrisa", en Cusco.

INFORMACIÓN:
- Dirección: Calle Plateros 234, Cusco Centro
- Horario: Lunes a Viernes 8:00 - 19:00, Sábados 8:00 - 13:00
- WhatsApp: +51 984 567 890
- Doctora principal: Dra. María López

SERVICIOS Y PRECIOS:
- Limpieza dental: S/. 80
- Consulta general: S/. 50
- Blanqueamiento: S/. 350
- Ortodoncia (consulta): S/. 60
- Extracción simple: S/. 100
- Curación: S/. 60 - S/. 120

SEGUROS: Rímac, Pacífico, La Positiva, ESSALUD (solo consultas)

REGLAS:
- Responde en español, tono amable y profesional
- Para agendar cita: pide nombre, servicio que necesita, y 2-3 horarios de preferencia
- Si es emergencia dental: dar el número directo de la doctora
- Respuestas cortas y claras
- NO diagnostiques ni des consejos médicos específicos
- Si preguntan algo fuera de tu conocimiento: "Voy a consultar con el equipo y te respondo a la brevedad"`;

// Almacenar historial de conversaciones
const conversations = new Map();

async function getAIResponse(userMessage, phoneNumber) {
  // Obtener o crear historial
  if (!conversations.has(phoneNumber)) {
    conversations.set(phoneNumber, []);
  }
  const history = conversations.get(phoneNumber);

  history.push({ role: 'user', content: userMessage });

  // Limitar historial a últimos 20 mensajes
  const recentHistory = history.slice(-20);

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300, // Más corto para WhatsApp
      system: SYSTEM_PROMPT,
      messages: recentHistory,
    });

    const reply = response.content[0].text;
    history.push({ role: 'assistant', content: reply });

    return reply;
  } catch (error) {
    console.error('Error con IA:', error);
    return 'Disculpa, tuve un problema técnico. ¿Podrías repetir tu mensaje?';
  }
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  // Mostrar QR para vincular
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\n📱 Escanea este QR con WhatsApp:\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log('Reconectando...');
        startBot();
      } else {
        console.log('Bot desconectado. Elimina la carpeta auth_info y vuelve a escanear.');
      }
    } else if (connection === 'open') {
      console.log('✅ Bot de WhatsApp conectado y funcionando!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // Escuchar mensajes
  sock.ev.on('messages.upsert', async ({ messages: msgs }) => {
    for (const msg of msgs) {
      // Ignorar mensajes propios, grupos y mensajes vacíos
      if (msg.key.fromMe) continue;
      if (msg.key.remoteJid.includes('@g.us')) continue; // Ignorar grupos

      const text = msg.message?.conversation
        || msg.message?.extendedTextMessage?.text
        || '';

      if (!text) continue;

      const phoneNumber = msg.key.remoteJid;
      console.log(`📩 Mensaje de ${phoneNumber}: ${text}`);

      // Obtener respuesta de IA
      const reply = await getAIResponse(text, phoneNumber);

      // Enviar respuesta
      await sock.sendMessage(phoneNumber, { text: reply });
      console.log(`✅ Respuesta enviada: ${reply.substring(0, 50)}...`);
    }
  });
}

startBot();
```

Ejecución:

```bash
node bot.js
# Escanea el QR con tu WhatsApp (o el del cliente)
# ¡Listo! El bot responde automáticamente
```

⚠️ **Importante sobre Baileys:**
- Funciona con WhatsApp personal (no Business API oficial)
- Meta puede bloquear números que hagan spam masivo
- Para negocios pequeños con volumen normal funciona perfecto
- Necesitas un número de teléfono dedicado para el bot
- Debe correr en un servidor 24/7 (puedes usar un VPS barato de $5/mes en DigitalOcean o Railway)

---

### Opción B — Con Twilio (API oficial, más profesional)

Más confiable pero tiene costo (~$0.005 por mensaje).

```bash
npm install twilio @anthropic-ai/sdk express dotenv
```

```javascript
// api/whatsapp.js (para Vercel o servidor Express)
import Anthropic from '@anthropic-ai/sdk';
import twilio from 'twilio';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export default async function handler(req, res) {
  const { Body: message, From: from } = req.body;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    system: "Tu prompt del negocio aquí...",
    messages: [{ role: 'user', content: message }],
  });

  await twilioClient.messages.create({
    body: response.content[0].text,
    from: 'whatsapp:+14155238886', // Tu número Twilio
    to: from,
  });

  res.status(200).send('OK');
}
```

---

## PARTE 3: Cómo personalizar por cliente

### La clave: solo cambias el SYSTEM_PROMPT

Cuando consigas un nuevo cliente, lo único que necesitas hacer es:

1. **Reunirte con el cliente (30 min)** y preguntarle:
   - ¿Qué preguntas te hacen más seguido?
   - ¿Cuáles son tus productos/servicios y precios?
   - ¿Cuáles son tus horarios?
   - ¿Cómo quieres que responda el bot? (formal, casual, etc.)
   - ¿Qué debe hacer cuando no sepa la respuesta?
   - ¿Cuándo debe pasar la conversación a un humano?

2. **Escribir el system prompt** con toda esa info (como en los ejemplos de arriba)

3. **Deployar** una nueva instancia o agregar el cliente a tu sistema

### Template de System Prompt (copia y adapta):

```
Eres el asistente virtual de "[NOMBRE DEL NEGOCIO]", un/una [TIPO] ubicado en [CIUDAD].

INFORMACIÓN BÁSICA:
- Dirección: [DIRECCIÓN]
- Horario: [HORARIOS]
- Contacto: [TELÉFONO/WHATSAPP]
- Formas de pago: [MÉTODOS]

PRODUCTOS/SERVICIOS:
[LISTA CON PRECIOS]

PREGUNTAS FRECUENTES:
- [PREGUNTA]: [RESPUESTA]
- [PREGUNTA]: [RESPUESTA]

PROMOCIONES ACTUALES:
[SI HAY ALGUNA]

REGLAS DE COMPORTAMIENTO:
- Responde siempre en español
- Tono: [amable/formal/casual/profesional]
- Respuestas cortas (máximo 3-4 oraciones por mensaje)
- NO inventes información que no esté aquí
- Si no sabes algo: "Voy a consultar con el equipo y te respondo pronto"
- Para [ACCIÓN ESPECÍFICA]: pide [DATOS NECESARIOS]
- Si el cliente está molesto: ofrece comunicarlo con [PERSONA]
```

---

## PARTE 4: Costos reales (lo que te cuesta a ti)

### Chatbot Web:

| Concepto | Costo |
|----------|-------|
| API de Claude (Sonnet) | ~$0.003 por mensaje (~$3-5/mes por cliente activo) |
| Vercel hosting | Gratis (plan hobby) |
| Dominio (si aplica) | ~$12/año |
| **Total mensual por cliente** | **~$3-5** |

### Chatbot WhatsApp (Baileys):

| Concepto | Costo |
|----------|-------|
| API de Claude | ~$3-5/mes por cliente |
| VPS para correr el bot | $5-7/mes (compartido entre clientes) |
| Chip/número telefónico | S/. 5-10 (una vez) |
| **Total mensual por cliente** | **~$4-7** |

### Lo que cobras vs lo que gastas:

| | Tú cobras | Te cuesta | Tu ganancia |
|---|---|---|---|
| Setup | S/. 600-800 | ~S/. 0 (solo tu tiempo) | S/. 600-800 |
| Mensualidad | S/. 150-250/mes | ~S/. 15-25/mes | S/. 125-225/mes |

**Con 10 clientes pagando mensualidad:** S/. 1,250 - 2,250/mes de ingreso recurrente.

---

## PARTE 5: Checklist para tu primer chatbot

- [ ] Crear cuenta en Anthropic y obtener API key
- [ ] Crear el backend (server.js o función Vercel)
- [ ] Escribir el system prompt para un negocio de prueba
- [ ] Probar que responde bien con curl o Postman
- [ ] Crear el widget de chat (ChatWidget.jsx)
- [ ] Integrarlo en tu template de Astro
- [ ] Deployar en Vercel
- [ ] Probar todo junto (frontend + backend)
- [ ] Grabar un video/capturas del chatbot funcionando → para tu portfolio
- [ ] Crear demo personalizada para tu primer cliente potencial

---

## 🚀 Consejo final

No necesitas que sea perfecto para empezar a vender. Un chatbot que responde las 10 preguntas más frecuentes de un negocio ya tiene un valor enorme para el cliente.

La magia no está en el código (que como ves, es bastante simple). La magia está en:
1. Escribir un buen system prompt con la info del negocio
2. Venderlo de forma que el cliente entienda el valor
3. Dar buen soporte después de la venta

Empieza con el chatbot web (más fácil) y cuando domines eso, ofrece también WhatsApp.
