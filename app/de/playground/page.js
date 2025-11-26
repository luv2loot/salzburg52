"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "de";

const scenarios = [
  {
    id: 1,
    situation: "Ein Gast besteht darauf, dass seine Reservierung für ein Zimmer mit Bergblick ist, aber Sie haben nur Stadtblick verfügbar.",
    options: [
      { text: "Entschuldigen Sie sich und bieten Sie ein Gratisgetränk an", outcome: "Der Gast beruhigt sich, genießt seinen Aperol Spritz und postet später eine tolle Bewertung mit Erwähnung von 'außergewöhnlichem Service'. +50 Gastfreundschaftspunkte!" },
      { text: "Prüfen Sie, ob ein Zimmer mit Bergblick frei wird", outcome: "Sie rufen alle 10 Minuten bei der Hauswirtschaft an, 3 Stunden lang. Ein Bergblick-Zimmer wird frei! Der Gast ist begeistert. Ihr Telefonarm ist jetzt dauerhaft gekrümmt. Es war es wert!" },
      { text: "Beschreiben Sie den Stadtblick kreativ als 'urbane Bergästhetik'", outcome: "Der Gast schaut auf den Parkplatz, dann auf Sie, dann wieder auf den Parkplatz. 'Ich... nehme an, diese Gebäude haben auch Spitzen?' Sie haben eine neue Gastfreundschaftsphilosophie erfunden." }
    ]
  },
  {
    id: 2,
    situation: "Ein Prominenter möchte anonym einchecken, aber sein Gefolge verursacht eine Szene in der Lobby.",
    options: [
      { text: "Begleiten Sie alle diskret in einen privaten Bereich", outcome: "Krise abgewendet! Der Prominente schickt Ihnen ein signiertes Foto. Es ist ein Foto von Ihnen, wie Sie gestresst aussehen. Sie fanden es künstlerisch." },
      { text: "Tun Sie so, als würden Sie sie überhaupt nicht erkennen", outcome: "Sie bewahren ein perfektes Pokerface, während ihr Bodyguard eine Samtkordel bewegt. 'Standard-Check-in-Verfahren', sagen Sie. Der Prominente ist von Ihrer Professionalität beeindruckt." },
      { text: "Rufen Sie laut 'Nur ein weiterer normaler Gast!'", outcome: "Alle drehen sich um. Ein Tourist erkennt sie. Chaos bricht aus. Der Prominente respektiert Ihre chaotische Energie und lädt Sie zu seiner Afterparty ein. Sie haben viel Spaß!" }
    ]
  },
  {
    id: 3,
    situation: "Ein Gast fragt, ob er seinen emotionalen Unterstützungspfau mit aufs Zimmer nehmen kann.",
    options: [
      { text: "Erklären Sie ruhig die Haustierrichtlinien", outcome: "Der Gast versteht. Der Pfau nicht. Er spreizt seine Federn missbilligend. Sie haben sich noch nie von einem Vogel so beurteilt gefühlt." },
      { text: "Schlagen Sie den Hotelgarten als Alternative vor", outcome: "Der Pfau lebt jetzt dauerhaft im Garten. Die Gäste lieben ihn. Sie haben versehentlich die TripAdvisor-Bewertung des Hotels verbessert. Das Management ist verwirrt, aber zufrieden." },
      { text: "Bitten Sie um die Dokumente des Pfaus", outcome: "Der Pfau hat bessere Reisedokumente als die meisten Gäste. Mehrere Stempel aus europäischen Ländern. Sie sind leicht eingeschüchtert." }
    ]
  },
  {
    id: 4,
    situation: "Ein Gast ruft um 3 Uhr morgens an und fragt, wo er in der Nähe 'das beste authentische lokale Essen' finden kann.",
    options: [
      { text: "Empfehlen Sie den 24-Stunden-Kebab-Laden um die Ecke", outcome: "Der Gast kehrt um 4 Uhr morgens zurück und schwärmt vom Döner. Er gibt Ihnen übriges Falafel als Trinkgeld. Es ist tatsächlich köstlich. Bester Schicht-Snack aller Zeiten." },
      { text: "Erklären Sie, dass die meisten Restaurants geschlossen sind", outcome: "Der Gast seufzt dramatisch. Sie bieten an, die Minibar-Optionen zu prüfen. Er entdeckt eine überraschende Leidenschaft für überteuerte Toblerone." },
      { text: "Teilen Sie Ihren persönlichen Geheimplatz für Nachtsnacks", outcome: "Ihr geheimer Automatenplatz ist jetzt kompromittiert. Es war die 5-Sterne-Bewertung wert, die 'Insiderwissen' erwähnte. Der Nachtauditor ist misstrauisch." }
    ]
  },
  {
    id: 5,
    situation: "Das Kind eines Gastes hat jeden einzelnen Knopf im Aufzug gedrückt. Er hält jetzt auf allen 12 Etagen.",
    options: [
      { text: "Warten Sie geduldig mit einem zen-ähnlichen Lächeln", outcome: "Andere Gäste bewundern Ihre Gelassenheit. Der Elternteil des Kindes entschuldigt sich überschwänglich. Sie haben auf Etage 7 die Erleuchtung der Gastfreundschaft erreicht." },
      { text: "Machen Sie daraus eine 'Hotelführung' für das Kind", outcome: "Bis Etage 9 haben Sie die Hauswirtschaft, den Zimmerservice und die Funktionsweise der Schlüssel erklärt. Das Kind will Hotelmanager werden. Karriere beeinflusst!" },
      { text: "Fordern Sie das Kind heraus, zu erraten, was auf jeder Etage ist", outcome: "Das Spiel ist ein Hit. Das Kind errät richtig 'mehr Flure' für jede Etage. Technisch gesehen haben sie recht. Alle gewinnen." }
    ]
  },
  {
    id: 6,
    situation: "Ein Gast besteht darauf, dass er einen 'sehr wichtigen Gegenstand' in seinem Zimmer vergessen hat, kann sich aber nicht erinnern, was es ist.",
    options: [
      { text: "Organisieren Sie eine gründliche Durchsuchung des Zimmers", outcome: "Sie finden drei Handyladegeräte, eine Socke und ein Motivationsbuch. Der Gast erinnert sich plötzlich: Es war seine Lesebrille. Sie war die ganze Zeit auf seinem Kopf." },
      { text: "Stellen Sie durchdachte Fragen, um sein Gedächtnis anzuregen", outcome: "Nach 20 Fragen haben Sie festgestellt, dass es kein Schmuck ist, keine Elektronik und möglicherweise lila. Es war ein lila Stressball. Die Ironie entgeht niemandem." },
      { text: "Schlagen Sie vor, dass er zuerst seine Taschen überprüft", outcome: "Der Gast findet seine Autoschlüssel, eine Quittung von 2019 und Fusseln. Der 'wichtige Gegenstand' war tatsächlich in Tasche Nr. 4. Sie sind jetzt professioneller Taschenarchäologe." }
    ]
  }
];

