export const SUPPORTED_LANGS = ["en", "de", "es", "fr", "it"];

export function normalizeLang(lang) {
  if (!lang) return "en";
  const lower = String(lang).toLowerCase();
  return SUPPORTED_LANGS.includes(lower) ? lower : "en";
}

const translations = {
  nav: {
    home: {
      en: "Home",
      de: "Startseite",
      es: "Inicio",
      fr: "Accueil",
      it: "Home"
    },
    journey: {
      en: "Journey",
      de: "Reise",
      es: "Trayectoria",
      fr: "Parcours",
      it: "Percorso"
    },
    salzburg: {
      en: "Salzburg",
      de: "Salzburg",
      es: "Salzburgo",
      fr: "Salzbourg",
      it: "Salisburgo"
    },
    playground: {
      en: "Playground",
      de: "Spielwiese",
      es: "Zona de Juegos",
      fr: "Espace Ludique",
      it: "Area Giochi"
    },
    hospitalityLab: {
      en: "Hospitality Lab",
      de: "Gastfreundschafts-Labor",
      es: "Laboratorio de Hospitalidad",
      fr: "Laboratoire d'Hospitalité",
      it: "Laboratorio Ospitalità"
    },
    info: {
      en: "Info",
      de: "Info",
      es: "Info",
      fr: "Info",
      it: "Info"
    },
    settings: {
      en: "Settings",
      de: "Einstellungen",
      es: "Configuración",
      fr: "Paramètres",
      it: "Impostazioni"
    }
  },

  pageTitles: {
    home: {
      en: "Welcome to Salzburg52",
      de: "Willkommen bei Salzburg52",
      es: "Bienvenido a Salzburg52",
      fr: "Bienvenue sur Salzburg52",
      it: "Benvenuti su Salzburg52"
    },
    journey: {
      en: "My Professional Journey",
      de: "Meine Professionelle Laufbahn",
      es: "Mi Trayectoria Profesional",
      fr: "Mon Parcours Professionnel",
      it: "Il Mio Percorso Professionale"
    },
    salzburg: {
      en: "Discover Salzburg",
      de: "Salzburg Entdecken",
      es: "Descubre Salzburgo",
      fr: "Découvrez Salzbourg",
      it: "Scopri Salisburgo"
    },
    playground: {
      en: "Playground",
      de: "Spielwiese",
      es: "Zona de Juegos",
      fr: "Espace Ludique",
      it: "Area Giochi"
    },
    hospitalityLab: {
      en: "Hospitality Lab",
      de: "Gastfreundschafts-Labor",
      es: "Laboratorio de Hospitalidad",
      fr: "Laboratoire d'Hospitalité",
      it: "Laboratorio Ospitalità"
    },
    info: {
      en: "About Me",
      de: "Über Mich",
      es: "Sobre Mí",
      fr: "À Propos",
      it: "Chi Sono"
    }
  },

  common: {
    welcome: {
      en: "Welcome",
      de: "Willkommen",
      es: "Bienvenido",
      fr: "Bienvenue",
      it: "Benvenuto"
    },
    explore: {
      en: "Explore",
      de: "Erkunden",
      es: "Explorar",
      fr: "Explorer",
      it: "Esplora"
    },
    learnMore: {
      en: "Learn More",
      de: "Mehr Erfahren",
      es: "Saber Más",
      fr: "En Savoir Plus",
      it: "Scopri di Più"
    },
    contact: {
      en: "Contact",
      de: "Kontakt",
      es: "Contacto",
      fr: "Contact",
      it: "Contatto"
    },
    about: {
      en: "About",
      de: "Über",
      es: "Acerca de",
      fr: "À Propos",
      it: "Chi Siamo"
    },
    backToHome: {
      en: "Back to Home",
      de: "Zurück zur Startseite",
      es: "Volver al Inicio",
      fr: "Retour à l'Accueil",
      it: "Torna alla Home"
    },
    readMore: {
      en: "Read More",
      de: "Weiterlesen",
      es: "Leer Más",
      fr: "Lire Plus",
      it: "Leggi di Più"
    },
    gallery: {
      en: "Gallery",
      de: "Galerie",
      es: "Galería",
      fr: "Galerie",
      it: "Galleria"
    },
    allRightsReserved: {
      en: "All rights reserved",
      de: "Alle Rechte vorbehalten",
      es: "Todos los derechos reservados",
      fr: "Tous droits réservés",
      it: "Tutti i diritti riservati"
    }
  },

  journey: {
    myStory: {
      en: "My Story",
      de: "Meine Geschichte",
      es: "Mi Historia",
      fr: "Mon Histoire",
      it: "La Mia Storia"
    },
    subtitle: {
      en: "From early aspirations to becoming part of the HYPERION Hotel Salzburg family — this is my path in luxury hospitality, shaped by dedication, learning, and a passion for creating exceptional guest experiences.",
      de: "Von frühen Ambitionen bis hin zur Mitgliedschaft in der HYPERION Hotel Salzburg Familie — das ist mein Weg in der Luxushotellerie, geprägt von Hingabe, Lernen und der Leidenschaft für außergewöhnliche Gästeerlebnisse.",
      es: "Desde aspiraciones tempranas hasta formar parte de la familia del HYPERION Hotel Salzburgo — este es mi camino en la hospitalidad de lujo, formado por dedicación, aprendizaje y pasión por crear experiencias excepcionales.",
      fr: "Des premières aspirations à l'intégration dans la famille de l'HYPERION Hotel Salzbourg — voici mon parcours dans l'hôtellerie de luxe, façonné par le dévouement, l'apprentissage et la passion de créer des expériences exceptionnelles.",
      it: "Dalle prime aspirazioni all'ingresso nella famiglia dell'HYPERION Hotel Salisburgo — questo è il mio percorso nell'ospitalità di lusso, plasmato da dedizione, apprendimento e passione per creare esperienze eccezionali."
    },
    timeline: {
      en: "Timeline",
      de: "Zeitleiste",
      es: "Cronología",
      fr: "Chronologie",
      it: "Timeline"
    },
    pathSoFar: {
      en: "The Path So Far",
      de: "Der Bisherige Weg",
      es: "El Camino Hasta Ahora",
      fr: "Le Chemin Parcouru",
      it: "Il Percorso Finora"
    },
    continuesTitle: {
      en: "The Journey Continues",
      de: "Die Reise Geht Weiter",
      es: "El Viaje Continúa",
      fr: "Le Voyage Continue",
      it: "Il Viaggio Continua"
    }
  },

  hospitality: {
    professionalInsights: {
      en: "Professional Insights",
      de: "Professionelle Einblicke",
      es: "Perspectivas Profesionales",
      fr: "Aperçus Professionnels",
      it: "Approfondimenti Professionali"
    },
    corePrinciples: {
      en: "Core Principles",
      de: "Grundprinzipien",
      es: "Principios Fundamentales",
      fr: "Principes Fondamentaux",
      it: "Principi Fondamentali"
    },
    foundationsOfExcellence: {
      en: "The Foundations of Excellence",
      de: "Die Grundlagen der Exzellenz",
      es: "Los Fundamentos de la Excelencia",
      fr: "Les Fondements de l'Excellence",
      it: "Le Fondamenta dell'Eccellenza"
    },
    learningNeverStops: {
      en: "The Learning Never Stops",
      de: "Das Lernen Hört Nie Auf",
      es: "El Aprendizaje Nunca Se Detiene",
      fr: "L'Apprentissage Ne S'Arrête Jamais",
      it: "L'Apprendimento Non Si Ferma Mai"
    }
  },

  mediaStrip: {
    atAGlance: {
      en: "At a Glance",
      de: "Auf einen Blick",
      es: "De un Vistazo",
      fr: "En un Coup d'Œil",
      it: "In Breve"
    },
    apprenticeshipHighlights: {
      en: "Apprenticeship Highlights",
      de: "Lehrlings-Highlights",
      es: "Destacados del Aprendizaje",
      fr: "Points Forts de l'Apprentissage",
      it: "Punti Salienti dell'Apprendistato"
    },
    monthsAtHyperion: {
      en: "Months at HYPERION",
      de: "Monate bei HYPERION",
      es: "Meses en HYPERION",
      fr: "Mois chez HYPERION",
      it: "Mesi all'HYPERION"
    },
    languagesSpoken: {
      en: "Languages Spoken",
      de: "Gesprochene Sprachen",
      es: "Idiomas Hablados",
      fr: "Langues Parlées",
      it: "Lingue Parlate"
    },
    guestsWelcomed: {
      en: "Guests Welcomed",
      de: "Gäste Begrüßt",
      es: "Huéspedes Bienvenidos",
      fr: "Clients Accueillis",
      it: "Ospiti Accolti"
    },
    serviceStandard: {
      en: "Service Standard",
      de: "Servicestandard",
      es: "Estándar de Servicio",
      fr: "Standard de Service",
      it: "Standard di Servizio"
    }
  },

  playground: {
    funZone: {
      en: "The Fun Zone",
      de: "Die Spaßzone",
      es: "La Zona Divertida",
      fr: "L'Espace Ludique",
      it: "La Zona Divertimento"
    },
    subtitle: {
      en: "Where work meets play. Test your hospitality instincts, enjoy some laughs, and discover that hotel life is never boring.",
      de: "Wo Arbeit auf Spiel trifft. Testen Sie Ihre Gastfreundschaftsinstinkte, haben Sie Spaß und entdecken Sie, dass das Hotelleben nie langweilig ist.",
      es: "Donde el trabajo se encuentra con la diversión. Pon a prueba tus instintos de hospitalidad, disfruta de algunas risas y descubre que la vida hotelera nunca es aburrida.",
      fr: "Là où le travail rencontre le jeu. Testez vos instincts d'hospitalité, amusez-vous et découvrez que la vie hôtelière n'est jamais ennuyeuse.",
      it: "Dove il lavoro incontra il gioco. Metti alla prova i tuoi istinti di ospitalità, divertiti e scopri che la vita in hotel non è mai noiosa."
    },
    interactiveGame: {
      en: "Interactive Game",
      de: "Interaktives Spiel",
      es: "Juego Interactivo",
      fr: "Jeu Interactif",
      it: "Gioco Interattivo"
    },
    startSimulation: {
      en: "Start Simulation",
      de: "Simulation Starten",
      es: "Iniciar Simulación",
      fr: "Démarrer la Simulation",
      it: "Avvia Simulazione"
    },
    nextScenario: {
      en: "Next Scenario",
      de: "Nächstes Szenario",
      es: "Siguiente Escenario",
      fr: "Scénario Suivant",
      it: "Scenario Successivo"
    },
    backToStart: {
      en: "Back to Start",
      de: "Zurück zum Start",
      es: "Volver al Inicio",
      fr: "Retour au Début",
      it: "Torna all'Inizio"
    }
  },

  footer: {
    craftedWith: {
      en: "Crafted with dedication in Salzburg.",
      de: "Mit Hingabe in Salzburg gestaltet.",
      es: "Elaborado con dedicación en Salzburgo.",
      fr: "Conçu avec dévouement à Salzbourg.",
      it: "Realizzato con dedizione a Salisburgo."
    },
    imprint: {
      en: "Imprint",
      de: "Impressum",
      es: "Aviso legal",
      fr: "Mentions légales",
      it: "Note legali"
    },
    privacy: {
      en: "Privacy Policy",
      de: "Datenschutzerklärung",
      es: "Política de privacidad",
      fr: "Politique de confidentialité",
      it: "Informativa privacy"
    },
    followUs: {
      en: "Follow us on Instagram",
      de: "Folgen Sie uns auf Instagram",
      es: "Síguenos en Instagram",
      fr: "Suivez-nous sur Instagram",
      it: "Seguici su Instagram"
    },
    contactUs: {
      en: "Contact us",
      de: "Kontaktieren Sie uns",
      es: "Contáctanos",
      fr: "Contactez-nous",
      it: "Contattaci"
    }
  },

  snippets: {
    quote: {
      en: "Quote",
      de: "Zitat",
      es: "Cita",
      fr: "Citation",
      it: "Citazione"
    },
    fact: {
      en: "Fun fact",
      de: "Wissenswertes",
      es: "Dato curioso",
      fr: "Le saviez-vous",
      it: "Curiosità"
    },
    joke: {
      en: "Just for fun",
      de: "Nur zum Spaß",
      es: "Solo por diversión",
      fr: "Pour s'amuser",
      it: "Solo per divertimento"
    }
  },

  aboutSection: {
    title: {
      en: "My Professional Journey",
      de: "Meine Professionelle Laufbahn",
      es: "Mi Trayectoria Profesional",
      fr: "Mon Parcours Professionnel",
      it: "Il Mio Percorso Professionale"
    },
    badge: {
      en: "About Me",
      de: "Über Mich",
      es: "Sobre Mí",
      fr: "À Propos",
      it: "Chi Sono"
    },
    description: {
      en: "As an apprentice at HYPERION Hotel Salzburg, I'm developing expertise in professional hospitality while sharing insights into service excellence and local Salzburg knowledge.",
      de: "Als Lehrling im HYPERION Hotel Salzburg entwickle ich Expertise in professioneller Gastfreundschaft und teile Einblicke in Service-Exzellenz und lokale Salzburger Kenntnisse.",
      es: "Como aprendiz en HYPERION Hotel Salzburgo, desarrollo experiencia en hospitalidad profesional mientras comparto perspectivas sobre la excelencia en el servicio y el conocimiento local.",
      fr: "En tant qu'apprenti à l'HYPERION Hotel Salzbourg, je développe une expertise en hospitalité professionnelle tout en partageant des aperçus sur l'excellence du service et la connaissance locale.",
      it: "Come apprendista presso l'HYPERION Hotel Salisburgo, sto sviluppando competenze nell'ospitalità professionale condividendo approfondimenti sull'eccellenza del servizio e la conoscenza locale."
    },
    features: {
      experience: {
        en: "Learn from real experience in luxury hospitality service.",
        de: "Lernen Sie aus praktischen Erfahrungen im Luxus-Gastfreundschaftsservice.",
        es: "Aprende de la experiencia real en el servicio de hospitalidad de lujo.",
        fr: "Apprenez de l'expérience réelle dans le service d'hospitalité de luxe.",
        it: "Impara dall'esperienza reale nel servizio di ospitalità di lusso."
      },
      insights: {
        en: "Discover practical insights on creating memorable guest experiences.",
        de: "Entdecken Sie praktische Einblicke in die Schaffung unvergesslicher Gästeerlebnisse.",
        es: "Descubre perspectivas prácticas sobre cómo crear experiencias memorables.",
        fr: "Découvrez des aperçus pratiques sur la création d'expériences mémorables.",
        it: "Scopri approfondimenti pratici sulla creazione di esperienze indimenticabili."
      },
      explore: {
        en: "Explore Salzburg through the perspective of professional hospitality.",
        de: "Erkunden Sie Salzburg aus der Perspektive professioneller Gastfreundschaft.",
        es: "Explora Salzburgo desde la perspectiva de la hospitalidad profesional.",
        fr: "Explorez Salzbourg à travers le regard de l'hospitalité professionnelle.",
        it: "Esplora Salisburgo attraverso la prospettiva dell'ospitalità professionale."
      }
    }
  },

  galleryLabels: {
    historicStreets: {
      en: "Historic Streets",
      de: "Historische Straßen",
      es: "Calles Históricas",
      fr: "Rues Historiques",
      it: "Vie Storiche"
    },
    alpineViews: {
      en: "Alpine Views",
      de: "Alpenblick",
      es: "Vistas Alpinas",
      fr: "Vues Alpines",
      it: "Panorami Alpini"
    },
    luxuryInterior: {
      en: "Luxury Interior",
      de: "Luxus-Interieur",
      es: "Interior de Lujo",
      fr: "Intérieur de Luxe",
      it: "Interni di Lusso"
    },
    serviceExcellence: {
      en: "Service Excellence",
      de: "Service-Exzellenz",
      es: "Excelencia en el Servicio",
      fr: "Excellence du Service",
      it: "Eccellenza del Servizio"
    }
  },

  gallerySectionTitle: {
    en: "Salzburg & Hospitality",
    de: "Salzburg & Gastfreundschaft",
    es: "Salzburgo y Hospitalidad",
    fr: "Salzbourg et Hospitalité",
    it: "Salisburgo e Ospitalità"
  },

  floatingCardHub: {
    exploreBadge: {
      en: "Explore",
      de: "Erkunden",
      es: "Explorar",
      fr: "Explorer",
      it: "Esplora"
    },
    yourDigitalWorld: {
      en: "Your Digital World",
      de: "Deine digitale Welt",
      es: "Tu Mundo Digital",
      fr: "Votre Monde Numérique",
      it: "Il Tuo Mondo Digitale"
    },
    navigateExperiences: {
      en: "Navigate through immersive experiences",
      de: "Navigieren Sie durch immersive Erlebnisse",
      es: "Navega por experiencias inmersivas",
      fr: "Naviguez à travers des expériences immersives",
      it: "Naviga attraverso esperienze immersive"
    },
    enter: {
      en: "Enter",
      de: "Eintreten",
      es: "Entrar",
      fr: "Entrer",
      it: "Entra"
    },
    zones: {
      journey: {
        title: {
          en: "Journey",
          de: "Reise",
          es: "Trayectoria",
          fr: "Parcours",
          it: "Percorso"
        },
        description: {
          en: "Begin your immersive experience",
          de: "Beginnen Sie Ihr immersives Erlebnis",
          es: "Comienza tu experiencia inmersiva",
          fr: "Commencez votre expérience immersive",
          it: "Inizia la tua esperienza immersiva"
        }
      },
      salzburg: {
        title: {
          en: "Salzburg",
          de: "Salzburg",
          es: "Salzburgo",
          fr: "Salzbourg",
          it: "Salisburgo"
        },
        description: {
          en: "Discover the city",
          de: "Entdecken Sie die Stadt",
          es: "Descubre la ciudad",
          fr: "Découvrez la ville",
          it: "Scopri la città"
        }
      },
      playground: {
        title: {
          en: "Playground",
          de: "Spielwiese",
          es: "Zona de Juegos",
          fr: "Espace Ludique",
          it: "Area Giochi"
        },
        description: {
          en: "Interactive experiences",
          de: "Interaktive Erlebnisse",
          es: "Experiencias interactivas",
          fr: "Expériences interactives",
          it: "Esperienze interattive"
        }
      },
      hospitality: {
        title: {
          en: "Hospitality Lab",
          de: "Gastfreundschafts-Labor",
          es: "Laboratorio de Hospitalidad",
          fr: "Laboratoire d'Hospitalité",
          it: "Laboratorio Ospitalità"
        },
        description: {
          en: "Professional insights",
          de: "Professionelle Einblicke",
          es: "Perspectivas profesionales",
          fr: "Aperçus professionnels",
          it: "Approfondimenti professionali"
        }
      },
      info: {
        title: {
          en: "Info",
          de: "Info",
          es: "Info",
          fr: "Info",
          it: "Info"
        },
        description: {
          en: "Learn more about us",
          de: "Erfahren Sie mehr über uns",
          es: "Aprende más sobre nosotros",
          fr: "En savoir plus sur nous",
          it: "Scopri di più su di noi"
        }
      }
    }
  },

  showcase: {
    label: {
      en: "Experience Excellence",
      de: "Exzellenz erleben",
      es: "Experimenta la Excelencia",
      fr: "Découvrez l'Excellence",
      it: "Vivi l'Eccellenza"
    },
    title: {
      en: "My Journey at HYPERION Hotel Salzburg",
      de: "Meine Reise im HYPERION Hotel Salzburg",
      es: "Mi Viaje en el HYPERION Hotel Salzburg",
      fr: "Mon Parcours à l'Hôtel HYPERION Salzburg",
      it: "Il Mio Percorso all'Hotel HYPERION Salzburg"
    },
    subtitle: {
      en: "Developing professional expertise in hospitality excellence",
      de: "Entwicklung professioneller Kompetenz in der Gastfreundschaft",
      es: "Desarrollando experiencia profesional en excelencia hotelera",
      fr: "Développer une expertise professionnelle dans l'excellence hôtelière",
      it: "Sviluppare competenze professionali nell'eccellenza dell'ospitalità"
    },
    learnMore: {
      en: "Learn More",
      de: "Mehr erfahren",
      es: "Saber más",
      fr: "En savoir plus",
      it: "Scopri di più"
    },
    items: {
      luxurySpaces: {
        title: {
          en: "Luxury Spaces",
          de: "Luxuriöse Räume",
          es: "Espacios de Lujo",
          fr: "Espaces de Luxe",
          it: "Spazi di Lusso"
        },
        description: {
          en: "Learning the art of elegant hospitality at HYPERION Hotel",
          de: "Die Kunst der eleganten Gastfreundschaft im HYPERION Hotel erlernen",
          es: "Aprendiendo el arte de la hospitalidad elegante en el HYPERION Hotel",
          fr: "Apprendre l'art de l'hospitalité élégante à l'Hôtel HYPERION",
          it: "Imparare l'arte dell'ospitalità elegante all'Hotel HYPERION"
        },
        extraInfo: {
          en: "Creating memorable guest experiences in sophisticated environments",
          de: "Unvergessliche Gästeerlebnisse in anspruchsvollen Umgebungen schaffen",
          es: "Creando experiencias memorables para huéspedes en ambientes sofisticados",
          fr: "Créer des expériences mémorables dans des environnements raffinés",
          it: "Creare esperienze memorabili per gli ospiti in ambienti sofisticati"
        }
      },
      salzburgBeauty: {
        title: {
          en: "Salzburg Beauty",
          de: "Salzburgs Schönheit",
          es: "Belleza de Salzburgo",
          fr: "Beauté de Salzbourg",
          it: "Bellezza di Salisburgo"
        },
        description: {
          en: "Sharing the enchanting charm of historic Salzburg with guests",
          de: "Den bezaubernden Charme des historischen Salzburg mit Gästen teilen",
          es: "Compartiendo el encanto fascinante del histórico Salzburgo con los huéspedes",
          fr: "Partager le charme enchanteur de la Salzbourg historique avec les clients",
          it: "Condividere l'affascinante fascino della storica Salisburgo con gli ospiti"
        },
        extraInfo: {
          en: "A city of music, culture, and timeless Alpine elegance",
          de: "Eine Stadt der Musik, Kultur und zeitloser alpiner Eleganz",
          es: "Una ciudad de música, cultura y elegancia alpina atemporal",
          fr: "Une ville de musique, de culture et d'élégance alpine intemporelle",
          it: "Una città di musica, cultura ed eleganza alpina senza tempo"
        }
      },
      professionalExpertise: {
        title: {
          en: "Professional Expertise",
          de: "Fachliche Kompetenz",
          es: "Experiencia Profesional",
          fr: "Expertise Professionnelle",
          it: "Competenza Professionale"
        },
        description: {
          en: "Developing excellence in hospitality service and care",
          de: "Exzellenz in der Gastfreundschaft und Betreuung entwickeln",
          es: "Desarrollando excelencia en servicio y atención hotelera",
          fr: "Développer l'excellence dans le service et l'accueil hôtelier",
          it: "Sviluppare l'eccellenza nel servizio e nella cura dell'ospitalità"
        },
        extraInfo: {
          en: "Attention to detail in every guest interaction",
          de: "Aufmerksamkeit für Details bei jeder Gästeinteraktion",
          es: "Atención al detalle en cada interacción con el huésped",
          fr: "Attention aux détails dans chaque interaction avec les clients",
          it: "Attenzione ai dettagli in ogni interazione con gli ospiti"
        }
      },
      refinedStandards: {
        title: {
          en: "Refined Standards",
          de: "Verfeinerte Standards",
          es: "Estándares Refinados",
          fr: "Standards Raffinés",
          it: "Standard Raffinati"
        },
        description: {
          en: "Understanding premium hospitality through daily practice",
          de: "Premium-Gastfreundschaft durch tägliche Praxis verstehen",
          es: "Comprendiendo la hospitalidad premium a través de la práctica diaria",
          fr: "Comprendre l'hospitalité premium par la pratique quotidienne",
          it: "Comprendere l'ospitalità premium attraverso la pratica quotidiana"
        },
        extraInfo: {
          en: "Elevating service quality through continuous improvement",
          de: "Servicequalität durch kontinuierliche Verbesserung steigern",
          es: "Elevando la calidad del servicio a través de la mejora continua",
          fr: "Élever la qualité du service par l'amélioration continue",
          it: "Elevare la qualità del servizio attraverso il miglioramento continuo"
        }
      }
    }
  }
};

