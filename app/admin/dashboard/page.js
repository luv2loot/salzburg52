"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [underConstruction, setUnderConstruction] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    setMounted(true);

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
    switch(key) {
      case "underConstructionMode":
        setUnderConstruction(value);
        break;
      case "demoMode":
        setDemoMode(value);
        break;
      case "maintenanceMode":
        setMaintenanceMode(value);
        break;
      case "analyticsEnabled":
        setAnalyticsEnabled(value);
        break;
    }
  };

  if (!mounted) return null;

  const stats = [
    { label: "Site Status", value: underConstruction ? "🚧 Under Construction" : "✅ Live", color: "rgb(37, 99, 235)" },
    { label: "Visitors Today", value: "2,847", color: "rgb(139, 92, 246)" },
    { label: "Page Views", value: "9,432", color: "rgb(236, 72, 153)" },
    { label: "Avg. Session", value: "4m 23s", color: "rgb(6, 182, 212)" },
  ];

  const features = [
    { key: "underConstructionMode", label: "Under Construction", icon: "🚧", value: underConstruction, desc: "Show maintenance page to all visitors" },
    { key: "demoMode", label: "Demo Mode", icon: "🎬", value: demoMode, desc: "Enable demo content and features" },
    { key: "maintenanceMode", label: "Maintenance", icon: "🔧", value: maintenanceMode, desc: "Limited access for admins only" },
    { key: "analyticsEnabled", label: "Analytics", icon: "📊", value: analyticsEnabled, desc: "Track visitor behavior and metrics" },
  ];

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
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Header */}
        <motion.div
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
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              style={{
                padding: "1.5rem",
                background: "rgba(15, 15, 25, 0.6)",
                border: `1px solid rgba(37, 99, 235, 0.2)`,
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
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
        </motion.div>

        {/* Feature Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            {features.map((feature) => (
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
                    {feature.icon} {feature.label}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
                <motion.button
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
                  <motion.div
                    animate={{ x: feature.value ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "2px",
                      width: "24px",
                      height: "24px",
                      background: feature.value ? "#2563EB" : "#6b7280",
                      borderRadius: "12px",
                    }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Link href="/admin/settings" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "1.5rem",
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.1))",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "12px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "2rem", margin: "0 0 0.5rem 0" }}>⚙️</p>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
                Settings
              </p>
            </motion.div>
          </Link>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: "1.5rem",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "2rem", margin: "0 0 0.5rem 0" }}>🗑️</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
              Clear Cache
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              padding: "1.5rem",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(6, 182, 212, 0.1))",
              border: "1px solid rgba(236, 72, 153, 0.3)",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "2rem", margin: "0 0 0.5rem 0" }}>📊</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f8f9fa", margin: 0 }}>
              View Analytics
            </p>
          </motion.div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
