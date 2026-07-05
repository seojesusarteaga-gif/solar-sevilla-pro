import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: sustituir por el dominio definitivo cuando esté disponible.
// Mientras tanto, usar la URL asignada por Vercel tras el primer deploy.
const SITE_URL = "https://solar-sevilla-pro.vercel.app";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [sitemap()],
});
