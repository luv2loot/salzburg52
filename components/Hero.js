"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const orbVariants = {
  animate: (custom) => ({
    y: [0, custom.y, 0],
    x: [0, custom.x, 0],
    scale: [1, custom.scale, 1],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const shapeVariants = {
  animate: (custom) => ({
    y: [0, custom.y, 0],
    rotate: [custom.rotate, custom.rotate + 10, custom.rotate],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function Hero({ greeting, title, subtitle, accent, ctaText, ctaHref }) {
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
          custom={{ y: -25, x: 20, scale: 1.1, duration: 12 }}
          variants={orbVariants}
          animate="animate"
        />
        <motion.div
          className="hero-orb hero-orb-2"
          custom={{ y: 30, x: -25, scale: 1.15, duration: 15 }}
          variants={orbVariants}
          animate="animate"
        />
        <motion.div
          className="hero-orb hero-orb-3"
          custom={{ y: -18, x: 12, scale: 1.08, duration: 10 }}
          variants={orbVariants}
          animate="animate"
        />

        <motion.div
          className="hero-shape hero-shape-1"
          custom={{ y: -15, rotate: 45, duration: 8 }}
          variants={shapeVariants}
          animate="animate"
        />
        <motion.div
          className="hero-shape hero-shape-2"
          custom={{ y: 20, rotate: 0, duration: 10 }}
          variants={shapeVariants}
          animate="animate"
        />
        <motion.div
          className="hero-shape hero-shape-3"
          custom={{ y: -12, rotate: 0, duration: 6 }}
          variants={shapeVariants}
          animate="animate"
        />

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {greeting && (
            <motion.p
              className="hero-greeting text-muted"
              variants={itemVariants}
            >
              {greeting}
            </motion.p>
          )}

          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="hero-accent-row"
            variants={itemVariants}
          >
            {ctaText && ctaHref ? (
              <motion.a
                href={ctaHref}
                className="hero-cta"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {ctaText}
                <motion.span
                  className="hero-cta-icon"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </motion.a>
            ) : (
              <motion.span
                className="hero-pill"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {accent}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
