import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE_URL = "https://hispalensesolar.es";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [sitemap()],
});
