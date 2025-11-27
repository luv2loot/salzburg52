"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminSettings() {
  const [mounted, setMounted] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/unlock";
      return;
    }

    const stored = localStorage.getItem("underConstructionMode") === "true";
    setUnderConstruction(stored);
    setIsLoading(false);
  }, []);

  const handleToggle = () => {
    setIsToggling(true);
    const newValue = !underConstruction;
    setUnderConstruction(newValue);
    localStorage.setItem("underConstructionMode", newValue ? "true" : "false");
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        {/* Header */}
        <motion.div style={{ marginBottom: "2rem" }}>
          <Link href="/admin/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(37, 99, 235, 0.15)",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "8px",
                color: "#93c5fd",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f9fafb", marginBottom: "0.5rem" }}>
            Site Settings
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
            Control website visibility and maintenance mode
          </p>
        </motion.div>

        {/* Main Setting Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            borderRadius: "20px",
            padding: "2.5rem",
            backdropFilter: "blur(10px)",
            marginBottom: "2rem",
          }}
        >
          {/* Status Badge */}
          <motion.div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1.25rem",
              background: underConstruction
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(34, 197, 94, 0.1)",
              border: underConstruction
                ? "1px solid rgba(239, 68, 68, 0.2)"
                : "1px solid rgba(34, 197, 94, 0.2)",
              borderRadius: "12px",
              marginBottom: "2rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>
              {underConstruction ? "🚧" : "✨"}
            </span>
            <span
              style={{
                fontWeight: 700,
                color: underConstruction ? "#fca5a5" : "#86efac",
                fontSize: "0.95rem",
              }}
            >
              {underConstruction ? "UNDER CONSTRUCTION" : "LIVE"}
            </span>
          </motion.div>

          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f9fafb", marginBottom: "1rem" }}>
              🚧 Maintenance Mode
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {underConstruction
                ? "Your website is currently hidden from public visitors. They will see a \"Coming Soon\" page instead of your portfolio."
                : "Your website is live and publicly visible. All pages are accessible to visitors."}
            </p>

            <motion.button
              onClick={handleToggle}
              disabled={isToggling}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "1.25rem",
                background: underConstruction
                  ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))"
                  : "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))",
                border: underConstruction
                  ? "2px solid rgba(34, 197, 94, 0.3)"
                  : "2px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "14px",
                color: underConstruction ? "#86efac" : "#fca5a5",
                fontSize: "1.1rem",
                fontWeight: 800,
                cursor: isToggling ? "not-allowed" : "pointer",
                opacity: isToggling ? 0.6 : 1,
                transition: "all 0.2s",
              }}
            >
              {isToggling
                ? "Updating..."
                : underConstruction
                  ? "✅ Turn Website Back ON"
                  : "❌ Put Under Construction"}
            </motion.button>
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: "1.25rem",
              background: "rgba(37, 99, 235, 0.1)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "12px",
            }}
          >
            <p style={{ fontSize: "0.85rem", color: "#93c5fd", lineHeight: 1.6 }}>
              <strong>💡 Info:</strong> When Under Construction is enabled:
              <br />• Visitors see a professional "Coming Soon" page
              <br />• Only you can access the admin panel
              <br />• All visitor traffic is blocked
              <br />• You can toggle it back on anytime
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "rgba(255, 255, 255, 0.01)",
            border: "1px solid rgba(139, 92, 246, 0.1)",
            borderRadius: "16px",
            padding: "1.5rem",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#d8b4fe", marginBottom: "1rem" }}>
            📊 Status Overview
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                Website Status
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: underConstruction ? "#fca5a5" : "#86efac",
                }}
              >
                {underConstruction ? "🔴 Hidden" : "🟢 Public"}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                Visitor Access
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: underConstruction ? "#fca5a5" : "#86efac",
                }}
              >
                {underConstruction ? "❌ Blocked" : "✅ Allowed"}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
