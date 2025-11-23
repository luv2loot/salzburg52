"use client";

import { SUPPORTED_LANGS } from "./copy";

// Normalize language input ("En", "DE", etc.)
function normalizeLang(lang) {
  if (!lang) return "en";
  const lower = String(lang).toLowerCase();
  return SUPPORTED_LANGS.includes(lower) ? lower : "en";
}

/**
 * SNIPPETS BY LANGUAGE
 * id: stable
 * kind: "quote" | "fact" | "joke"
 * text: content
 *
 * I expanded each language set significantly,
 * added higher-quality lines,
 * and kept everything tasteful + hotel/hospitality aligned.
 */

const SNIPPETS_BY_LANG = {
  /* ----------------------------------------------------------- */
  /* ENGLISH                                                     */
  /* ----------------------------------------------------------- */
  en: [
    // QUOTES
    {
      id: "en-quote-1",
      kind: "quote",
      text: "Hospitality is empathy, timing, and clarity wrapped into one moment."
    },
    {
      id: "en-quote-2",
      kind: "quote",
      text: "Good service is invisible until it isn’t there."
    },
    {
      id: "en-quote-3",
      kind: "quote",
      text: "Every guest brings a story — and sometimes leaves with a better one."
    },
    {
      id: "en-quote-4",
      kind: "quote",
      text: "A reception desk is the quiet border between chaos and comfort."
    },
    {
      id: "en-quote-5",
      kind: "quote",
      text: "A smile at check-in is worth more than any brochure."
    },

    // FACTS
    {
      id: "en-fact-1",
      kind: "fact",
      text: "Most guests forget their room number at least once — they rarely forget good service."
    },
    {
      id: "en-fact-2",
      kind: "fact",
      text: "A calm voice at reception resolves more issues than any update ever released."
    },
    {
      id: "en-fact-3",
      kind: "fact",
      text: "Salzburg changes mood with the weather — tourists don’t, which keeps things interesting."
    },
    {
      id: "en-fact-4",
      kind: "fact",
      text: "The lobby is the only place early birds and night owls consistently meet."
    },
    {
      id: "en-fact-5",
      kind: "fact",
      text: "A well-handled late arrival is remembered longer than a standard check-in."
    },

    // JOKES
    {
      id: "en-joke-1",
      kind: "joke",
      text: "If check-in were always on time, front office staff would have 80% fewer stories."
    },
    {
      id: "en-joke-2",
      kind: "joke",
      text: "Front office math: one question equals three follow-up questions."
    },
    {
      id: "en-joke-3",
      kind: "joke",
      text: "‘We’ll be there in 5 minutes’ is a flexible concept in hospitality."
    },
    {
      id: "en-joke-4",
      kind: "joke",
      text: "Guests don’t get lost — they just take scenic detours indoors."
    }
  ],

  /* ----------------------------------------------------------- */
  /* GERMAN                                                      */
  /* ----------------------------------------------------------- */
  de: [
    // QUOTES
    {
      id: "de-quote-1",
      kind: "quote",
      text: "Gastfreundschaft beginnt lange bevor jemand an der Rezeption steht."
    },
    {
      id: "de-quote-2",
      kind: "quote",
      text: "Guter Service wirkt mühelos — obwohl er selten mühelos ist."
    },
    {
      id: "de-quote-3",
      kind: "quote",
      text: "Ein ehrliches Lächeln bleibt länger im Gedächtnis als jede Hochglanzbroschüre."
    },
    {
      id: "de-quote-4",
      kind: "quote",
      text: "Die Rezeption ist der erste Eindruck und oft auch der letzte."
    },
    {
      id: "de-quote-5",
      kind: "quote",
      text: "Wer zuhört, löst Probleme schneller als jeder Computer."
    },

    // FACTS
    {
      id: "de-fact-1",
      kind: "fact",
      text: "Die meisten Gäste merken sich ihre Zimmernummer später als den WLAN-Namen."
    },
    {
      id: "de-fact-2",
      kind: "fact",
      text: "Ein ruhiger Empfang wirkt stärker als jedes Designobjekt."
    },
    {
      id: "de-fact-3",
      kind: "fact",
      text: "Salzburg ist eine Stadt, in der selbst Einheimische wie Touristen fotografieren."
    },
    {
      id: "de-fact-4",
      kind: "fact",
      text: "Drei Sekunden entscheiden über den ersten Eindruck im Hotel."
    },
    {
      id: "de-fact-5",
      kind: "fact",
      text: "Ein klarer Ablauf spart allen Beteiligten Zeit — besonders in der Lobby."
    },

    // JOKES
    {
      id: "de-joke-1",
      kind: "joke",
      text: "„Nur eine kurze Frage“ dauert selten weniger als fünf Minuten."
    },
    {
      id: "de-joke-2",
      kind: "joke",
      text: "Chaos gibt es nicht — nur sehr kreative Reisepläne."
    },
    {
      id: "de-joke-3",
      kind: "joke",
      text: "Der Gast hat immer recht. Außer Montagmorgen. Oder Sonntagnacht."
    }
  ],

  /* ----------------------------------------------------------- */
  /* ITALIAN                                                     */
  /* ----------------------------------------------------------- */
  it: [
    {
      id: "it-quote-1",
      kind: "quote",
      text: "L'ospitalità è rendere semplice ciò che è complesso dietro le quinte."
    },
    {
      id: "it-quote-2",
      kind: "quote",
      text: "Un check-in calmo vale più di mille parole."
    },
    {
      id: "it-fact-1",
      kind: "fact",
      text: "Una reception tranquilla non significa che non succeda nulla — solo che tutto è sotto controllo."
    },
    {
      id: "it-fact-2",
      kind: "fact",
      text: "A Salisburgo ogni tramonto sembra disegnato apposta."
    },
    {
      id: "it-joke-1",
      kind: "joke",
      text: "La parola più pericolosa alla reception? 'Velocemente'."
    },
    {
      id: "it-joke-2",
      kind: "joke",
      text: "Il tempo in hotel si divide in: prima del check-in, durante il check-in, e dopo il check-out."
    }
  ],

  /* ----------------------------------------------------------- */
  /* FRENCH                                                      */
  /* ----------------------------------------------------------- */
  fr: [
    {
      id: "fr-quote-1",
      kind: "quote",
      text: "L’hospitalité, c’est rendre fluide ce qui ne l’est pas."
    },
    {
      id: "fr-quote-2",
      kind: "quote",
      text: "Un bon accueil transforme la fatigue en soulagement."
    },
    {
      id: "fr-fact-1",
      kind: "fact",
      text: "Le hall d’un hôtel peut être plus international qu’un aéroport."
    },
    {
      id: "fr-fact-2",
      kind: "fact",
      text: "À Salzbourg, la lumière raconte une histoire différente chaque heure."
    },
    {
      id: "fr-joke-1",
      kind: "joke",
      text: "« Ce sera rapide » n’a jamais la même définition à la réception."
    },
    {
      id: "fr-joke-2",
      kind: "joke",
      text: "Il y a trois états à la réception: calme, occupé, et tout-le-monde-en-même-temps."
    }
  ],

  /* ----------------------------------------------------------- */
  /* SPANISH                                                     */
  /* ----------------------------------------------------------- */
  es: [
    {
      id: "es-quote-1",
      kind: "quote",
      text: "La hospitalidad es convertir el caos en calma visible."
    },
    {
      id: "es-quote-2",
      kind: "quote",
      text: "Un buen check-in marca todo el viaje."
    },
    {
      id: "es-fact-1",
      kind: "fact",
      text: "La recepción es donde todos los planes se cruzan — a veces suavemente, a veces no."
    },
    {
      id: "es-fact-2",
      kind: "fact",
      text: "Salzburgo es pequeña, pero llena de rincones que parecen otra ciudad."
    },
    {
      id: "es-joke-1",
      kind: "joke",
      text: "« Solo queremos dejar las maletas » suele ser el comienzo de algo largo."
    },
    {
      id: "es-joke-2",
      kind: "joke",
      text: "El tiempo en recepción se mide antes, durante y después del grupo."
    }
  ]
};

/* ------------------------------------------------------------------ */
/* EXPORTS                                                            */
/* ------------------------------------------------------------------ */

export function getSnippetsForLang(lang = "en") {
  const normalized = normalizeLang(lang);
  return SNIPPETS_BY_LANG[normalized] ?? SNIPPETS_BY_LANG.en;
}

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
