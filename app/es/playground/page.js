"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "es";

const scenarios = [
  {
    id: 1,
    situation: "El huésped insiste en que su reserva es para una habitación con vista a la montaña, pero solo tienes disponible una con vista a la ciudad.",
    options: [
      { text: "Disculparte y ofrecer una bebida de cortesía", outcome: "El huésped se calma, disfruta su aperol spritz, y luego publica una encantadora reseña mencionando 'recuperación excepcional del servicio'. ¡+50 puntos de hospitalidad!" },
      { text: "Verificar si alguna habitación con vista a la montaña queda disponible", outcome: "Llamas a limpieza cada 10 minutos durante 3 horas. ¡Se libera una habitación con vista a la montaña! El huésped está encantado. Tu brazo del teléfono ahora está permanentemente torcido. ¡Valió la pena!" },
      { text: "Describir creativamente la vista de la ciudad como 'estética de montaña urbana'", outcome: "El huésped mira el estacionamiento, luego a ti, luego de vuelta al estacionamiento. '¿Supongo que esos edificios tienen picos?' Has inventado una nueva filosofía de hospitalidad." }
    ]
  },
  {
    id: 2,
    situation: "Una celebridad quiere registrarse de forma anónima pero su séquito está causando una escena en el vestíbulo.",
    options: [
      { text: "Escoltar discretamente a todos a un área privada", outcome: "¡Crisis evitada! La celebridad te envía una foto autografiada. Es una foto tuya luciendo estresado. Pensaron que era artístico." },
      { text: "Fingir que no los reconoces en absoluto", outcome: "Mantienes una cara de póker perfecta mientras su guardaespaldas mueve una cuerda de terciopelo. 'Procedimiento de registro estándar', dices. La celebridad está impresionada por tu profesionalismo." },
      { text: "Anunciar en voz alta '¡Solo otro huésped regular!'", outcome: "Todos voltean a mirar. Un turista los reconoce. Sobreviene el caos. La celebridad respeta tu energía caótica y te invita a su after-party. ¡La pasas genial!" }
    ]
  },
  {
    id: 3,
    situation: "El huésped pregunta si puede traer su pavo real de apoyo emocional a su habitación.",
    options: [
      { text: "Explicar calmadamente las políticas de mascotas manteniendo la compostura", outcome: "El huésped entiende. El pavo real no. Despliega sus plumas en desaprobación. Nunca te habías sentido más juzgado por un ave." },
      { text: "Sugerir el jardín del hotel como alternativa", outcome: "El pavo real ahora vive en el jardín permanentemente. A los huéspedes les encanta. Accidentalmente mejoraste la calificación de TripAdvisor. La gerencia está confundida pero complacida." },
      { text: "Pedir ver la documentación del pavo real", outcome: "El pavo real tiene mejores documentos de viaje que la mayoría de los huéspedes. Múltiples sellos de países europeos. Estás ligeramente intimidado." }
    ]
  },
  {
    id: 4,
    situation: "Un huésped llama a las 3 AM preguntando dónde puede encontrar 'la mejor comida local auténtica' cerca.",
    options: [
      { text: "Recomendar el lugar de kebab 24 horas calle abajo", outcome: "El huésped regresa a las 4 AM alabando el döner. Te dan propina con falafel sobrante. Está realmente delicioso. El mejor snack de turno de la historia." },
      { text: "Explicar que la mayoría de restaurantes están cerrados", outcome: "El huésped suspira dramáticamente. Ofreces revisar las opciones del minibar. Descubren una pasión sorprendente por el Toblerone sobrepreciado." },
      { text: "Compartir la ubicación de tu escondite personal de snacks nocturnos", outcome: "Tu lugar secreto de la máquina expendedora ahora está comprometido. Vale la pena por la reseña de 5 estrellas mencionando 'conocimiento interno'. El auditor nocturno sospecha." }
    ]
  },
  {
    id: 5,
    situation: "El hijo del huésped ha presionado todos los botones del ascensor. Ahora para en los 12 pisos.",
    options: [
      { text: "Esperar pacientemente con una sonrisa zen", outcome: "Otros huéspedes admiran tu compostura. El padre del niño se disculpa profusamente. Has alcanzado la iluminación de la hospitalidad en el piso 7." },
      { text: "Convertirlo en un 'tour del hotel' para el niño", outcome: "Para el piso 9, has explicado limpieza, servicio a la habitación y cómo funcionan las llaves. El niño quiere ser gerente de hotel cuando crezca. ¡Carrera influenciada!" },
      { text: "Retar al niño a adivinar qué hay en cada piso", outcome: "El juego es un éxito. El niño adivina correctamente 'más pasillos' para cada piso. Técnicamente tiene razón. Todos ganan." }
    ]
  },
  {
    id: 6,
    situation: "Un huésped insiste en que dejó un 'artículo muy importante' en su habitación pero no puede recordar qué es.",
    options: [
      { text: "Organizar una búsqueda exhaustiva de la habitación", outcome: "Encuentras tres cargadores de teléfono, un calcetín y un libro motivacional. El huésped de repente recuerda: eran sus lentes de lectura. Estaban en su cabeza todo el tiempo." },
      { text: "Hacer preguntas reflexivas para refrescar su memoria", outcome: "Después de 20 preguntas, has establecido que no son joyas, no es electrónico, y posiblemente púrpura. Era una pelota antiestrés púrpura. La ironía no pasa desapercibida." },
      { text: "Sugerir que revisen sus bolsillos primero", outcome: "El huésped encuentra sus llaves del carro, un recibo de 2019, y pelusa. El 'artículo importante' estaba en el bolsillo #4. Ahora eres un arqueólogo profesional de bolsillos." }
    ]
  }
];