export function t(key, lang = "en") {
  const normalized = normalizeLang(lang);
  const keys = key.split(".");
  
  let value = translations;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  if (value && typeof value === "object" && normalized in value) {
    return value[normalized];
  }
  
  if (value && typeof value === "object" && "en" in value) {
    return value["en"];
  }
  
  return key;
}

export function getNavItems(lang = "en") {
  const normalized = normalizeLang(lang);
  
  return [
    { key: "home", label: t("nav.home", normalized), href: `/${normalized}` },
    { key: "journey", label: t("nav.journey", normalized), href: `/${normalized}/journey` },
    { key: "salzburg", label: t("nav.salzburg", normalized), href: `/${normalized}/salzburg` },
    { key: "playground", label: t("nav.playground", normalized), href: `/${normalized}/playground` },
    { key: "hospitality-lab", label: t("nav.hospitalityLab", normalized), href: `/${normalized}/hospitality-lab` },
    { key: "info", label: t("nav.info", normalized), href: `/${normalized}/info` }
  ];
}

export function getFooterTranslations(lang = "en") {
  const normalized = normalizeLang(lang);
  
  return {
    craftedWith: t("footer.craftedWith", normalized),
    imprint: t("footer.imprint", normalized),
    privacy: t("footer.privacy", normalized),
    followUs: t("footer.followUs", normalized),
    contactUs: t("footer.contactUs", normalized),
    allRightsReserved: t("common.allRightsReserved", normalized)
  };
}

