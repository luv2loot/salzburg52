"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "en";

const milestones = [
  {
    id: 1,
    title: "Early Education & Interests",
    period: "2018 - 2021",
    description: "Developed a keen interest in hospitality and service excellence during secondary education. Participated in various school events and discovered a passion for creating memorable experiences for others.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Decision to Pursue Hospitality",
    period: "2021 - 2022",
    description: "Made the conscious decision to pursue a career in luxury hospitality. Researched various opportunities and became inspired by the rich tradition of Austrian hospitality excellence and the renowned hotel industry in Salzburg.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Start of Apprenticeship",
    period: "September 2022",
    description: "Began my professional journey at HYPERION Hotel Salzburg. The first weeks were filled with orientation, meeting the incredible team, and learning the foundations of hotel operations from experienced professionals.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Key Milestones & Learnings",
    period: "2022 - 2024",
    description: "Rotated through various departments including front desk, guest relations, and food & beverage. Gained hands-on experience in guest service, problem-solving, and the art of anticipating guest needs before they arise.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Current Role & Responsibilities",
    period: "2024 - Present",
    description: "Now handling guest relations with greater autonomy, mentoring newer team members, and contributing to the hotel's commitment to exceptional service. Every day brings new opportunities to create lasting impressions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Future Ambitions",
    period: "Looking Ahead",
    description: "Aspiring to complete my apprenticeship with distinction and continue growing within the luxury hospitality sector. Dreams of eventually contributing to hotel management while maintaining the guest-centric philosophy that defines great hospitality.",
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
            My Story
          </motion.span>

          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            My Professional Journey
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={itemVariants}
          >
            From early aspirations to becoming part of the HYPERION Hotel Salzburg family — 
            this is my path in luxury hospitality, shaped by dedication, learning, and a passion 
            for creating exceptional guest experiences.
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
        <span className="timeline-intro-badge">Timeline</span>
        <h2 className="timeline-intro-title">The Path So Far</h2>
        <p className="timeline-intro-text">
          Every step has been a learning experience, shaping who I am as a hospitality professional.
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
          <h3 className="journey-closing-title">The Journey Continues</h3>
          <p className="journey-closing-text">
            This is just the beginning. Every guest interaction, every challenge overcome, 
            and every moment of growth adds to this ongoing story of professional development 
            and dedication to hospitality excellence.
          </p>
          <motion.a
            href={`/${LANG}`}
            className="glass-button-primary journey-closing-cta"
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Home
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
