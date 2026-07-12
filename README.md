# Hispalense Solar

Web de rank & rent para instalaciones de placas solares en Sevilla.  
Dominio: **hispalensesolar.es**

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 7 (output estático) |
| Hosting | Vercel (auto-deploy desde `master`) |
| Sitemap | `@astrojs/sitemap` |
| Tipografía | Inter (Google Fonts) |
| Formulario | Envío directo a Telegram vía serverless function |
| Imágenes | Unsplash CDN (hotlink con params `w=`, `q=`, `auto=format`) |

## Estructura del proyecto

```
src/
├── data/               # Datos centralizados (editar aquí para cambiar contenido)
│   ├── site.ts         # Marca, teléfono, dirección, email
│   ├── services.ts     # 3 servicios con slugs, FAQs, kits, proceso
│   ├── coverage.ts     # 12 municipios con datos INE, bonificaciones IBI, FAQs
│   ├── blog.ts         # 4 artículos con fechas escalonadas
│   ├── nav.ts          # 6 enlaces de navegación
│   ├── faq.ts          # FAQs generales de la Home
│   └── why-us.ts       # Puntos de diferenciación
│
├── layouts/
│   └── Layout.astro    # Shell HTML: meta, OG, canonical, JSON-LD base
│
├── components/
│   ├── Header.astro    # Sticky, hamburger a 980px, WhatsApp + teléfono
│   ├── Hero.astro      # Gradiente navy, H1, CTAs, foto Unsplash
│   ├── ContactForm.astro      # Formulario → /api/telegram-notify
│   ├── BatteryBackup.astro    # Sección apagón abril 2025 + baterías
│   ├── BlogLayout.astro       # Wrapper para artículos con schema BlogPosting
│   ├── BusinessSummary.astro  # Resumen textual para LLMs
│   ├── Faq.astro              # FAQ reutilizable con schema FAQPage
│   ├── Icon.astro             # SVG icons inline
│   └── ...teasers             # Secciones de Home (servicios, cobertura, por qué)
│
├── pages/
│   ├── index.astro            # Home
│   ├── contacto.astro         # Formulario de contacto
│   ├── servicios.astro        # Listado de servicios
│   ├── servicios/[slug].astro # Detalle de servicio (getStaticPaths)
│   ├── zona-cobertura.astro   # Listado de municipios
│   ├── zona/[slug].astro      # Detalle de municipio (getStaticPaths)
│   ├── por-que-nosotros.astro # Página de confianza
│   └── blog/                  # 4 artículos + index
│
api/
└── telegram-notify.js  # Vercel serverless function (NO es parte de Astro)

public/
├── agent.txt           # Resumen para agentes IA
└── robots.txt          # Apunta al sitemap
```

## Patrones reutilizables

### Datos centralizados en `src/data/`

Todo el contenido está en archivos `.ts` tipados. Para crear una web similar:
1. Duplicar el proyecto
2. Editar `site.ts` (marca, teléfono, dirección)
3. Editar `services.ts` (servicios del nicho)
4. Editar `coverage.ts` (municipios de la zona)
5. Editar `blog.ts` (artículos)

### Páginas dinámicas con `getStaticPaths()`

Los servicios y municipios usan rutas dinámicas (`[slug].astro`). Basta con añadir o quitar entradas en los archivos de datos para crear/eliminar páginas.

### JSON-LD Schemas

- **Layout.astro**: Organization + WebSite (global) + FAQPage (opcional) + slot `extraSchema`
- **zona/[slug].astro**: LocalBusiness con `areaServed` por municipio
- **servicios/[slug].astro**: Service schema
- **BlogLayout.astro**: BlogPosting con `image` y `datePublished`

### Formulario → Telegram

El formulario envía un POST a `/api/telegram-notify` (Vercel serverless function). No depende de servicios externos de terceros. Incluye:
- Honeypot `botcheck` (campo oculto que los bots rellenan, el servidor lo descarta silenciosamente)
- Variables de entorno en Vercel: `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`

### Imágenes Unsplash

Hotlink directo al CDN de Unsplash con query params para optimizar:
```
https://images.unsplash.com/photo-XXXXX?w=700&q=70&auto=format&fit=crop
```
Todas verificadas como licencia estándar gratuita de Unsplash (no Unsplash+/Getty).

### SEO

- Canonical automático desde `Astro.url.pathname` + `Astro.site`
- Meta title y description por página
- Open Graph tags
- `agent.txt` para agentes IA
- `robots.txt` con referencia al sitemap
- Fechas de blog escalonadas (no todas el mismo día)
- Datos reales verificados (población INE 2024, bonificaciones IBI municipales)

## Paleta de colores

| Color | Hex | Uso |
|-------|-----|-----|
| Navy | `#0a2342` | Fondo principal, textos |
| Solar Yellow | `#f5c518` | CTAs, acentos |
| Blanco | `#ffffff` | Fondos claros |

## Variables de entorno

| Variable | Dónde | Descripción |
|----------|-------|-------------|
| `TELEGRAM_BOT_TOKEN` | Vercel (encrypted) | Token del bot de Telegram |
| `TELEGRAM_CHAT_ID` | Vercel (encrypted) | Chat ID para notificaciones |

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # Build estático
npm run preview   # Previsualizar build
```

## Deploy

Push a `master` en GitHub → Vercel despliega automáticamente.
