"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";

const LANG = "es";

const milestones = [
  {
    id: 1,
    title: "Educación Temprana e Intereses",
    period: "2018 - 2021",
    description: "Desarrollé un profundo interés por la hospitalidad y la excelencia en el servicio durante la educación secundaria. Participé en varios eventos escolares y descubrí una pasión por crear experiencias memorables para otros.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Decisión de Seguir la Hospitalidad",
    period: "2021 - 2022",
    description: "Tomé la decisión consciente de seguir una carrera en hospitalidad de lujo. Investigué diversas oportunidades y me inspiré en la rica tradición de excelencia hotelera austriaca y la renombrada industria hotelera de Salzburgo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Inicio del Aprendizaje",
    period: "Septiembre 2022",
    description: "Comencé mi trayectoria profesional en HYPERION Hotel Salzburgo. Las primeras semanas estuvieron llenas de orientación, conociendo al increíble equipo y aprendiendo los fundamentos de las operaciones hoteleras de profesionales experimentados.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hitos Clave y Aprendizajes",
    period: "2022 - 2024",
    description: "Roté por varios departamentos incluyendo recepción, relaciones con huéspedes y alimentos y bebidas. Obtuve experiencia práctica en servicio al huésped, resolución de problemas y el arte de anticipar las necesidades de los huéspedes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Rol Actual y Responsabilidades",
    period: "2024 - Presente",
    description: "Ahora manejo las relaciones con huéspedes con mayor autonomía, guío a nuevos miembros del equipo y contribuyo al compromiso del hotel con un servicio excepcional. Cada día trae nuevas oportunidades para crear impresiones duraderas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Ambiciones Futuras",
    period: "Mirando Adelante",
    description: "Aspiro a completar mi aprendizaje con distinción y seguir creciendo en el sector de hospitalidad de lujo. Sueño con eventualmente contribuir a la gestión hotelera manteniendo la filosofía centrada en el huésped que define la gran hospitalidad.",
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

        <ScrollReveal direction="up" delay={0}>
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
              Mi Historia
            </motion.span>

            <motion.h1
              className="hero-title"
              variants={itemVariants}
            >
              Mi Trayectoria Profesional
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              variants={itemVariants}
            >
              Desde aspiraciones tempranas hasta formar parte de la familia del HYPERION Hotel Salzburgo — 
              este es mi camino en la hospitalidad de lujo, formado por dedicación, aprendizaje y pasión 
              por crear experiencias excepcionales para los huéspedes.
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
                HYPERION Hotel Salzburgo
              </motion.span>
            </motion.div>
          </motion.div>
        </ScrollReveal>
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
  const delays = [0, 0.1, 0.15, 0.2, 0.1, 0.15];
  const delay = delays[index % delays.length];

  return (
    <ScrollReveal direction={isLeft ? "left" : "right"} delay={delay}>
      <motion.div
        ref={ref}
        className={`timeline-item ${isLeft ? "timeline-item-left" : "timeline-item-right"}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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
    </ScrollReveal>
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
      <ScrollReveal direction="up" delay={0.1}>
        <motion.div
          className="timeline-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="timeline-intro-badge">Cronología</span>
          <h2 className="timeline-intro-title">El Camino Hasta Ahora</h2>
          <p className="timeline-intro-text">
            Cada paso ha sido una experiencia de aprendizaje, moldeando quién soy como profesional de la hospitalidad.
          </p>
        </motion.div>
      </ScrollReveal>

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
    <ScrollReveal direction="up" delay={0.15}>
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
            <h3 className="journey-closing-title">El Viaje Continúa</h3>
            <p className="journey-closing-text">
              Esto es solo el comienzo. Cada interacción con un huésped, cada desafío superado 
              y cada momento de crecimiento se suma a esta historia continua de desarrollo profesional 
              y dedicación a la excelencia en la hospitalidad.
            </p>
            <motion.a
              href={`/${LANG}`}
              className="glass-button-primary journey-closing-cta"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              Volver al Inicio
              <span className="journey-cta-arrow">→</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </ScrollReveal>
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
