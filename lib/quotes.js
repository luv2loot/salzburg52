import { SUPPORTED_LANGS } from "./copy";

function normalizeLang(lang) {
  if (!lang) return "en";
  const lower = String(lang).toLowerCase();
  return SUPPORTED_LANGS.includes(lower) ? lower : "en";
}

/**
 * Each item:
 * - id: stable key to avoid repeats
 * - kind: "quote" | "fact" | "joke"
 * - text: string shown to the user
 */
const SNIPPETS_BY_LANG = {
  en: [
    {
      id: "en-quote-1",
      kind: "quote",
      text: "Hospitality is just empathy with good lighting and strong coffee."
    },
    {
      id: "en-fact-1",
      kind: "fact",
      text: "Salzburg is compact enough to cross on foot, but interesting enough to get pleasantly lost in."
    },
    {
      id: "en-joke-1",
      kind: "joke",
      text: "Multilingual bonus: I can misunderstand you politely in five different languages."
    },
    {
      id: "en-fact-2",
      kind: "fact",
      text: "Front office work is 50% organization, 50% improvisation, and 10% doing both at the same time."
    },
    {
      id: "en-quote-2",
      kind: "quote",
      text: "A smooth check-in is the first impression; the last impression is how easy it felt."
    }
  ],
  de: [
    {
      id: "de-quote-1",
      kind: "quote",
      text: "Gastfreundschaft beginnt lange bevor jemand an der Rezeption steht."
    },
    {
      id: "de-fact-1",
      kind: "fact",
      text: "Salzburg ist eine Stadt, in der man sowohl Touristen als auch Einheimische täglich beim Staunen beobachten kann."
    },
    {
      id: "de-joke-1",
      kind: "joke",
      text: "An der Rezeption gibt es keine dummen Fragen – nur sehr unterschiedliche Anreisezeiten."
    },
    {
      id: "de-fact-2",
      kind: "fact",
      text: "Fünf Sprachen helfen – ein ehrliches Lächeln löst trotzdem die meisten Situationen."
    },
    {
      id: "de-quote-2",
      kind: "quote",
      text: "Ein guter Service ist leise: Man merkt ihn erst, wenn er fehlt."
    }
  ],
  it: [
    {
      id: "it-quote-1",
      kind: "quote",
      text: "L’ospitalità è l’arte di far sentire gli altri a casa, restando comunque a Salisburgo."
    },
    {
      id: "it-fact-1",
      kind: "fact",
      text: "Il centro storico di Salisburgo è abbastanza piccolo per camminare ovunque, ma mai noioso."
    },
    {
      id: "it-joke-1",
      kind: "joke",
      text: "Alla reception non esiste il caos, esistono solo più check-in del previsto."
    },
    {
      id: "it-fact-2",
      kind: "fact",
      text: "Parlare più lingue è utile, ma ricordarsi il numero di camera è decisivo."
    },
    {
      id: "it-quote-2",
      kind: "quote",
      text: "Un soggiorno perfetto è fatto di piccoli dettagli che funzionano bene insieme."
    }
  ],
  fr: [
    {
      id: "fr-quote-1",
      kind: "quote",
      text: "L’hospitalité, c’est rendre simple ce qui est compliqué en coulisses."
    },
    {
      id: "fr-fact-1",
      kind: "fact",
      text: "À Salzbourg, on entend presque autant de langues dans le hall d’hôtel que dans la vieille ville."
    },
    {
      id: "fr-joke-1",
      kind: "joke",
      text: "À la réception, le mot “juste une question” annonce rarement une seule question."
    },
    {
      id: "fr-fact-2",
      kind: "fact",
      text: "Un bon accueil combine précision, calme et un sens de l’humour discret."
    },
    {
      id: "fr-quote-2",
      kind: "quote",
      text: "Les meilleurs souvenirs de voyage commencent souvent par un check-in sans stress."
    }
  ],
  es: [
    {
      id: "es-quote-1",
      kind: "quote",
      text: "La hospitalidad es organizar el caos para que el huésped sólo vea calma."
    },
    {
      id: "es-fact-1",
      kind: "fact",
      text: "Salzburgo mezcla historia, música y turismo moderno en muy pocos kilómetros cuadrados."
    },
    {
      id: "es-joke-1",
      kind: "joke",
      text: "En recepción no hay días tranquilos; sólo horas breves entre grupos."
    },
    {
      id: "es-fact-2",
      kind: "fact",
      text: "Hablar varios idiomas es clave, pero recordar los nombres es igual de importante."
    },
    {
      id: "es-quote-2",
      kind: "quote",
      text: "Un buen hotel se nota cuando todo parece fácil, incluso cuando no lo es."
    }
  ]
};

/**
 * Get all snippets for a language.
 */
export function getSnippetsForLang(lang = "en") {
  const normalized = normalizeLang(lang);
  return SNIPPETS_BY_LANG[normalized] ?? SNIPPETS_BY_LANG.en;
}

/**
 * Returns a single random snippet, trying not to repeat the previous id.
 * Pass previousId (stored e.g. in state or localStorage) to avoid repetition.
 */
export function getRandomSnippet(lang = "en", options = {}) {
  const normalized = normalizeLang(lang);
  const list = SNIPPETS_BY_LANG[normalized] ?? SNIPPETS_BY_LANG.en;
  if (!list || list.length === 0) return null;

  const { excludeId } = options;

  const pool =
    excludeId && list.length > 1
      ? list.filter((item) => item.id !== excludeId)
      : list;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  return chosen;
}
