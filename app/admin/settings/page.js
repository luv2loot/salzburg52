"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminSettings() {
  const [mounted, setMounted] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    setUnderConstruction(localStorage.getItem("underConstructionMode") === "true");
    setDemoMode(localStorage.getItem("demoMode") === "true");
    setMaintenanceMode(localStorage.getItem("maintenanceMode") === "true");
    setAnalyticsEnabled(localStorage.getItem("analyticsEnabled") !== "false");
  }, []);

  const handleToggle = (key, newValue) => {
    setIsToggling(true);
    localStorage.setItem(key, newValue ? "true" : "false");
    
    switch(key) {
      case "underConstructionMode":
        setUnderConstruction(newValue);
        break;
      case "demoMode":
        setDemoMode(newValue);
        break;
      case "maintenanceMode":
        setMaintenanceMode(newValue);
        break;
      case "analyticsEnabled":
        setAnalyticsEnabled(newValue);
        break;
    }
    
    setTimeout(() => {
      setIsToggling(false);
    }, 300);
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

          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f8f9fa", margin: "0 0 0.5rem 0" }}>
            Site Settings
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#9ca3af", margin: 0 }}>
            Configure your portfolio settings and features
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Under Construction */}
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
            <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
                  🚧 Under Construction Mode
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0.5rem 0 0 0" }}>
                  {underConstruction ? "🟢 Visitors see maintenance page" : "🔴 Site is live"}
                </p>
              </div>
              <motion.button
                onClick={() => handleToggle("underConstructionMode", !underConstruction)}
                disabled={isToggling}
                style={{
                  position: "relative",
                  width: "60px",
                  height: "32px",
                  background: underConstruction ? "rgba(139, 92, 246, 0.3)" : "rgba(37, 99, 235, 0.3)",
                  border: underConstruction ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(37, 99, 235, 0.5)",
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
          </motion.div>

          {/* Demo Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              padding: "2rem",
              background: "rgba(15, 15, 25, 0.5)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "16px",
            }}
          >
            <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
                  🎬 Demo Mode
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0.5rem 0 0 0" }}>
                  {demoMode ? "🟢 Demo content active" : "🔴 Regular content"}
                </p>
              </div>
              <motion.button
                onClick={() => handleToggle("demoMode", !demoMode)}
                disabled={isToggling}
                style={{
                  position: "relative",
                  width: "60px",
                  height: "32px",
                  background: demoMode ? "rgba(139, 92, 246, 0.3)" : "rgba(37, 99, 235, 0.3)",
                  border: demoMode ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(37, 99, 235, 0.5)",
                  borderRadius: "16px",
                  cursor: isToggling ? "not-allowed" : "pointer",
                  padding: 0,
                }}
              >
                <motion.div
                  animate={{ x: demoMode ? 30 : 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "28px",
                    height: "28px",
                    background: demoMode ? "#8B5CF6" : "#2563EB",
                    borderRadius: "14px",
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Maintenance Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              padding: "2rem",
              background: "rgba(15, 15, 25, 0.5)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "16px",
            }}
          >
            <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
                  🔧 Maintenance Mode
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0.5rem 0 0 0" }}>
                  {maintenanceMode ? "🟢 Admins only access" : "🔴 Public access"}
                </p>
              </div>
              <motion.button
                onClick={() => handleToggle("maintenanceMode", !maintenanceMode)}
                disabled={isToggling}
                style={{
                  position: "relative",
                  width: "60px",
                  height: "32px",
                  background: maintenanceMode ? "rgba(139, 92, 246, 0.3)" : "rgba(37, 99, 235, 0.3)",
                  border: maintenanceMode ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(37, 99, 235, 0.5)",
                  borderRadius: "16px",
                  cursor: isToggling ? "not-allowed" : "pointer",
                  padding: 0,
                }}
              >
                <motion.div
                  animate={{ x: maintenanceMode ? 30 : 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "28px",
                    height: "28px",
                    background: maintenanceMode ? "#8B5CF6" : "#2563EB",
                    borderRadius: "14px",
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              padding: "2rem",
              background: "rgba(15, 15, 25, 0.5)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "16px",
            }}
          >
            <motion.div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
                  📊 Analytics Tracking
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0.5rem 0 0 0" }}>
                  {analyticsEnabled ? "🟢 Tracking enabled" : "🔴 Tracking disabled"}
                </p>
              </div>
              <motion.button
                onClick={() => handleToggle("analyticsEnabled", !analyticsEnabled)}
                disabled={isToggling}
                style={{
                  position: "relative",
                  width: "60px",
                  height: "32px",
                  background: analyticsEnabled ? "rgba(139, 92, 246, 0.3)" : "rgba(37, 99, 235, 0.3)",
                  border: analyticsEnabled ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(37, 99, 235, 0.5)",
                  borderRadius: "16px",
                  cursor: isToggling ? "not-allowed" : "pointer",
                  padding: 0,
                }}
              >
                <motion.div
                  animate={{ x: analyticsEnabled ? 30 : 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "28px",
                    height: "28px",
                    background: analyticsEnabled ? "#8B5CF6" : "#2563EB",
                    borderRadius: "14px",
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#86efac", margin: 0 }}>
            ℹ️ Changes apply globally across all languages and devices
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
