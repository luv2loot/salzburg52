"use client";

import { motion } from "framer-motion";

export default function Hero({ greeting, title, subtitle, accent }) {
  return (
    <section className="app-shell hero-root">
      <motion.div
        className="surface hero-inner"
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {greeting && (
          <motion.p
            className="hero-greeting text-muted"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.3 }}
          >
            {greeting}
          </motion.p>
        )}

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.35 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="hero-accent-row"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.35 }}
        >
          <motion.span
            className="hero-pill"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {accent}
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
