"use client";

import { motion } from "framer-motion";

export default function Hero({
  greeting = "Good to see you.",
  title = "I am Amir Ismaili.",
  subtitle = "Front office apprentice in Salzburg, speaking five languages and building Salzburg52.",
  accent = "Salzburg · Hospitality · Languages",
  lang = "en"
}) {
  return (
    <section className="app-shell hero-root">
      <motion.div
        className="surface hero-inner"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.p
          className="hero-greeting text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          {greeting}
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="hero-accent-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <span className="hero-pill">{accent}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
