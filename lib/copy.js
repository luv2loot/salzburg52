import { SUPPORTED_LANGS as LANGS, normalizeLang as normalize } from "@/lib/translations";

export const SUPPORTED_LANGS = LANGS;

function normalizeLang(lang) {
  return normalize(lang);
}

const GREETINGS = {
  en: { morning: "Good morning", afternoon: "Good afternoon", evening: "Good evening", night: "Welcome" },
  de: { morning: "Guten Morgen", afternoon: "Guten Tag", evening: "Guten Abend", night: "Willkommen" },
  it: { morning: "Buongiorno", afternoon: "Buon pomeriggio", evening: "Buona sera", night: "Benvenuti" },
  fr: { morning: "Bonjour", afternoon: "Bon après-midi", evening: "Bonsoir", night: "Bienvenue" },
  es: { morning: "Buenos días", afternoon: "Buenas tardes", evening: "Buenas noches", night: "Bienvenido" }
};

export function getGreetingForTime(lang = "en", date = new Date()) {
  const normalized = normalizeLang(lang);
  const dict = GREETINGS[normalized] ?? GREETINGS.en;

  const hours = date.getHours();
  if (hours >= 5 && hours < 12) return dict.morning;
  if (hours >= 12 && hours < 18) return dict.afternoon;
  if (hours >= 18 && hours < 23) return dict.evening;
  return dict.night;
}

const HERO_COPY = {
  en: {
    title: "Welcome to Salzburg52",
    subtitle:
      "My professional brand and portfolio as an apprentice at HYPERION Hotel Salzburg. I share insights on hospitality excellence and local Salzburg expertise.",
    accent: "HYPERION Hotel Salzburg · Apprentice"
  },
  de: {
    title: "Willkommen bei Salzburg52",
    subtitle:
      "Meine professionelle Marke und mein Portfolio als Lehrling im HYPERION Hotel Salzburg. Ich teile Einblicke in exzellente Gastfreundschaft und lokale Salzburger Expertise.",
    accent: "HYPERION Hotel Salzburg · Lehrling"
  },
  it: {
    title: "Benvenuti su Salzburg52",
    subtitle:
      "Il mio marchio professionale e portfolio come apprendista presso l'HYPERION Hotel Salisburgo. Condivido approfondimenti sull'eccellenza nell'ospitalità e sulla conoscenza locale.",
    accent: "HYPERION Hotel Salisburgo · Apprendista"
  },
  fr: {
    title: "Bienvenue sur Salzburg52",
    subtitle:
      "Ma marque professionnelle et mon portfolio en tant qu'apprenti à l'HYPERION Hotel Salzbourg. Je partage mes réflexions sur l'excellence hôtelière et l'expertise locale.",
    accent: "HYPERION Hotel Salzbourg · Apprenti"
  },
  es: {
    title: "Bienvenido a Salzburg52",
    subtitle:
      "Mi marca profesional y portfolio como aprendiz en HYPERION Hotel Salzburgo. Comparto perspectivas sobre la excelencia en hospitalidad y el conocimiento local.",
    accent: "HYPERION Hotel Salzburgo · Aprendiz"
  }
};

export function getHeroCopy(lang = "en") {
  const normalized = normalizeLang(lang);
  return HERO_COPY[normalized] ?? HERO_COPY.en;
}

const META_DESCRIPTION = {
  en: "Salzburg52 - Professional portfolio of a HYPERION Hotel Salzburg apprentice. Insights on hospitality excellence, service standards, and local Salzburg expertise.",
  de: "Salzburg52 - Professionelles Portfolio eines Lehrlings im HYPERION Hotel Salzburg. Einblicke in exzellente Gastfreundschaft, Servicestandards und lokale Expertise.",
  it: "Salzburg52 - Portfolio professionale di un apprendista presso l'HYPERION Hotel Salisburgo. Approfondimenti sull'eccellenza nell'ospitalità e sulla conoscenza locale.",
  fr: "Salzburg52 - Portfolio professionnel d'un apprenti à l'HYPERION Hotel Salzbourg. Réflexions sur l'excellence hôtelière et l'expertise locale.",
  es: "Salzburg52 - Portfolio profesional de un aprendiz en HYPERION Hotel Salzburgo. Perspectivas sobre la excelencia en hospitalidad y el conocimiento local."
};

export function getMetaDescription(lang = "en") {
  const normalized = normalizeLang(lang);
  return META_DESCRIPTION[normalized] ?? META_DESCRIPTION.en;
}
