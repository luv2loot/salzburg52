"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function UnderConstruction() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

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

  const toggleUnderConstruction = () => {
    localStorage.setItem("underConstructionMode", "false");
    setShowAdminPanel(false);
    setAdminPassword("");
    window.location.reload();
  };

  const verifyAdminPassword = () => {
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "salzburg52";
    if (adminPassword === correctPassword) {
      toggleUnderConstruction();
    } else {
      alert("❌ Incorrect password. Try again.");
      setAdminPassword("");
    }
  };

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

      {/* Admin Toggle Button */}
      <motion.button
        onClick={() => setShowAdminPanel(!showAdminPanel)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.15)",
          border: "1px solid rgba(37, 99, 235, 0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#2563EB" }}>
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
        </svg>
      </motion.button>

      {/* Admin Password Panel */}
      {showAdminPanel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: "fixed",
            top: "5rem",
            right: "2rem",
            background: "rgba(5, 5, 9, 0.95)",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            borderRadius: "12px",
            padding: "1rem",
            backdropFilter: "blur(10px)",
            zIndex: 10001,
            minWidth: "280px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: "0.75rem", fontWeight: 500 }}>
            Admin Control
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") verifyAdminPassword();
              }}
              placeholder="Enter admin password"
              autoFocus
              style={{
                padding: "0.6rem 0.75rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "8px",
                color: "#f9fafb",
                fontSize: "0.9rem",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <motion.button
                type="button"
                onClick={verifyAdminPassword}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  background: "rgba(37, 99, 235, 0.2)",
                  border: "1px solid rgba(37, 99, 235, 0.3)",
                  borderRadius: "8px",
                  color: "#2563EB",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Turn Off
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  setShowAdminPanel(false);
                  setAdminPassword("");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  background: "rgba(100, 100, 100, 0.2)",
                  border: "1px solid rgba(100, 100, 100, 0.3)",
                  borderRadius: "8px",
                  color: "#6b7280",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
