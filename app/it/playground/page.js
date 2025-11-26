"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "it";

const scenarios = [
  {
    id: 1,
    situation: "L'ospite insiste che la sua prenotazione è per una camera con vista sulla montagna, ma hai disponibile solo la vista sulla città.",
    options: [
      { text: "Scusarti e offrire un drink in omaggio", outcome: "L'ospite si calma, gusta il suo aperol spritz, e poi pubblica una bella recensione menzionando 'eccezionale recupero del servizio'. +50 punti ospitalità!" },
      { text: "Verificare se una camera con vista sulla montagna diventa disponibile", outcome: "Chiami le pulizie ogni 10 minuti per 3 ore. Si libera una camera con vista sulla montagna! L'ospite è entusiasta. Il tuo braccio del telefono è ora permanentemente storto. Ne è valsa la pena!" },
      { text: "Descrivere creativamente la vista sulla città come 'estetica di montagna urbana'", outcome: "L'ospite guarda il parcheggio, poi te, poi di nuovo il parcheggio. 'Suppongo che quegli edifici abbiano delle cime?' Hai inventato una nuova filosofia dell'ospitalità." }
    ]
  },
  {
    id: 2,
    situation: "Una celebrità vuole fare il check-in in forma anonima ma il suo entourage sta causando una scena nella hall.",
    options: [
      { text: "Scortare discretamente tutti in un'area privata", outcome: "Crisi evitata! La celebrità ti manda una foto autografata. È una foto di te che sembri stressato. L'hanno trovata artistica." },
      { text: "Fingere di non riconoscerli affatto", outcome: "Mantieni una faccia da poker perfetta mentre la loro guardia del corpo sposta una corda di velluto. 'Procedura di check-in standard', dici. La celebrità è impressionata dalla tua professionalità." },
      { text: "Annunciare ad alta voce 'Solo un altro ospite normale!'", outcome: "Tutti si girano a guardare. Un turista li riconosce. Segue il caos. La celebrità rispetta la tua energia caotica e ti invita al suo after-party. Ti diverti un sacco!" }
    ]
  },
  {
    id: 3,
    situation: "L'ospite chiede se può portare il suo pavone di supporto emotivo nella sua camera.",
    options: [
      { text: "Spiegare con calma le politiche sugli animali mantenendo la calma", outcome: "L'ospite capisce. Il pavone no. Apre le sue piume in segno di disapprovazione. Non ti sei mai sentito così giudicato da un uccello." },
      { text: "Suggerire il giardino dell'hotel come alternativa", outcome: "Il pavone ora vive nel giardino in modo permanente. Agli ospiti piace. Hai accidentalmente migliorato la valutazione TripAdvisor. La direzione è confusa ma soddisfatta." },
      { text: "Chiedere di vedere la documentazione del pavone", outcome: "Il pavone ha documenti di viaggio migliori della maggior parte degli ospiti. Molteplici timbri da paesi europei. Sei leggermente intimidito." }
    ]
  },
  {
    id: 4,
    situation: "Un ospite chiama alle 3 di notte chiedendo dove può trovare 'il miglior cibo locale autentico' nelle vicinanze.",
    options: [
      { text: "Consigliare il kebab 24 ore lungo la strada", outcome: "L'ospite torna alle 4 del mattino entusiasta del döner. Ti lascia la mancia con falafel avanzato. È davvero delizioso. Il miglior spuntino del turno di sempre." },
      { text: "Spiegare che la maggior parte dei ristoranti sono chiusi", outcome: "L'ospite sospira drammaticamente. Offri di controllare le opzioni del minibar. Scoprono una passione sorprendente per il Toblerone troppo caro." },
      { text: "Condividere la posizione della tua scorta personale di snack notturni", outcome: "Il tuo posto segreto del distributore automatico è ora compromesso. Ne vale la pena per la recensione a 5 stelle che menziona 'conoscenza privilegiata'. L'auditor notturno sospetta." }
    ]
  },
  {
    id: 5,
    situation: "Il figlio dell'ospite ha premuto tutti i pulsanti dell'ascensore. Ora si ferma a tutti i 12 piani.",
    options: [
      { text: "Aspettare pazientemente con un sorriso zen", outcome: "Gli altri ospiti ammirano la tua compostezza. Il genitore del bambino si scusa profusamente. Hai raggiunto l'illuminazione dell'ospitalità al 7° piano." },
      { text: "Trasformarlo in un 'tour dell'hotel' per il bambino", outcome: "Al 9° piano, hai spiegato le pulizie, il room service e come funzionano le chiavi. Il bambino vuole diventare direttore d'hotel da grande. Carriera influenzata!" },
      { text: "Sfidare il bambino a indovinare cosa c'è ad ogni piano", outcome: "Il gioco è un successo. Il bambino indovina correttamente 'altri corridoi' per ogni piano. Tecnicamente ha ragione. Vincono tutti." }
    ]
  },
  {
    id: 6,
    situation: "Un ospite insiste di aver lasciato un 'oggetto molto importante' nella sua camera ma non riesce a ricordare cosa sia.",
    options: [
      { text: "Organizzare una ricerca approfondita della camera", outcome: "Trovi tre caricatori per telefono, un calzino e un libro motivazionale. L'ospite improvvisamente ricorda: erano i suoi occhiali da lettura. Erano sulla sua testa tutto il tempo." },
      { text: "Fare domande ponderate per rinfrescare la memoria", outcome: "Dopo 20 domande, hai stabilito che non sono gioielli, non è elettronica, e possibilmente viola. Era una pallina antistress viola. L'ironia non sfugge a nessuno." },
      { text: "Suggerire di controllare prima le tasche", outcome: "L'ospite trova le chiavi della macchina, una ricevuta del 2019 e pelucchi. L''oggetto importante' era davvero nella tasca n°4. Ora sei un archeologo professionista delle tasche." }
    ]
  }
];

