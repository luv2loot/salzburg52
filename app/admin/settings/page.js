"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminSettings() {
  const [underConstruction, setUnderConstruction] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
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
    localStorage.setItem(key, newValue ? "true" : "false");
    if (key === "underConstructionMode") setUnderConstruction(newValue);
    if (key === "demoMode") setDemoMode(newValue);
    if (key === "maintenanceMode") setMaintenanceMode(newValue);
    if (key === "analyticsEnabled") setAnalyticsEnabled(newValue);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050509 0%, #0b0b12 50%, #1a1a2e 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
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
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            { key: "underConstructionMode", label: "🚧 Under Construction", status: underConstruction ? "🟢 Maintenance on" : "🔴 Live", value: underConstruction },
            { key: "demoMode", label: "🎬 Demo Mode", status: demoMode ? "🟢 Demo active" : "🔴 Regular", value: demoMode },
            { key: "maintenanceMode", label: "🔧 Maintenance", status: maintenanceMode ? "🟢 Admin only" : "🔴 Public", value: maintenanceMode },
            { key: "analyticsEnabled", label: "📊 Analytics", status: analyticsEnabled ? "🟢 Tracking on" : "🔴 Off", value: analyticsEnabled },
          ].map((setting) => (
            <motion.div
              key={setting.key}
              style={{
                padding: "2rem",
                background: "rgba(15, 15, 25, 0.5)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
                  {setting.label}
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0.5rem 0 0 0" }}>
                  {setting.status}
                </p>
              </div>
              <motion.button
                onClick={() => handleToggle(setting.key, !setting.value)}
                style={{
                  position: "relative",
                  width: "60px",
                  height: "32px",
                  background: setting.value ? "rgba(139, 92, 246, 0.3)" : "rgba(37, 99, 235, 0.3)",
                  border: setting.value ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(37, 99, 235, 0.5)",
                  borderRadius: "16px",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: setting.value ? "30px" : "2px",
                    width: "28px",
                    height: "28px",
                    background: setting.value ? "#8B5CF6" : "#2563EB",
                    borderRadius: "14px",
                    transition: "all 0.3s ease",
                  }}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
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
      </div>
    </div>
  );
}
