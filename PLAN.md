# Plan — create-duskapp CLI

> Documento privado. No se sube a GitHub.

---

## Qué es

Un CLI propio que permite crear proyectos desde templates con un solo comando:

```bash
pnpm create duskapp
```

Muestra un menú interactivo, el usuario elige el template, y el CLI clona el repo correspondiente y lo deja listo para configurar.

---

## Cómo funciona (flujo completo)

```
pnpm create duskapp
        │
        ▼
┌─────────────────────────────────┐
│  ¿Cómo se llama el proyecto?    │  → nombre de carpeta
│  ej: restaurante-garcia         │
└─────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│  ¿Qué template querés usar?     │
│  ❯ 🍽️  Restaurant Landing Page  │
│    🏔️  Tourism Agency           │
│    💇  Barbershop / Salón       │
└─────────────────────────────────┘
        │
        ▼
  Clona el repo del template
  desde GitHub con degit
  (sin historial de git)
        │
        ▼
  Crea carpeta con el nombre
  elegido por el usuario
        │
        ▼
┌─────────────────────────────────┐
│  ✅ Proyecto listo              │
│                                 │
│  Siguientes pasos:              │
│  1. cd restaurante-garcia       │
│  2. pnpm install                │
│  3. Configurá el .env           │
│  4. pnpm dev                    │
└─────────────────────────────────┘
```

---

## Estructura de repos en GitHub

```
github.com/tuusuario/dusk-app
  ├── branch: restaurant    ← template restaurantes ✅ (ya existe)
  ├── branch: tourism       ← agencias de turismo (futuro)
  └── branch: barbershop    ← barberías / salones (futuro)

github.com/tuusuario/create-dusk-app  ← el CLI (se publica en npm)
```

Un solo repo con branches — cada branch es un template. El CLI los clona con `degit` usando la sintaxis `repo#branch`.

---

## Estructura del paquete create-duskapp

```
create-duskapp/
  ├── src/
  │   └── index.ts       ← lógica principal del CLI
  ├── package.json
  ├── tsconfig.json
  └── README.md
```

### package.json (lo importante)

```json
{
  "name": "create-duskapp",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "create-duskapp": "./dist/index.js"
  },
  "dependencies": {
    "@clack/prompts": "^0.9.0",
    "degit": "^2.8.4"
  }
}
```

El campo `bin` es lo que permite hacer `pnpm create duskapp` — npm busca un paquete llamado `create-duskapp` y ejecuta el binario.

---

## Código del CLI (src/index.ts)

```typescript
#!/usr/bin/env node
import * as p from '@clack/prompts'
import degit from 'degit'
import path from 'path'

// Templates disponibles — agregar nuevos acá
const TEMPLATES = [
  {
    value: 'restaurant',
    label: '🍽️  Restaurant Landing Page',
    hint: 'Con menú, galería, reservas y WhatsApp',
    repo: 'tuusuario/dusk-app#restaurant',
  },
  {
    value: 'tourism',
    label: '🏔️  Tourism Agency',
    hint: 'Tours, galería, reservas y WhatsApp',
    repo: 'tuusuario/dusk-app#tourism',
  },
]

async function main() {
  p.intro('✦ create-duskapp')

  const projectName = await p.text({
    message: '¿Cómo se llama el proyecto?',
    placeholder: 'mi-restaurante',
    validate: (v) => (!v ? 'El nombre es requerido.' : undefined),
  })

  const template = await p.select({
    message: '¿Qué template querés usar?',
    options: TEMPLATES,
  })

  if (p.isCancel(projectName) || p.isCancel(template)) {
    p.cancel('Operación cancelada.')
    process.exit(0)
  }

  const selectedTemplate = TEMPLATES.find((t) => t.value === template)!
  const targetDir = path.resolve(process.cwd(), projectName as string)

  const spinner = p.spinner()
  spinner.start('Clonando template...')

  try {
    const emitter = degit(selectedTemplate.repo, { cache: false, force: true })
    await emitter.clone(targetDir)
    spinner.stop('Template clonado.')
  } catch (err) {
    spinner.stop('Error al clonar el template.')
    p.cancel(String(err))
    process.exit(1)
  }

  p.outro(`
✅ Proyecto listo en ./${projectName}

  Siguientes pasos:
  1. cd ${projectName}
  2. pnpm install
  3. Copiá .env.example → .env y completá las variables
  4. pnpm dev
  `)
}

main()
```

---

## Pasos para crear el paquete

### 1. Crear el repo en GitHub
- Nombre: `create-duskapp`
- Privado o público (público para publicar en npm)

### 2. Inicializar el proyecto
```bash
mkdir create-duskapp
cd create-duskapp
pnpm init
pnpm add @clack/prompts degit
pnpm add -D typescript @types/node
```

### 3. Configurar tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true
  }
}
```

### 4. Agregar script de build en package.json
```json
"scripts": {
  "build": "tsc",
  "dev": "tsc --watch"
}
```

### 5. Publicar en npm
```bash
npm login
pnpm build
npm publish --access public
```

Después de publicar:
```bash
pnpm create duskapp  # ← esto funciona en cualquier máquina
```

---

## Cómo agregar un template nuevo

1. Crear el repo `duskapp-tourism` en GitHub con el código del template
2. Agregar una entrada al array `TEMPLATES` en `src/index.ts`:
```typescript
{
  value: 'tourism',
  label: '🏔️  Tourism Agency',
  hint: 'Tours, galería, reservas y WhatsApp',
  repo: 'tuusuario/duskapp-tourism',
},
```
3. Hacer build y republicar en npm: `pnpm build && npm publish`

---

## Estado actual

| Template | Repo | Estado |
|----------|------|--------|
| Restaurant Landing Page | `dusk-app` branch `restaurant` | ✅ Listo |
| Tourism Agency | `dusk-app` branch `tourism` | 🔜 Pendiente |
| Barbershop / Salón | `dusk-app` branch `barbershop` | 🔜 Pendiente |

---

## Orden de implementación

1. ✅ Terminar el template de restaurantes
2. ✅ Renombrar repo a `dusk-app` y branch `main` → `restaurant`
3. 🔜 Crear el repo `create-dusk-app` y publicar en npm
4. 🔜 Probar: `pnpm create dusk-app` en una carpeta limpia
5. 🔜 Crear branch `tourism` en `dusk-app` para el template de turismo