const funQuotes = [
  { text: "Lo único que debemos temer es a un huésped con vuelo a las 6 AM y mentalidad de check-out al mediodía.", author: "Antiguo Proverbio Hotelero" },
  { text: "Detrás de cada recepcionista calmado hay una hoja de cálculo mental del caos.", author: "El Filósofo del Vestíbulo" },
  { text: "La hospitalidad es el arte de hacer que la gente se sienta en casa cuando desearías que realmente lo estuvieran.", author: "Auditor Nocturno Desconocido" },
  { text: "El cliente siempre tiene la razón, pero la recepción sabe dónde están las toallas extra.", author: "Sabiduría de las Tarjetas Llave" },
  { text: "Un hotel es solo un edificio hasta que alguien sonríe en la entrada.", author: "Alguien Que Necesitaba Café" },
  { text: "La hora de check-out es una sugerencia. La hora de check-in es ley.", author: "El Manual del Concierge" },
  { text: "La vida es corta. Quédate en algún lugar con buenas almohadas.", author: "Sabiduría de Viajes Vol. 3" }
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
            🎪 La Zona Divertida
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Zona de Juegos
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Donde el trabajo se encuentra con la diversión. Pon a prueba tus instintos de hospitalidad, disfruta algunas risas, 
            y descubre que la vida hotelera nunca es aburrida.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {["🎮 Interactivo", "😄 Divertido", "🏨 Ambiente Hotelero"].map((tag, i) => (
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
            🎲 Juego Interactivo
          </motion.span>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>Simulador de Caos en el Check-in</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
            ¡Pon a prueba tus instintos de hospitalidad! ¿Cómo manejarías estos escenarios hoteleros (casi) reales?
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
                Iniciar Simulación
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
                  Siguiente Escenario →
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
                  Volver al Inicio
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
          💬 Sabiduría de la Hospitalidad
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
    { emoji: "☕", value: "∞", label: "Cafés consumidos" },
    { emoji: "😊", value: "100%", label: "Sonrisa mantenida" },
    { emoji: "🎯", value: "0", label: "Huéspedes perdidos en pasillos" },
    { emoji: "🌟", value: "5★", label: "Calificación auto-otorgada" }
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
