"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminSettings() {
  const [mounted, setMounted] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    const stored = localStorage.getItem("underConstructionMode") === "true";
    setUnderConstruction(stored);
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

  if (!mounted) return null;

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
                marginBottom: "1rem",
              }}
            >
              ← Back to Dashboard
            </motion.button>
          </Link>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#f8f9fa",
              margin: "0 0 0.5rem 0",
            }}
          >
            Site Settings
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#9ca3af",
              margin: 0,
            }}
          >
            Manage your Salzburg52 configuration
          </p>
        </motion.div>

        {/* Main Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            padding: "2rem",
            background: "rgba(15, 15, 25, 0.5)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            borderRadius: "16px",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid rgba(37, 99, 235, 0.2)",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#f8f9fa",
                  margin: 0,
                }}
              >
                Under Construction Mode
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                  margin: "0.5rem 0 0 0",
                }}
              >
                {underConstruction
                  ? "🚧 Site is currently in maintenance mode"
                  : "✅ Site is live"}
              </p>
            </div>

            {/* Toggle Switch */}
            <motion.button
              onClick={handleToggle}
              disabled={isToggling}
              style={{
                position: "relative",
                width: "60px",
                height: "32px",
                background: underConstruction
                  ? "rgba(139, 92, 246, 0.3)"
                  : "rgba(37, 99, 235, 0.3)",
                border: underConstruction
                  ? "1px solid rgba(139, 92, 246, 0.5)"
                  : "1px solid rgba(37, 99, 235, 0.5)",
                borderRadius: "16px",
                cursor: isToggling ? "not-allowed" : "pointer",
                padding: 0,
              }}
            >
              <motion.div
                animate={{ x: underConstruction ? 30 : 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  width: "28px",
                  height: "28px",
                  background: underConstruction ? "#8B5CF6" : "#2563EB",
                  borderRadius: "14px",
                }}
              />
            </motion.button>
          </motion.div>

          {/* Status Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: underConstruction
                ? "rgba(139, 92, 246, 0.1)"
                : "rgba(34, 197, 94, 0.1)",
              border: underConstruction
                ? "1px solid rgba(139, 92, 246, 0.3)"
                : "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                color: underConstruction ? "#d8b4fe" : "#86efac",
                margin: 0,
              }}
            >
              {underConstruction
                ? "🚧 Visitors will see a maintenance page"
                : "✅ Site is fully accessible to the public"}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
