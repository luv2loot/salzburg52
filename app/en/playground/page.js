"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "en";

const scenarios = [
  {
    id: 1,
    situation: "Guest insists their reservation is for a room with mountain view, but you only have city view available.",
    options: [
      { text: "Apologize and offer a complimentary drink", outcome: "Guest calms down, enjoys their aperol spritz, and later posts a lovely review mentioning 'exceptional service recovery'. +50 hospitality points!" },
      { text: "Check if any mountain view rooms become available", outcome: "You call housekeeping every 10 minutes for 3 hours. A mountain room opens up! Guest is thrilled. Your phone arm is now permanently crooked. Worth it!" },
      { text: "Creatively describe the city view as 'urban mountain aesthetics'", outcome: "Guest squints at the parking lot, then at you, then back at the parking lot. 'I... guess those buildings do have peaks?' You've invented a new hospitality philosophy." }
    ]
  },
  {
    id: 2,
    situation: "A celebrity wants to check in anonymously but their entourage is causing a scene in the lobby.",
    options: [
      { text: "Discretely escort everyone to a private area", outcome: "Crisis averted! Celebrity sends you a signed headshot. It's a photo of you looking stressed. They thought it was artistic." },
      { text: "Pretend not to recognize them at all", outcome: "You maintain perfect poker face while their bodyguard moves a velvet rope. 'Standard check-in procedure,' you say. Celebrity is impressed by your professionalism. Their publicist is confused why no one is taking photos." },
      { text: "Loudly announce 'Just another regular guest!'", outcome: "Everyone turns to look. A tourist recognizes them. Chaos ensues. The celebrity respects your chaotic energy and invites you to their after-party. You have a great time!" }
    ]
  },
  {
    id: 3,
    situation: "Guest asks if they can bring their emotional support peacock to their room.",
    options: [
      { text: "Calmly explain pet policies while maintaining composure", outcome: "Guest understands. Peacock does not. It spreads its feathers in disapproval. You've never felt more judged by a bird." },
      { text: "Suggest the hotel garden as an alternative", outcome: "The peacock now lives in the garden permanently. Guests love it. You've accidentally improved the hotel's TripAdvisor rating. Management is confused but pleased." },
      { text: "Ask to see the peacock's documentation", outcome: "The peacock has better travel documents than most guests. Multiple stamps from European countries. You're slightly intimidated." }
    ]
  },
  {
    id: 4,
    situation: "A guest calls at 3 AM asking where they can find 'the best authentic local food' nearby.",
    options: [
      { text: "Recommend the 24-hour kebab place down the street", outcome: "Guest returns at 4 AM raving about the döner. They tip you with leftover falafel. It's actually delicious. Best shift snack ever." },
      { text: "Explain that most restaurants are closed", outcome: "Guest sighs dramatically. You offer to check the minibar options. They discover a surprising passion for overpriced Toblerone." },
      { text: "Share your personal late-night snack stash location", outcome: "Your secret vending machine spot is now compromised. Worth it for the 5-star review mentioning 'insider knowledge'. The night auditor is suspicious." }
    ]
  },
  {
    id: 5,
    situation: "Guest's child has pressed every single button in the elevator. It's now stopping at all 12 floors.",
    options: [
      { text: "Wait patiently with a zen-like smile", outcome: "Other guests admire your composure. Child's parent apologizes profusely. You've achieved hospitality enlightenment on floor 7." },
      { text: "Turn it into a 'hotel tour' for the child", outcome: "By floor 9, you've explained housekeeping, room service, and how keys work. Child wants to be a hotel manager when they grow up. Career influenced!" },
      { text: "Challenge the child to guess what's on each floor", outcome: "Game is a hit. Child correctly guesses 'more hallways' for every floor. They're technically right. Everyone wins." }
    ]
  },
  {
    id: 6,
    situation: "A guest insists they left a 'very important item' in their room but can't remember what it is.",
    options: [
      { text: "Organize a thorough search of the room", outcome: "You find three phone chargers, a sock, and a motivational book. Guest suddenly remembers: it was their reading glasses. They were on their head the whole time." },
      { text: "Ask thoughtful questions to jog their memory", outcome: "After 20 questions, you've established it's not jewelry, not electronics, and possibly purple. It was a purple stress ball. The irony is not lost on anyone." },
      { text: "Suggest they check their pockets first", outcome: "Guest finds their car keys, a receipt from 2019, and lint. The 'important item' was indeed in pocket #4. You're now a professional pocket archaeologist." }
    ]
  }
];

const funQuotes = [
  { text: "The only thing we have to fear is a guest with a 6 AM flight and a noon checkout mentality.", author: "Ancient Hotel Proverb" },
  { text: "Behind every calm receptionist is a mental spreadsheet of chaos.", author: "The Lobby Philosopher" },
  { text: "Hospitality is the art of making people feel at home when you wish they actually were.", author: "Unknown Night Auditor" },
  { text: "The customer is always right, but the front desk knows where the extra towels are.", author: "Wisdom of the Key Cards" },
  { text: "A hotel is just a building until someone smiles at the entrance.", author: "Someone Who Needed Coffee" },
  { text: "Check-out time is a suggestion. Check-in time is law.", author: "The Concierge's Handbook" },
  { text: "Life is short. Stay somewhere with good pillows.", author: "Travel Wisdom Vol. 3" }
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
            🎪 The Fun Zone
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Playground
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Where work meets play. Test your hospitality instincts, enjoy some laughs, 
            and discover that hotel life is never boring.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {["🎮 Interactive", "😄 Fun", "🏨 Hotel Vibes"].map((tag, i) => (
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
            🎲 Interactive Game
          </motion.span>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>Check-in Chaos Simulator</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
            Test your hospitality instincts! How would you handle these real(ish) hotel scenarios?
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
                Start Simulation
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
                  Next Scenario →
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
                  Back to Start
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
          💬 Hospitality Wisdom
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
    { emoji: "☕", value: "∞", label: "Coffees consumed" },
    { emoji: "😊", value: "100%", label: "Smile maintained" },
    { emoji: "🎯", value: "0", label: "Guests lost in hallways" },
    { emoji: "🌟", value: "5★", label: "Self-awarded rating" }
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
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.03))"
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
            <div style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
              {stat.label}
            </div>
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
