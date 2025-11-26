"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "de";

const principles = [
  {
    id: 1,
    title: "Die Kunst des ersten Eindrucks",
    description: "Die ersten 30 Sekunden jeder Interaktion setzen den Ton für alles, was folgt. Ein aufrichtiges Lächeln, Blickkontakt und ungeteilte Aufmerksamkeit kommunizieren mehr als jede einstudierte Begrüßung. Exzellenz bedeutet nicht Perfektion — es bedeutet Präsenz.",
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
    title: "Gäste sichtbar machen",
    description: "Jeder Gast trägt seine eigene Geschichte, seine eigenen Gründe hier zu sein. Die besten Gastfreundschaftsprofis lernen, zwischen den Zeilen zu lesen — die kleinen Details zu bemerken, die verraten, was jemand wirklich braucht, oft bevor er es selbst weiß.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Schwierige Situationen mit Anmut meistern",
    description: "Herausforderungen sind in der Gastfreundschaft unvermeidlich. Was einen Profi auszeichnet, ist nicht das Fehlen von Problemen, sondern die ruhige Zuversicht, mit der sie gelöst werden. Jede Beschwerde ist eine Gelegenheit zu zeigen, was wir wirklich schätzen: das Gästeerlebnis über alles.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Die Details, die zählen",
    description: "Luxus bedeutet nicht immer Pracht. Manchmal bedeutet es, sich zu erinnern, wie ein Stammgast seinen Kaffee nimmt, oder zu bemerken, wenn jemand verloren aussieht, bevor er nach dem Weg fragt. Diese kleinen Aufmerksamkeiten schaffen Erinnerungen, die weit länger halten als jede Annehmlichkeit.",
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
    title: "Echte Verbindungen aufbauen",
    description: "Hinter jedem Check-in steht ein Mensch mit Hoffnungen für seinen Aufenthalt. Der Unterschied zwischen gutem Service und unvergesslichem Service liegt in der Authentizität. Wenn wir aufrichtig Anteil nehmen — nicht weil wir dafür ausgebildet wurden, sondern weil wir es wollen — spüren Gäste den Unterschied.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Lektionen aus dem HYPERION",
    description: "Die Arbeit im HYPERION Hotel Salzburg hat mir gezeigt, dass wahre Gastfreundschaft Teamarbeit ist. Jede Abteilung, jeder Kollege trägt zum Gästeerlebnis bei. Die Rezeption mag das Gesicht sein, aber das Herz eines Hotels schlägt in jeder Ecke.",
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
            Professionelle Einblicke
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Gastfreundschafts-Labor
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Gedanken zur Service-Exzellenz. Lektionen, die durch Erfahrung, Beobachtung 
            und ein tiefes Engagement für das Handwerk der Gastfreundschaft gelernt wurden.
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
          Prinzip {index + 1} von {principles.length}
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
          Grundprinzipien
        </span>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Die Grundlagen der Exzellenz
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
          Sechs Prinzipien, die meinen Ansatz zur Gastfreundschaft leiten, gelernt durch Praxis und Reflexion.
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
            Wahre Gastfreundschaft bedeutet nicht, Menschen mit dem zu beeindrucken, was man hat, 
            sondern ihnen das Gefühl zu geben, für das geschätzt zu werden, was sie sind.
          </p>

          <p style={{
            color: "var(--color-muted)",
            fontSize: "0.9rem"
          }}>
            — Eine leitende Philosophie
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
            Das Lernen hört nie auf
          </h3>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "600px" }}>
            Diese Prinzipien sind keine starren Regeln — sie sind lebendige Ideen, die sich mit jeder Interaktion, 
            jeder Herausforderung und jedem Moment des Wachstums weiterentwickeln. Das Gastfreundschafts-Labor ist immer offen für neue Lektionen.
          </p>
          <motion.a
            href={`/${LANG}`}
            className="glass-button-primary"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Zurück zur Startseite
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
