# Changelog

Historial de cambios del proyecto Hispalense Solar.  
Cada entrada documenta qué se hizo, por qué y qué decisiones se tomaron, para poder replicar el proceso en proyectos similares.

---

## 2026-07-11 — Formulario directo a Telegram

**Qué:** Se eliminó Web3Forms del formulario de contacto. El envío va directamente a `/api/telegram-notify`.

**Por qué:** Web3Forms requería una access key configurada como variable de entorno pública. Sin ella, el formulario fallaba y además Telegram nunca se disparaba porque dependía del éxito de Web3Forms.

**Decisiones:**
- El formulario ahora tiene un solo destino: la serverless function de Telegram
- Se movió la detección de bots (honeypot `botcheck`) al lado del servidor
- Se eliminó `PUBLIC_WEB3FORMS_ACCESS_KEY` de `.env.example`
- En el futuro se puede añadir Resend u otro servicio de email como segundo destino en `telegram-notify.js`

---

## 2026-07-11 — Notificaciones de Telegram

**Qué:** Se añadió una Vercel serverless function (`api/telegram-notify.js`) que envía una notificación a Telegram cada vez que alguien rellena el formulario de contacto.

**Por qué:** El email de Web3Forms podía llegar con retraso o perderse en spam. Telegram da notificación instantánea en el móvil.

**Decisiones:**
- La function está en `/api/telegram-notify.js`, directorio raíz del proyecto (Vercel lo detecta automáticamente como serverless function, sin necesidad de adapter de Astro)
- El output de Astro sigue siendo estático — las serverless functions de Vercel conviven con el build estático
- Token y chat ID solo en variables de entorno de Vercel (encrypted), nunca en el código
- Bot creado: `@hispalensesolar_bot` ("Hispalense Solar Leads")

---

## 2026-07-08 — Dominio definitivo

**Qué:** Se actualizó todo el proyecto para usar el dominio `hispalensesolar.es` en lugar de `solar-sevilla-pro.vercel.app`.

**Archivos tocados:**
- `astro.config.mjs` → `SITE_URL`
- `public/robots.txt` → referencia al sitemap
- `public/agent.txt` → dominio en el texto

**Decisiones:**
- Los canonicals se generan automáticamente desde `Astro.site`, así que solo hay que cambiar `SITE_URL` en un sitio
- El dominio se configuró en Vercel (DNS apuntando a Vercel)

---

## 2026-07-08 — Imágenes y contenido ampliado por municipio

**Qué:** Las 12 páginas de municipio pasaron de compartir una imagen genérica a tener cada una su propia foto de Unsplash y contenido ampliado.

**Contenido nuevo por municipio:**
- Población real (INE padrón 2024)
- Tipo de vivienda predominante
- Contexto energético local
- Bonificación IBI verificada (donde existe): Dos Hermanas 50%/5 años, Mairena del Aljarafe 50%/7 años, Tomares 30%/3 años, Utrera 15%/2 años
- Valoración de aptitud solar
- 2 FAQs específicas por municipio (con schema FAQPage)

**Decisiones:**
- Se eliminó el export compartido `municipalityImage` de `coverage.ts`
- Cada municipio tiene su campo `image` con una URL de Unsplash distinta
- Solo se incluyeron datos de bonificación IBI que pudimos verificar en fuentes oficiales
- Los municipios sin datos confirmados de IBI no mencionan bonificación

---

## 2026-07-07 — Rebrand: Solar Sevilla Pro → Hispalense Solar

**Qué:** Se cambió el nombre de marca en toda la web (16 archivos).

**Por qué:** "Solar Sevilla Pro" sonaba genérico. "Hispalense Solar" tiene identidad local (hispalense = de Sevilla) y diferenciación.

**Decisiones:**
- Teléfono, dirección y email NO cambiaron — solo el nombre de marca
- Todo centralizado en `site.ts`, pero también había referencias hardcoded en títulos, metas, schemas y textos que se actualizaron manualmente
- No se cambiaron redes sociales (están pendientes, no añadir ninguna URL de redes sociales)

---

## 2026-07-07 — SEO técnico

**Qué:** Se completó el SEO técnico de la web.

**Elementos añadidos:**
- `public/agent.txt` — resumen en texto plano para agentes IA (datos de negocio, servicios, precios, cobertura)
- `BusinessSummary.astro` — sección de texto en la Home con todos los datos consolidados para LLMs
- Fechas de blog escalonadas (23 jun, 29 jun, 3 jul, 6 jul) en vez de todas el mismo día
- Verificación de canonicals, schemas Organization + WebSite

**Decisiones:**
- `agent.txt` usa datos ya publicados en el sitio, no inventa nada nuevo
- Las fechas se repartieron en las 3 semanas previas al lanzamiento
- `BlogLayout.astro` formatea las fechas en español con `Intl.DateTimeFormat`

---

## 2026-07-07 — Imágenes y contenido en páginas internas

**Qué:** Se añadieron imágenes y contenido ampliado a servicios, municipios y páginas pillar.

