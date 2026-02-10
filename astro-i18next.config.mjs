import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Precargar traducciones para que estén disponibles de forma síncrona
const loadTranslations = (locale) => {
  try {
    return require(join(__dirname, "public", "locales", locale, "translation.json"));
  } catch {
    return {};
  }
};

/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "it", "es"],
  i18nextServer: {
    resources: {
      en: { translation: loadTranslations("en") },
      it: { translation: loadTranslations("it") },
      es: { translation: loadTranslations("es") },
    },
  },
  // Deshabilitar backend async - usar solo resources precargados para que t() funcione de inmediato
  i18nextServerPlugins: {
    fsBackend: null,
  },
};