const funQuotes = [
  { text: "Das Einzige, was wir fürchten müssen, ist ein Gast mit 6-Uhr-Flug und Mittags-Checkout-Mentalität.", author: "Altes Hotel-Sprichwort" },
  { text: "Hinter jedem ruhigen Rezeptionisten steckt eine mentale Tabelle des Chaos.", author: "Der Lobby-Philosoph" },
  { text: "Gastfreundschaft ist die Kunst, Menschen sich zu Hause fühlen zu lassen, wenn man sich wünscht, sie wären es.", author: "Unbekannter Nachtauditor" },
  { text: "Der Kunde hat immer recht, aber die Rezeption weiß, wo die extra Handtücher sind.", author: "Weisheit der Zimmerkarten" },
  { text: "Ein Hotel ist nur ein Gebäude, bis jemand am Eingang lächelt.", author: "Jemand, der Kaffee brauchte" },
  { text: "Checkout-Zeit ist ein Vorschlag. Check-in-Zeit ist Gesetz.", author: "Das Concierge-Handbuch" },
  { text: "Das Leben ist kurz. Übernachte irgendwo mit guten Kissen.", author: "Reiseweisheit Bd. 3" }
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
            🎪 Die Spaßzone
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Spielwiese
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Wo Arbeit auf Spiel trifft. Testen Sie Ihre Gastfreundschaftsinstinkte, haben Sie Spaß 
            und entdecken Sie, dass das Hotelleben nie langweilig ist.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {["🎮 Interaktiv", "😄 Spaß", "🏨 Hotel-Vibes"].map((tag, i) => (
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
            🎲 Interaktives Spiel
          </motion.span>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>Check-in Chaos Simulator</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
            Testen Sie Ihre Gastfreundschaftsinstinkte! Wie würden Sie diese (fast) echten Hotelszenarien meistern?
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
                Simulation Starten
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
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(236, 72, 153, 0.2)"
                }}
                className="theme-dark"
                data-theme-style={{
                  background: "rgba(15, 23, 42, 0.5)"
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📞</div>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 500 }}>
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
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.15))",
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
                    {option.text}
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
                  Nächstes Szenario →
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
                  Zurück zum Start
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
          💬 Gastfreundschafts-Weisheit
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
    { emoji: "☕", value: "∞", label: "Kaffees getrunken" },
    { emoji: "😊", value: "100%", label: "Lächeln beibehalten" },
    { emoji: "🎯", value: "0", label: "Gäste in Fluren verloren" },
    { emoji: "🌟", value: "5★", label: "Selbst vergebene Bewertung" }
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
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(236, 72, 153, 0.03))"
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--primary)" }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>{stat.label}</div>
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