**Páginas de servicio (`servicios/[slug].astro`):**
- Proceso de instalación en 5 pasos
- 3 FAQs por servicio (con schema FAQPage)
- Caso práctico ("Caso práctico") por servicio
- Tarjeta de precio con rango orientativo
- Kits solares (solo en residencial)
- Sección BatteryBackup (solo en residencial)

**Páginas de municipio (`zona/[slug].astro`):**
- Imagen por municipio
- Contexto energético y de subvenciones

**Decisiones:**
- Los precios son rangos orientativos, no precios fijos
- No se inventan certificaciones ni reseñas
- Schema Service y FAQPage por cada página de servicio

---

## 2026-07-07 — Imágenes reales de Unsplash

**Qué:** Se sustituyeron todos los placeholders por fotos reales de Unsplash.

**Ubicaciones:**
- Hero: técnico instalando placas
- Servicios: imagen por servicio
- Por qué nosotros: foto de instalación
- Blog: imagen por artículo

**Decisiones:**
- Hotlink directo al CDN de Unsplash (sin descargar ni subir a repo)
- Query params para optimizar: `w=`, `q=`, `auto=format`, `fit=crop`
- Todas las imágenes verificadas individualmente como licencia estándar gratuita (no Unsplash+/Getty)
- Límite de 200KB por imagen — se redujeron `w=` y `q=` en las que excedían
- Alt text descriptivo con keyword en cada imagen

---

## 2026-07-06 — Blog y navegación

**Qué:** Se crearon 4 artículos de blog basados en el benchmark competitivo y se añadió "Blog" al menú de navegación.

**Artículos:**
1. Ayudas al autoconsumo en Sevilla 2026
2. Cuánto se tarda en amortizar las placas solares
3. Financiación de placas solares en Sevilla
4. Mantenimiento de placas solares

**Decisiones:**
- `BlogLayout.astro` como wrapper que inyecta schema BlogPosting
- Artículos como páginas `.astro` individuales (no dinámicas desde datos), porque cada uno tiene contenido extenso y distinto
- `blog.ts` centraliza los metadatos (slug, title, excerpt, date, image) para el índice
- Al añadir "Blog" (6 items) al nav, el header se desbordaba entre 860-980px. Se subió el breakpoint del hamburger a 980px

---

## 2026-07-06 — Sección de baterías, kits y WhatsApp

**Qué:** Se añadió la sección BatteryBackup (apagón abril 2025), kits solares en servicio residencial y el botón de WhatsApp al header.

**Decisiones:**
- BatteryBackup es honesta: explica que una instalación solar SIN batería NO funciona durante un apagón (normativa de seguridad)
- Se usa como hook para vender baterías de respaldo
- El botón de WhatsApp en el header es un círculo con icono de chat (no texto, para no saturar)
- Se ajustó el header para móvil (375px) porque el WhatsApp causaba overflow

---

## 2026-07-06 — Páginas individuales de servicio y municipio

**Qué:** Se crearon las rutas dinámicas `servicios/[slug].astro` y `zona/[slug].astro`.

**Servicios (3):**
- Instalación residencial
- Instalación comercial
- Mantenimiento

**Municipios (12):**
- Sevilla, Dos Hermanas, Alcalá de Guadaíra, Mairena del Aljarafe, Utrera, San Juan de Aznalfarache, Camas, Tomares, La Rinconada, Coria del Río, Bormujos, Gines

**Decisiones:**
- `getStaticPaths()` genera las páginas a partir de los arrays en `services.ts` y `coverage.ts`
- Cada servicio tiene: slug, title, metaTitle, metaDescription, summary, image, description[], includes[], benefits[], process[], priceRange, faq[]
- Cada municipio tiene: slug, name, blurb, intro, highlights[], population, housingType, energyContext, subsidyNote, solarFit, image, faq[]
- Schema LocalBusiness en municipios con `areaServed` específico por ciudad
- Schema Service en servicios

---

## 2026-07-05 — Scaffold inicial

**Qué:** Se creó el proyecto desde cero con Astro 7.

**Páginas iniciales:**
- Home con Hero, servicios teaser, cobertura teaser, por qué nosotros teaser, FAQ, formulario de contacto
- Contacto
- Servicios (listado)
- Zona de cobertura (listado)
- Por qué nosotros

**Decisiones:**
- Output estático (`output: "static"` en Astro) — sin SSR ni adapter
- `@astrojs/sitemap` para generar sitemap automático
- Paleta: navy `#0a2342`, solar yellow `#f5c518`, blanco `#ffffff`
- Tipografía: Inter (Google Fonts)
- Datos centralizados en `src/data/` desde el principio
- JSON-LD schemas desde el primer commit (Organization, WebSite)
- Formulario con Web3Forms (reemplazado por Telegram en julio 11)
- CSS scoped de Astro, con `:global()` solo donde es necesario para hijos
- Sin frameworks JS (React, Vue, etc.) — todo Astro puro
- Sin redes sociales (pendiente, no añadir URLs)
