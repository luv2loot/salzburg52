"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CharReveal, FadeUp } from "./animations/TextReveal";
import { MagneticButton, GlowButton } from "./animations/MagneticButton";
import { FloatingOrb, FloatingShape, GridPattern } from "./animations/FloatingElements";

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
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero({ greeting, title, subtitle, accent, ctaText, ctaHref }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section className="app-shell hero-root" ref={containerRef}>
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ y, opacity, scale }}
      >
        <div className="hero-gradient-bg" />
        <GridPattern />

        <FloatingOrb size={350} color="rgba(37, 99, 235, 0.2)" blur={100} top="-15%" left="-10%" delay={0} duration={18} />
        <FloatingOrb size={280} color="rgba(139, 92, 246, 0.15)" blur={90} top="30%" right="-15%" delay={3} duration={22} />
        <FloatingOrb size={200} color="rgba(236, 72, 153, 0.12)" blur={70} bottom="-10%" left="20%" delay={5} duration={15} />

        <FloatingShape type="circle" size={80} color="rgba(37, 99, 235, 0.2)" top="15%" right="10%" delay={0} />
        <FloatingShape type="square" size={50} color="rgba(139, 92, 246, 0.15)" top="60%" left="8%" delay={2} />
        <FloatingShape type="diamond" size={40} color="rgba(236, 72, 153, 0.18)" bottom="20%" right="15%" delay={4} />

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 2 }}
        >
          {greeting && (
            <motion.div variants={itemVariants}>
              <motion.p
                className="hero-greeting text-muted"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.span
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ 
                    display: "inline-block",
                    marginRight: "0.5rem"
                  }}
                >
                  ✦
                </motion.span>
                {greeting}
              </motion.p>
            </motion.div>
          )}

          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block" }}
              >
                {title}
              </motion.span>
            </span>
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
              <MagneticButton strength={0.3}>
                <motion.a
                  href={ctaHref}
                  className="hero-cta"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <motion.span
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transform: "translateX(-100%)"
                    }}
                    animate={{ transform: ["translateX(-100%)", "translateX(100%)"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span style={{ position: "relative" }}>{ctaText}</span>
                  <motion.span
                    className="hero-cta-icon"
                    initial={{ x: 0, opacity: 0.7 }}
                    whileHover={{ x: 4, opacity: 1 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </MagneticButton>
            ) : (
              <MagneticButton strength={0.2}>
                <motion.span
                  className="hero-pill"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {accent}
                </motion.span>
              </MagneticButton>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                opacity: 0.5
              }}
            >
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 4v16m0 0l-4-4m4 4l4-4" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
