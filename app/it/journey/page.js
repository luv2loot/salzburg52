"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "it";

const milestones = [
  {
    id: 1,
    title: "Educazione e Interessi Precoci",
    period: "2018 - 2021",
    description: "Ho sviluppato un forte interesse per l'ospitalità e l'eccellenza del servizio durante l'istruzione secondaria. Ho partecipato a vari eventi scolastici e ho scoperto una passione per creare esperienze memorabili per gli altri.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Decisione di Perseguire l'Ospitalità",
    period: "2021 - 2022",
    description: "Ho preso la decisione consapevole di perseguire una carriera nell'ospitalità di lusso. Ho ricercato varie opportunità e mi sono ispirato alla ricca tradizione dell'eccellenza alberghiera austriaca e alla rinomata industria alberghiera di Salisburgo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Inizio dell'Apprendistato",
    period: "Settembre 2022",
    description: "Ho iniziato il mio percorso professionale presso l'HYPERION Hotel Salisburgo. Le prime settimane sono state piene di orientamento, conoscenza dell'incredibile team e apprendimento delle basi delle operazioni alberghiere da professionisti esperti.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Tappe Fondamentali e Apprendimenti",
    period: "2022 - 2024",
    description: "Ho ruotato attraverso vari reparti tra cui reception, guest relations e food & beverage. Ho acquisito esperienza pratica nel servizio agli ospiti, nella risoluzione dei problemi e nell'arte di anticipare le esigenze degli ospiti.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Ruolo Attuale e Responsabilità",
    period: "2024 - Presente",
    description: "Ora gestisco le relazioni con gli ospiti con maggiore autonomia, guido i nuovi membri del team e contribuisco all'impegno dell'hotel per un servizio eccezionale. Ogni giorno porta nuove opportunità per creare impressioni durature.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Ambizioni Future",
    period: "Guardando Avanti",
    description: "Aspiro a completare il mio apprendistato con distinzione e continuare a crescere nel settore dell'ospitalità di lusso. Sogno di contribuire un giorno alla gestione alberghiera mantenendo la filosofia centrata sull'ospite che definisce la grande ospitalità.",
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
            La Mia Storia
          </motion.span>

          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            Il Mio Percorso Professionale
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={itemVariants}
          >
            Dalle prime aspirazioni all'ingresso nella famiglia dell'HYPERION Hotel Salisburgo — 
            questo è il mio percorso nell'ospitalità di lusso, plasmato da dedizione, apprendimento 
            e passione per creare esperienze eccezionali per gli ospiti.
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
              HYPERION Hotel Salisburgo
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
        <span className="timeline-intro-badge">Timeline</span>
        <h2 className="timeline-intro-title">Il Percorso Finora</h2>
        <p className="timeline-intro-text">
          Ogni passo è stato un'esperienza di apprendimento, plasmando chi sono come professionista dell'ospitalità.
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
          <h3 className="journey-closing-title">Il Viaggio Continua</h3>
          <p className="journey-closing-text">
            Questo è solo l'inizio. Ogni interazione con un ospite, ogni sfida superata 
            e ogni momento di crescita si aggiunge a questa storia continua di sviluppo professionale 
            e dedizione all'eccellenza dell'ospitalità.
          </p>
          <motion.a
            href={`/${LANG}`}
            className="glass-button-primary journey-closing-cta"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            Torna alla Home
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
