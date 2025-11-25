export const SUPPORTED_LANGS = ["en", "de", "it", "fr", "es"];

function normalizeLang(lang) {
  if (!lang) return "en";
  const lower = String(lang).toLowerCase();
  return SUPPORTED_LANGS.includes(lower) ? lower : "en";
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
      "My professional brand and portfolio as an apprentice at HYPERION Hotel Salzburg. Sharing insights on hospitality excellence and local Salzburg expertise.",
    accent: "HYPERION Hotel Salzburg · Apprentice"
  },
  de: {
    title: "Willkommen bei Salzburg52",
    subtitle:
      "Meine professionelle Marke und Portfolio als Lehrling im HYPERION Hotel Salzburg. Teile Einblicke in Gastfreundschafts-Exzellenz und lokale Salzburger Expertise.",
    accent: "HYPERION Hotel Salzburg · Lehrling"
  },
  it: {
    title: "Benvenuti a Salzburg52",
    subtitle:
      "Il mio marchio professionale e portfolio come apprendista presso l'HYPERION Hotel Salisburgo. Condivido approfondimenti sull'eccellenza nell'ospitalità e competenza locale.",
    accent: "HYPERION Hotel Salisburgo · Apprendista"
  },
  fr: {
    title: "Bienvenue à Salzburg52",
    subtitle:
      "Ma marque professionnelle et portfolio en tant qu'apprenti à l'HYPERION Hotel Salzbourg. Je partage des perspectives sur l'excellence hôtelière et l'expertise locale.",
    accent: "HYPERION Hotel Salzbourg · Apprenti"
  },
  es: {
    title: "Bienvenido a Salzburg52",
    subtitle:
      "Mi marca profesional y portfolio como aprendiz en HYPERION Hotel Salzburgo. Compartiendo perspectivas sobre excelencia en hospitalidad y experiencia local.",
    accent: "HYPERION Hotel Salzburgo · Aprendiz"
  }
};

export function getHeroCopy(lang = "en") {
  const normalized = normalizeLang(lang);
  return HERO_COPY[normalized] ?? HERO_COPY.en;
}

const META_DESCRIPTION = {
  en: "Salzburg52 - Professional portfolio of an HYPERION Hotel Salzburg apprentice. Insights on hospitality excellence, service standards, and local Salzburg expertise.",
  de: "Salzburg52 - Professionelles Portfolio eines Lehrlings im HYPERION Hotel Salzburg. Einblicke in Gastfreundschafts-Exzellenz, Servicestandards und lokale Expertise.",
  it: "Salzburg52 - Portfolio professionale di un apprendista presso HYPERION Hotel Salisburgo. Approfondimenti sull'eccellenza nell'ospitalità e competenza locale.",
  fr: "Salzburg52 - Portfolio professionnel d'un apprenti à l'HYPERION Hotel Salzbourg. Perspectives sur l'excellence hôtelière et l'expertise locale.",
  es: "Salzburg52 - Portfolio profesional de un aprendiz en HYPERION Hotel Salzburgo. Perspectivas sobre excelencia en hospitalidad y experiencia local."
};

export function getMetaDescription(lang = "en") {
  const normalized = normalizeLang(lang);
  return META_DESCRIPTION[normalized] ?? META_DESCRIPTION.en;
}
