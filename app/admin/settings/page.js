"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminSettings() {
  const [mounted, setMounted] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Check if authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/unlock";
      return;
    }

    // Get current status
    const stored = localStorage.getItem("underConstructionMode") === "true";
    setUnderConstruction(stored);
    setIsLoading(false);
  }, []);

  const handleToggle = () => {
    const newValue = !underConstruction;
    setUnderConstruction(newValue);
    localStorage.setItem("underConstructionMode", newValue ? "true" : "false");
    window.location.reload();
  };

  if (!mounted || isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050509 0%, #0b0b12 50%, #1a1a2e 100%)",
        padding: "2rem 1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#f9fafb",
                marginBottom: "0.5rem",
              }}
            >
              Site Settings
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Control website visibility</p>
          </div>
          <Link href="/admin/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(37, 99, 235, 0.2)",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "8px",
                color: "#93c5fd",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Back
            </motion.button>
          </Link>
        </motion.div>

        {/* Under Construction Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            borderRadius: "16px",
            padding: "2rem",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#f9fafb",
                  marginBottom: "0.5rem",
                }}
              >
                🚧 Under Construction Mode
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                When enabled, visitors will see a "Coming Soon" page instead of your website
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            style={{
              padding: "0.75rem 1rem",
              background: underConstruction ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
              border: underConstruction ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              color: underConstruction ? "#fca5a5" : "#86efac",
              fontSize: "0.9rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            {underConstruction ? "🔴 Currently UNDER CONSTRUCTION" : "🟢 Currently LIVE"}
          </motion.div>

          {/* Toggle Switch */}
          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "1rem",
              background: underConstruction ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)",
              border: underConstruction ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "12px",
              color: underConstruction ? "#fca5a5" : "#86efac",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {underConstruction ? "✅ Turn ON the Website" : "❌ Put Under Construction"}
          </motion.button>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "rgba(37, 99, 235, 0.1)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "8px",
              color: "#93c5fd",
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            <p>💡 <strong>Tip:</strong> You can also access this from the under construction page itself with the ⚙️ settings button in the top-right corner.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
