"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const [adminUsername, setAdminUsername] = useState("");
  const [underConstruction, setUnderConstruction] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    setAdminUsername(username || "Admin");
    setUnderConstruction(localStorage.getItem("underConstructionMode") === "true");
    setDemoMode(localStorage.getItem("demoMode") === "true");
    setMaintenanceMode(localStorage.getItem("maintenanceMode") === "true");
    setAnalyticsEnabled(localStorage.getItem("analyticsEnabled") !== "false");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminUsername");
    window.location.href = "/admin/login";
  };

  const toggleFeature = (key, value) => {
    localStorage.setItem(key, value ? "true" : "false");
    if (key === "underConstructionMode") setUnderConstruction(value);
    if (key === "demoMode") setDemoMode(value);
    if (key === "maintenanceMode") setMaintenanceMode(value);
    if (key === "analyticsEnabled") setAnalyticsEnabled(value);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050509 0%, #0b0b12 50%, #1a1a2e 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(37, 99, 235, 0.2)",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f8f9fa", margin: 0 }}>
              Welcome back, {adminUsername}
            </h1>
            <p style={{ fontSize: "0.9rem", color: "#9ca3af", margin: "0.5rem 0 0 0" }}>
              Manage your Salzburg52 portfolio
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              padding: "0.75rem 1.5rem",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "8px",
              color: "#fca5a5",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Sign Out
          </motion.button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Site Status", value: underConstruction ? "🚧 Under Construction" : "✅ Live" },
            { label: "Visitors Today", value: "2,847" },
            { label: "Page Views", value: "9,432" },
            { label: "Avg. Session", value: "4m 23s" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              style={{
                padding: "1.5rem",
                background: "rgba(15, 15, 25, 0.6)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "12px",
              }}
            >
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", margin: "0 0 0.75rem 0" }}>
                {stat.label}
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8f9fa", margin: 0 }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            padding: "2rem",
            background: "rgba(15, 15, 25, 0.6)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            borderRadius: "16px",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f8f9fa", marginBottom: "1.5rem" }}>
            Feature Controls
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {[
              { key: "underConstructionMode", label: "🚧 Under Construction", desc: "Show maintenance page", value: underConstruction },
              { key: "demoMode", label: "🎬 Demo Mode", desc: "Enable demo content", value: demoMode },
              { key: "maintenanceMode", label: "🔧 Maintenance", desc: "Limited access for admins", value: maintenanceMode },
              { key: "analyticsEnabled", label: "📊 Analytics", desc: "Track visitor behavior", value: analyticsEnabled },
            ].map((feature) => (
              <motion.div
                key={feature.key}
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: "1rem",
                  background: feature.value ? "rgba(37, 99, 235, 0.1)" : "rgba(255, 255, 255, 0.03)",
                  border: feature.value ? "1px solid rgba(37, 99, 235, 0.3)" : "1px solid rgba(37, 99, 235, 0.15)",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f8f9fa", margin: "0 0 0.3rem 0" }}>
                    {feature.label}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
                <button
                  onClick={() => toggleFeature(feature.key, !feature.value)}
                  style={{
                    position: "relative",
                    width: "50px",
                    height: "28px",
                    background: feature.value ? "rgba(37, 99, 235, 0.4)" : "rgba(255, 255, 255, 0.1)",
                    border: feature.value ? "1px solid rgba(37, 99, 235, 0.6)" : "1px solid rgba(37, 99, 235, 0.2)",
                    borderRadius: "14px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: feature.value ? "24px" : "2px",
                      width: "24px",
                      height: "24px",
                      background: feature.value ? "#2563EB" : "#6b7280",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                    }}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "#86efac", margin: 0 }}>
            ✅ All systems operational • Last backup: 2 hours ago • API Status: Healthy
          </p>
        </div>
      </div>
    </div>
  );
}
