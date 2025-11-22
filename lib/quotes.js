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
      text: "Hospitality is just empathy with good timing and clear communication."
    },
    {
      id: "en-fact-1",
      kind: "fact",
      text: "Most guests forget the room number at least once. The important part is that you don’t."
    },
    {
      id: "en-joke-1",
      kind: "joke",
      text: "If check-in was always on time, half the stories at the front desk wouldn’t exist."
    },
    {
      id: "en-fact-2",
      kind: "fact",
      text: "A calm tone at reception solves more problems than any software update."
    },
    {
      id: "en-quote-2",
      kind: "quote",
      text: "Good service feels invisible. You only notice it when it’s missing."
    },
    {
      id: "en-fact-3",
      kind: "fact",
      text: "Salzburg looks like a movie set on sunny days and like a quiet stage on rainy ones."
    },
    {
      id: "en-joke-2",
      kind: "joke",
      text: "Front office math: 1 guest question usually unlocks 3 follow-up questions."
    },
    {
      id: "en-quote-3",
      kind: "quote",
      text: "A smooth check-in doesn’t make a stay perfect, but a chaotic one is hard to forget."
    },
    {
      id: "en-fact-4",
      kind: "fact",
      text: "The lobby is the only place where early birds and night owls regularly meet."
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
      text: "Die meisten Gäste merken sich die Zimmernummer später als den WLAN-Namen."
    },
    {
      id: "de-joke-1",
      kind: "joke",
      text: "„Nur eine kurze Frage“ ist an der Rezeption selten nur eine Frage."
    },
    {
      id: "de-fact-2",
      kind: "fact",
      text: "Ein ruhiger Empfang wirkt stärker als jedes Design-Möbel im Lobbybereich."
    },
    {
      id: "de-quote-2",
      kind: "quote",
      text: "Guter Service ist dann gelungen, wenn sich niemand fragt, wie viel Arbeit dahinter steckt."
    },
    {
      id: "de-fact-3",
      kind: "fact",
      text: "Salzburg ist eine Stadt, in der Touristen und Einheimische oft denselben Ausblick fotografieren."
    },
    {
      id: "de-joke-2",
      kind: "joke",
      text: "Es gibt keine chaotischen Gäste – nur sehr kreative Reisepläne."
    },
    {
      id: "de-quote-3",
      kind: "quote",
      text: "Ein ehrliches Lächeln an der Rezeption bleibt Gästen länger im Kopf als jede Hochglanzbroschüre."
    },
    {
      id: "de-fact-4",
      kind: "fact",
      text: "Der erste Eindruck im Hotel dauert etwa drei Sekunden – der letzte oft bis nach der Abreise."
    }
  ],
  it: [
    {
      id: "it-quote-1",
      kind: "quote",
      text: "L’ospitalità è l’arte di rendere semplice ciò che dietro le quinte è complesso."
    },
    {
      id: "it-fact-1",
      kind: "fact",
      text: "Una reception tranquilla non significa che non succeda niente – solo che è tutto sotto controllo."
    },
    {
      id: "it-joke-1",
      kind: "joke",
      text: "La parola più pericolosa al banco: „velocemente“."
    },
    {
      id: "it-fact-2",
      kind: "fact",
      text: "A Salisburgo alcune strade sembrano pensate solo per essere fotografate al tramonto."
    },
    {
      id: "it-quote-2",
      kind: "quote",
      text: "Un buon soggiorno inizia con informazioni chiare e un check-in senza fretta."
    },
    {
      id: "it-fact-3",
      kind: "fact",
      text: "Dietro ogni arrivo in ritardo c’è quasi sempre una storia interessante."
    },
    {
      id: "it-joke-2",
      kind: "joke",
      text: "In hotel il tempo si misura in: prima del check-in, durante il check-in e dopo il check-out."
    },
    {
      id: "it-quote-3",
      kind: "quote",
      text: "Dettagli piccoli alla reception cambiano spesso l’intera percezione dell’hotel."
    },
    {
      id: "it-fact-4",
      kind: "fact",
      text: "Molti ospiti ricordano meglio il sorriso alla reception che il numero della loro camera."
    }
  ],
  fr: [
    {
      id: "fr-quote-1",
      kind: "quote",
      text: "L’hospitalité, c’est rendre fluide ce qui ne l’est pas forcément en coulisses."
    },
    {
      id: "fr-fact-1",
      kind: "fact",
      text: "Un hall d’hôtel est parfois plus international qu’un aéroport, mais sur une surface bien plus petite."
    },
    {
      id: "fr-joke-1",
      kind: "joke",
      text: "Au front office, « ce sera rapide » est souvent le début d’une longue histoire."
    },
    {
      id: "fr-fact-2",
      kind: "fact",
      text: "Un ton calme à la réception peut transformer un stress de voyage en simple anecdote."
    },
    {
      id: "fr-quote-2",
      kind: "quote",
      text: "Les meilleurs séjours semblent simples – justement parce que quelqu’un a géré la complexité à l’avance."
    },
    {
      id: "fr-fact-3",
      kind: "fact",
      text: "À Salzbourg, la lumière change la ville plusieurs fois par jour, surtout près de la Salzach."
    },
    {
      id: "fr-joke-2",
      kind: "joke",
      text: "La réception connaît trois vitesses: calme, occupé, et « tout le monde arrive en même temps »."
    },
    {
      id: "fr-quote-3",
      kind: "quote",
      text: "Une bonne question posée à la réception vaut dix recherches sur le téléphone."
    },
    {
      id: "fr-fact-4",
      kind: "fact",
      text: "Un simple « bienvenu » dit au bon moment peut sauver une longue journée de voyage."
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
      text: "En un hotel, la recepción es el lugar donde todos los planes se cruzan."
    },
    {
      id: "es-joke-1",
      kind: "joke",
      text: "Frase clásica: „Llegamos temprano pero sólo queremos dejar las maletas…“."
    },
    {
      id: "es-fact-2",
      kind: "fact",
      text: "Un saludo sincero en el check-in pesa más que una frase perfecta aprendida de memoria."
    },
    {
      id: "es-quote-2",
      kind: "quote",
      text: "Un buen front office convierte problemas de viaje en experiencias manejables."
    },
    {
      id: "es-fact-3",
      kind: "fact",
      text: "Salzburgo es una ciudad pequeña con bastantes rincones que parecen esconder otra ciudad detrás."
    },
    {
      id: "es-joke-2",
      kind: "joke",
      text: "El tiempo en recepción se mide por grupos: antes del grupo, durante el grupo y después del grupo."
    },
    {
      id: "es-quote-3",
      kind: "quote",
      text: "Un check-out tranquilo es la última oportunidad de dejar un buen recuerdo del hotel."
    },
    {
      id: "es-fact-4",
      kind: "fact",
      text: "La mayoría de las historias interesantes de un viaje empiezan fuera del horario previsto."
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
