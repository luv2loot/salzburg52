"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "es";

const principles = [
  {
    id: 1,
    title: "El Arte de las Primeras Impresiones",
    description: "Los primeros 30 segundos de cualquier interacción establecen el tono para todo lo que sigue. Una sonrisa genuina, contacto visual y atención plena comunican más que cualquier saludo ensayado. La excelencia no se trata de perfección — se trata de presencia.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Hacer que los Huéspedes se Sientan Vistos",
    description: "Cada huésped lleva su propia historia, sus propias razones para estar aquí. Los mejores profesionales de la hospitalidad aprenden a leer entre líneas — notando los pequeños detalles que revelan lo que alguien realmente necesita, a menudo antes de que lo sepan ellos mismos.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Manejar Situaciones Difíciles con Gracia",
    description: "Los desafíos son inevitables en la hospitalidad. Lo que define a un profesional no es la ausencia de problemas, sino la calma y confianza con la que se resuelven. Cada queja es una oportunidad para demostrar lo que realmente valoramos: la experiencia del huésped por encima de todo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Los Detalles que Importan",
    description: "El lujo no siempre se trata de grandeza. A veces es recordar cómo un huésped recurrente toma su café, o notar cuando alguien parece perdido antes de que pregunte por direcciones. Estos pequeños actos de atención crean recuerdos que duran mucho más que cualquier comodidad.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Construir Conexiones Genuinas",
    description: "Detrás de cada registro hay un ser humano con esperanzas para su estadía. La diferencia entre un buen servicio y un servicio memorable radica en la autenticidad. Cuando nos importa genuinamente — no porque nos entrenaron para ello, sino porque elegimos hacerlo — los huéspedes sienten la diferencia.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Lecciones de HYPERION",
    description: "Trabajar en HYPERION Hotel Salzburgo me ha enseñado que la verdadera hospitalidad es un esfuerzo de equipo. Cada departamento, cada colega contribuye a la experiencia del huésped. La recepción puede ser la cara, pero el corazón de un hotel late en cada rincón.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

function LabHero() {
  return (
    <section className="app-shell hero-root">
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-gradient-bg" />

        <motion.div
          className="hero-orb hero-orb-1"
          animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.span
            variants={itemVariants}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.1))",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "1rem"
            }}
          >
            Perspectivas Profesionales
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Laboratorio de Hospitalidad
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Reflexiones sobre la excelencia en el servicio. Lecciones aprendidas a través de la experiencia, 
            la observación y un profundo compromiso con el oficio de la hospitalidad.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PrincipleCard({ principle, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="surface"
        style={{
          padding: "2rem",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
        whileHover={{ 
          y: -6, 
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.1)",
          borderColor: "rgba(37, 99, 235, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary)",
            marginBottom: "1.25rem"
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {principle.icon}
        </motion.div>

        <h3 style={{
          fontSize: "1.15rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
          lineHeight: 1.3
        }}>
          {principle.title}
        </h3>

        <p style={{
          color: "var(--color-muted)",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          flexGrow: 1
        }}>
          {principle.description}
        </p>

        <motion.div
          style={{
            marginTop: "1.25rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--color-border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8rem",
            color: "var(--color-muted)"
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--primary)"
          }} />
          Principio {index + 1} de {principles.length}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function PrinciplesSection() {
  return (
    <section className="app-shell" style={{ marginTop: "1rem", marginBottom: "3rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <span style={{
          display: "inline-block",
          padding: "0.4rem 1rem",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08))",
          borderRadius: "999px",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--primary)",
          marginBottom: "1rem"
        }}>
          Principios Fundamentales
        </span>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Los Fundamentos de la Excelencia
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
          Seis principios que guían mi enfoque hacia la hospitalidad, aprendidos a través de la práctica y la reflexión.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem"
      }}>
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.id} principle={principle} index={index} />
        ))}
      </div>
    </section>
  );
}

function QuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "2rem" }}
    >
      <div
        className="surface"
        style={{
          padding: "3rem 2.5rem",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(139, 92, 246, 0.02))"
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: "var(--primary)", opacity: 0.5, marginBottom: "1.5rem" }}
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>

          <p style={{
            fontSize: "1.4rem",
            fontStyle: "italic",
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 1.5rem",
            color: "var(--color-text)"
          }}>
            La verdadera hospitalidad no se trata de impresionar a las personas con lo que tienes, 
            sino de hacerlas sentir valoradas por quienes son.
          </p>

          <p style={{
            color: "var(--color-muted)",
            fontSize: "0.9rem"
          }}>
            — Una filosofía guía
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ClosingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "2rem" }}
    >
      <div className="surface" style={{ padding: "2.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent-pink))"
        }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem" }}>
            El Aprendizaje Nunca Se Detiene
          </h3>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "600px" }}>
            Estos principios no son reglas rígidas — son ideas vivas que evolucionan con cada interacción, 
            cada desafío y cada momento de crecimiento. El laboratorio de hospitalidad siempre está abierto para nuevas lecciones.
          </p>
          <motion.a
            href={`/${LANG}`}
            className="glass-button-primary"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Volver al Inicio
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function HospitalityLabPage() {
  return (
    <>
      <Header lang={LANG} />
      <main>
        <LabHero />
        <PrinciplesSection />
        <QuoteSection />
        <ClosingSection />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
