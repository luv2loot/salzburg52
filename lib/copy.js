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

/**
 * Returns a greeting string based on local time.
 * You can pass a Date from the client (user timezone) for true local greeting.
 */
export function getGreetingForTime(lang = "en", date = new Date()) {
  const normalized = normalizeLang(lang);
  const dict = GREETINGS[normalized] ?? GREETINGS.en;

  const hours = date.getHours(); // 0–23

  if (hours >= 5 && hours < 12) return dict.morning;
  if (hours >= 12 && hours < 18) return dict.afternoon;
  if (hours >= 18 && hours < 23) return dict.evening;
  return dict.night;
}

/**
 * Static hero copy per language.
 * This is where we inject your personal data once and reuse it everywhere.
 */
const HERO_COPY = {
  en: {
    title: "Hi, I’m Amir Ismaili.",
    subtitle:
      "Front office apprentice at HYPERION Hotel Salzburg, combining hospitality, service, and five languages to make stays feel effortless.",
    accent: "Salzburg · Hospitality · Five languages"
  },
  de: {
    title: "Hallo, ich bin Amir Ismaili.",
    subtitle:
      "Front-Office-Auszubildender im HYPERION Hotel Salzburg – mit Serviceerfahrung, Empfangs-Know-how und fünf Sprachen für einen entspannten Aufenthalt.",
    accent: "Salzburg · Hotellerie · Fünf Sprachen"
  },
  it: {
    title: "Ciao, sono Amir Ismaili.",
    subtitle:
      "Apprendista al front office all’HYPERION Hotel Salzburg: accoglienza, servizio e cinque lingue per un soggiorno senza stress.",
    accent: "Salisburgo · Ospitalità · Cinque lingue"
  },
  fr: {
    title: "Bonjour, je suis Amir Ismaili.",
    subtitle:
      "Apprenti à la réception de l’HYPERION Hotel Salzburg, avec expérience en service et cinq langues pour rendre votre séjour fluide.",
    accent: "Salzbourg · Hôtellerie · Cinq langues"
  },
  es: {
    title: "Hola, soy Amir Ismaili.",
    subtitle:
      "Aprendiz de recepción en el HYPERION Hotel Salzburg, con experiencia en servicio y cinco idiomas para que tu estancia sea sencilla.",
    accent: "Salzburgo · Hospitalidad · Cinco idiomas"
  }
};

export function getHeroCopy(lang = "en") {
  const normalized = normalizeLang(lang);
  return HERO_COPY[normalized] ?? HERO_COPY.en;
}

/**
 * Basic meta / description text per language.
 * Can be used later in dynamic metadata if needed.
 */
const META_DESCRIPTION = {
  en: "Personal website of Amir Ismaili in Salzburg. Front office apprentice at HYPERION Hotel Salzburg, speaking five languages.",
  de: "Persönliche Website von Amir Ismaili in Salzburg. Front-Office-Auszubildender im HYPERION Hotel Salzburg, spricht fünf Sprachen.",
  it: "Sito personale di Amir Ismaili a Salisburgo. Apprendista al front office dell’HYPERION Hotel Salzburg, parla cinque lingue.",
  fr: "Site personnel d’Amir Ismaili à Salzbourg. Apprenti à la réception de l’HYPERION Hotel Salzburg, parle cinq langues.",
  es: "Sitio personal de Amir Ismaili en Salzburgo. Aprendiz de recepción en el HYPERION Hotel Salzburg, habla cinco idiomas."
};

export function getMetaDescription(lang = "en") {
  const normalized = normalizeLang(lang);
  return META_DESCRIPTION[normalized] ?? META_DESCRIPTION.en;
}
