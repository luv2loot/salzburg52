export const SUPPORTED_LANGS = ["en", "de", "it", "fr", "es"];

function normalizeLang(lang) {
  if (!lang) return "en";
  const lower = String(lang).toLowerCase();
  return SUPPORTED_LANGS.includes(lower) ? lower : "en";
}

const GREETINGS = {
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    night: "Still up?"
  },
  de: {
    morning: "Guten Morgen",
    afternoon: "Guten Tag",
    evening: "Guten Abend",
    night: "Noch wach?"
  },
  it: {
    morning: "Buongiorno",
    afternoon: "Buon pomeriggio",
    evening: "Buona sera",
    night: "Ancora sveglio?"
  },
  fr: {
    morning: "Bonjour",
    afternoon: "Bon après-midi",
    evening: "Bonsoir",
    night: "Toujours réveillé·e ?"
  },
  es: {
    morning: "Buenos días",
    afternoon: "Buenas tardes",
    evening: "Buenas noches",
    night: "¿Aún despierto?"
  }
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

/**
 * Hero copy per language – no language-count flex.
 */
const HERO_COPY = {
  en: {
    title: "Hi, I’m Amir Ismaili.",
    subtitle:
      "Front office apprentice at HYPERION Hotel Salzburg, combining reception work, service experience, and calm problem-solving.",
    accent: "Salzburg · Hospitality · Front office"
  },
  de: {
    title: "Hallo, ich bin Amir Ismaili.",
    subtitle:
      "Front-Office-Auszubildender im HYPERION Hotel Salzburg – mit Erfahrung an Rezeption und im Service sowie einem ruhigen Umgang mit Stresssituationen.",
    accent: "Salzburg · Hotellerie · Front Office"
  },
  it: {
    title: "Ciao, sono Amir Ismaili.",
    subtitle:
      "Apprendista al front office all’HYPERION Hotel Salzburg, con esperienza tra reception e servizio e un approccio molto concreto al lavoro.",
    accent: "Salisburgo · Ospitalità · Front office"
  },
  fr: {
    title: "Bonjour, je suis Amir Ismaili.",
    subtitle:
      "Apprenti à la réception de l’HYPERION Hotel Salzburg, avec une approche structurée, calme et orientée service.",
    accent: "Salzbourg · Hôtellerie · Réception"
  },
  es: {
    title: "Hola, soy Amir Ismaili.",
    subtitle:
      "Aprendiz de recepción en el HYPERION Hotel Salzburg, con experiencia en trato al huésped y trabajo de front office.",
    accent: "Salzburgo · Hospitalidad · Recepción"
  }
};

export function getHeroCopy(lang = "en") {
  const normalized = normalizeLang(lang);
  return HERO_COPY[normalized] ?? HERO_COPY.en;
}

/**
 * Meta descriptions – also language-neutral about skills.
 */
const META_DESCRIPTION = {
  en: "Personal website of Amir Ismaili in Salzburg. Front office apprentice at HYPERION Hotel Salzburg, focused on calm, structured hospitality.",
  de: "Persönliche Website von Amir Ismaili in Salzburg. Front-Office-Auszubildender im HYPERION Hotel Salzburg mit Fokus auf ruhige, strukturierte Gastbetreuung.",
  it: "Sito personale di Amir Ismaili a Salisburgo. Apprendista al front office dell’HYPERION Hotel Salzburg con un approccio calmo e strutturato.",
  fr: "Site personnel d’Amir Ismaili à Salzbourg. Apprenti à la réception de l’HYPERION Hotel Salzburg, avec une approche calme et structurée.",
  es: "Sitio personal de Amir Ismaili en Salzburgo. Aprendiz de recepción en el HYPERION Hotel Salzburg, con un enfoque tranquilo y estructurado."
};

export function getMetaDescription(lang = "en") {
  const normalized = normalizeLang(lang);
  return META_DESCRIPTION[normalized] ?? META_DESCRIPTION.en;
}
