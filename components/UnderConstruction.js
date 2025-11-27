"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function UnderConstruction() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for under construction mode
    const stored = localStorage.getItem("underConstructionMode");
    const isUnderConstruction = stored === "true" || process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";
    setIsVisible(isUnderConstruction);
    
    // Listen for storage changes (when toggled from settings)
    const handleStorageChange = () => {
      const updated = localStorage.getItem("underConstructionMode") === "true";
      setIsVisible(updated);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #050509 0%, #0b0b12 50%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          textAlign: "center",
          padding: "2rem",
          maxWidth: "600px",
        }}
      >
        {/* Construction Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontSize: "4rem",
            marginBottom: "1.5rem",
          }}
        >
          🚧
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          style={{
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            fontWeight: 800,
            color: "#f9fafb",
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Under Construction
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            fontSize: "1.1rem",
            color: "#9ca3af",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          I'm working on something amazing! This site is temporarily unavailable while I make improvements.
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [-8, 0, -8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB, #8B5CF6)",
              }}
            />
          ))}
        </motion.div>

        {/* Coming Soon Text */}
        <motion.p
          style={{
            fontSize: "0.95rem",
            color: "#6b7280",
          }}
        >
          Coming back soon with fresh updates...
        </motion.p>
      </motion.div>

      {/* Floating Background Elements */}
      <motion.div
        animate={{ x: [-50, 50, -50] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [50, -50, 50] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          bottom: "-5%",
          right: "-5%",
          pointerEvents: "none",
        }}
      />

    </motion.div>
  );
}