const funQuotes = [
  { text: "L'unica cosa che dobbiamo temere è un ospite con un volo alle 6 del mattino e una mentalità di check-out a mezzogiorno.", author: "Antico Proverbio Alberghiero" },
  { text: "Dietro ogni receptionist calmo c'è un foglio di calcolo mentale del caos.", author: "Il Filosofo della Hall" },
  { text: "L'ospitalità è l'arte di far sentire le persone a casa quando vorresti che lo fossero davvero.", author: "Auditor Notturno Sconosciuto" },
  { text: "Il cliente ha sempre ragione, ma la reception sa dove sono gli asciugamani extra.", author: "Saggezza delle Tessere Chiave" },
  { text: "Un hotel è solo un edificio finché qualcuno sorride all'ingresso.", author: "Qualcuno Che Aveva Bisogno di Caffè" },
  { text: "L'orario di check-out è un suggerimento. L'orario di check-in è legge.", author: "Il Manuale del Concierge" },
  { text: "La vita è breve. Soggiorna in un posto con buoni cuscini.", author: "Saggezza di Viaggio Vol. 3" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function InteractiveBackground() {
  const bgRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="playground-interactive-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(236, 72, 153, 0.15) 0%, transparent 40%),
          radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(37, 99, 235, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
          var(--color-bg)
        `,
        transition: "background 0.3s ease-out"
      }}
    />
  );
}

function PlaygroundHero() {
  return (
    <section className="app-shell hero-root">
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(37, 99, 235, 0.08) 100%)",
          border: "1px solid rgba(236, 72, 153, 0.2)"
        }}
      >
        <div className="hero-gradient-bg" style={{ opacity: 0.5 }} />

        <motion.div
          className="hero-orb hero-orb-1"
          animate={{ y: [0, -25, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)" }}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          animate={{ y: [0, 30, 0], x: [0, -25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)" }}
        />

        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.span
            variants={itemVariants}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.15))",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#EC4899",
              marginBottom: "1rem"
            }}
          >
            🎪 La Zona Divertimento
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Area Giochi
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Dove il lavoro incontra il gioco. Metti alla prova i tuoi istinti di ospitalità, divertiti, 
            e scopri che la vita in hotel non è mai noiosa.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {["🎮 Interattivo", "😄 Divertente", "🏨 Atmosfera Hotel"].map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255, 255, 255, 0.15)"
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ChaosSimulator() {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);

  const startNewScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setCurrentScenario(scenarios[randomIndex]);
    setSelectedOption(null);
    setShowOutcome(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOutcome(true);
  };

  return (
    <motion.section
      className="app-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
    >
      <div className="surface" style={{ padding: "2.5rem", background: "linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.03))" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <motion.span
            style={{
              display: "inline-block",
              padding: "0.4rem 1rem",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.1))",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#EC4899",
              marginBottom: "1rem"
            }}
          >
            🎲 Gioco Interattivo
          </motion.span>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>Simulatore di Caos al Check-in</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
            Metti alla prova i tuoi istinti di ospitalità! Come gestiresti questi scenari alberghieri (quasi) reali?
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!currentScenario ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ textAlign: "center", padding: "3rem 1rem" }}
            >
              <motion.div
                style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎰
              </motion.div>
              <motion.button
                onClick={startNewScenario}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)"
                }}
              >
                Avvia Simulazione
              </motion.button>
            </motion.div>
          ) : !showOutcome ? (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <motion.div
                style={{
                  background: "var(--color-bg-elevated)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(236, 72, 153, 0.2)"
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📞</div>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 500, color: "var(--color-text)" }}>
                  {currentScenario.situation}
                </p>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {currentScenario.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "1rem 1.25rem",
                      background: "var(--color-bg-elevated)",
                      color: "var(--color-text)",
                      border: "1px solid var(--color-border-subtle)",
                      borderRadius: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}
                  >
                    <span style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.25))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#EC4899",
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span style={{ color: "var(--color-text)" }}>{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(37, 99, 235, 0.08))",
                  borderRadius: "16px",
                  padding: "2rem",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  textAlign: "center"
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎉</div>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text)" }}>
                  {selectedOption.outcome}
                </p>
              </motion.div>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  onClick={startNewScenario}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Scenario Successivo →
                </motion.button>
                <motion.button
                  onClick={() => setCurrentScenario(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "var(--color-bg-elevated)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "999px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  Torna all'Inizio
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % funQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="app-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
      style={{ marginTop: "2rem" }}
    >
      <div className="surface" style={{ padding: "2.5rem", textAlign: "center" }}>
        <motion.span
          style={{
            display: "inline-block",
            padding: "0.4rem 1rem",
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08))",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: "1.5rem"
          }}
        >
          💬 Saggezza dell'Ospitalità
        </motion.span>

        <div style={{ minHeight: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p style={{
                fontSize: "1.3rem",
                fontStyle: "italic",
                lineHeight: 1.6,
                maxWidth: "600px",
                margin: "0 auto 1rem"
              }}>
                "{funQuotes[currentIndex].text}"
              </p>
              <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
                — {funQuotes[currentIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {funQuotes.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: index === currentIndex
                  ? "linear-gradient(135deg, #EC4899, #8B5CF6)"
                  : "var(--color-border-subtle)"
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FunStats() {
  const stats = [
    { emoji: "☕", value: "∞", label: "Caffè consumati" },
    { emoji: "😊", value: "100%", label: "Sorriso mantenuto" },
    { emoji: "🎯", value: "0", label: "Ospiti persi nei corridoi" },
    { emoji: "🌟", value: "5★", label: "Valutazione auto-assegnata" }
  ];

  return (
    <motion.section
      className="app-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem"
      }}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="surface"
            style={{
              padding: "1.5rem 1rem",
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.02))"
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <InteractiveBackground />
      <Header lang={LANG} />
      <main>
        <PlaygroundHero />
        <ChaosSimulator />
        <QuoteCarousel />
        <FunStats />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