export function getSnippetLabels(lang = "en") {
  const normalized = normalizeLang(lang);
  
  return {
    quote: t("snippets.quote", normalized),
    fact: t("snippets.fact", normalized),
    joke: t("snippets.joke", normalized)
  };
}

export function getGalleryLabels(lang = "en") {
  const normalized = normalizeLang(lang);
  
  return {
    historicStreets: t("galleryLabels.historicStreets", normalized),
    alpineViews: t("galleryLabels.alpineViews", normalized),
    luxuryInterior: t("galleryLabels.luxuryInterior", normalized),
    serviceExcellence: t("galleryLabels.serviceExcellence", normalized),
    sectionTitle: t("gallerySectionTitle", normalized)
  };
}

export function getAboutSection(lang = "en") {
  const normalized = normalizeLang(lang);
  
  return {
    title: t("aboutSection.title", normalized),
    badge: t("aboutSection.badge", normalized),
    description: t("aboutSection.description", normalized),
    features: {
      experience: t("aboutSection.features.experience", normalized),
      insights: t("aboutSection.features.insights", normalized),
      explore: t("aboutSection.features.explore", normalized)
    }
  };
}

export function getMediaStripTranslations(lang = "en") {
  const normalized = normalizeLang(lang);
  
  return {
    atAGlance: t("mediaStrip.atAGlance", normalized),
    apprenticeshipHighlights: t("mediaStrip.apprenticeshipHighlights", normalized),
    monthsAtHyperion: t("mediaStrip.monthsAtHyperion", normalized),
    languagesSpoken: t("mediaStrip.languagesSpoken", normalized),
    guestsWelcomed: t("mediaStrip.guestsWelcomed", normalized),
    serviceStandard: t("mediaStrip.serviceStandard", normalized)
  };
}
