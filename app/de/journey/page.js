"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "de";

const milestones = [
  {
    id: 1,
    title: "Frühe Ausbildung & Interessen",
    period: "2018 - 2021",
    description: "Entwickelte während der Sekundarschulzeit ein großes Interesse an Gastfreundschaft und Service-Exzellenz. Nahm an verschiedenen Schulveranstaltungen teil und entdeckte eine Leidenschaft dafür, unvergessliche Erlebnisse für andere zu schaffen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Entscheidung für die Hotellerie",
    period: "2021 - 2022",
    description: "Traf die bewusste Entscheidung, eine Karriere in der Luxushotellerie zu verfolgen. Recherchierte verschiedene Möglichkeiten und wurde von der reichen Tradition der österreichischen Gastfreundschaft und der renommierten Hotelbranche in Salzburg inspiriert.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Beginn der Lehre",
    period: "September 2022",
    description: "Begann meine berufliche Laufbahn im HYPERION Hotel Salzburg. Die ersten Wochen waren geprägt von Orientierung, dem Kennenlernen des unglaublichen Teams und dem Erlernen der Grundlagen des Hotelbetriebs von erfahrenen Fachleuten.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Wichtige Meilensteine & Erkenntnisse",
    period: "2022 - 2024",
    description: "Rotierte durch verschiedene Abteilungen, darunter Rezeption, Gästebetreuung und Food & Beverage. Sammelte praktische Erfahrung im Gästeservice, bei der Problemlösung und in der Kunst, Gästebedürfnisse vorauszuahnen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Aktuelle Rolle & Verantwortlichkeiten",
    period: "2024 - Heute",
    description: "Betreue nun die Gästebeziehungen mit größerer Eigenständigkeit, begleite neue Teammitglieder und trage zum Engagement des Hotels für außergewöhnlichen Service bei. Jeder Tag bringt neue Möglichkeiten, bleibende Eindrücke zu schaffen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Zukunftspläne",
    period: "Ausblick",
    description: "Strebe danach, meine Lehre mit Auszeichnung abzuschließen und im Luxushotellerie-Sektor weiter zu wachsen. Träume davon, eines Tages zum Hotelmanagement beizutragen und dabei die gästezentrierte Philosophie zu bewahren, die großartige Gastfreundschaft ausmacht.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function JourneyHero() {
  return (
    <section className="app-shell hero-root">
      <motion.div
        className="hero-inner journey-hero"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-gradient-bg" />

        <motion.div
          className="hero-orb hero-orb-1"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          animate={{
            y: [0, 30, 0],
            x: [0, -25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="journey-hero-badge"
            variants={itemVariants}
          >
            Meine Geschichte
          </motion.span>

          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            Meine berufliche Reise
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={itemVariants}
          >
            Von frühen Ambitionen bis hin zur Mitgliedschaft in der HYPERION Hotel Salzburg Familie — 
            das ist mein Weg in der Luxushotellerie, geprägt von Hingabe, Lernen und der Leidenschaft 
            für außergewöhnliche Gästeerlebnisse.
          </motion.p>

          <motion.div
            className="hero-accent-row"
            variants={itemVariants}
          >
            <motion.span
              className="hero-pill"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              HYPERION Hotel Salzburg
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function TimelineSpine({ scrollYProgress }) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="timeline-spine-container">
      <div className="timeline-spine-track" />
      <motion.div
        className="timeline-spine-progress"
        style={{ scaleY, transformOrigin: "top" }}
      />
    </div>
  );
}

function TimelineDot({ index, isInView }) {
  return (
    <motion.div
      className={`timeline-dot ${isInView ? "timeline-dot-active" : ""}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isInView ? 1.2 : 1,
        opacity: 1,
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.3 },
      }}
    >
      <motion.div
        className="timeline-dot-inner"
        animate={{
          scale: isInView ? [1, 1.3, 1] : 1,
          boxShadow: isInView
            ? "0 0 20px rgba(37, 99, 235, 0.6)"
            : "0 0 0px rgba(37, 99, 235, 0)",
        }}
        transition={{
          scale: { duration: 1.5, repeat: isInView ? Infinity : 0 },
          boxShadow: { duration: 0.3 },
        }}
      />
    </motion.div>
  );
}

function MilestoneCard({ milestone, index, isLeft }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${isLeft ? "timeline-item-left" : "timeline-item-right"}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <TimelineDot index={index} isInView={isInView} />

      <motion.div
        className="timeline-card glass-card"
        whileHover={{
          y: -8,
          boxShadow: "0 20px 50px rgba(37, 99, 235, 0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="timeline-card-header">
          <div className="timeline-card-icon">
            {milestone.icon}
          </div>
          <div className="timeline-card-meta">
            <span className="timeline-card-period">{milestone.period}</span>
          </div>
        </div>

        <h3 className="timeline-card-title">{milestone.title}</h3>
        <p className="timeline-card-description">{milestone.description}</p>

        <div className="timeline-card-connector" />
      </motion.div>
    </motion.div>
  );
}

function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="app-shell timeline-section" ref={containerRef}>
      <motion.div
        className="timeline-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="timeline-intro-badge">Zeitleiste</span>
        <h2 className="timeline-intro-title">Der bisherige Weg</h2>
        <p className="timeline-intro-text">
          Jeder Schritt war eine Lernerfahrung, die mich als Gastfreundschaftsprofi geprägt hat.
        </p>
      </motion.div>

      <div className="timeline-container">
        <TimelineSpine scrollYProgress={scrollYProgress} />

        <div className="timeline-items">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <motion.section
      className="app-shell journey-closing"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="surface journey-closing-inner">
        <div className="journey-closing-gradient" />
        <motion.div
          className="journey-closing-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="journey-closing-title">Die Reise geht weiter</h3>
          <p className="journey-closing-text">
            Dies ist erst der Anfang. Jede Gästeinteraktion, jede gemeisterte Herausforderung 
            und jeder Moment des Wachstums trägt zu dieser fortlaufenden Geschichte der beruflichen 
            Entwicklung und des Engagements für Gastfreundschafts-Exzellenz bei.
          </p>
          <motion.a
            href={`/${LANG}`}
            className="glass-button-primary journey-closing-cta"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            Zurück zur Startseite
            <span className="journey-cta-arrow">→</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function JourneyPage() {
  return (
    <>
      <Header lang={LANG} />
      <main>
        <JourneyHero />
        <Timeline />
        <ClosingSection />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
