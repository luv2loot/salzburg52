"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [underConstruction, setUnderConstruction] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  const [generatedTime, setGeneratedTime] = useState(null);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");
    const email = localStorage.getItem("adminEmail");

    if (!token) {
      window.location.href = "/admin/unlock";
      return;
    }

    setAdminUsername(username || "Admin");
    setAdminEmail(email || "");
    
    const stored = localStorage.getItem("underConstructionMode") === "true";
    setUnderConstruction(stored);
  }, []);

  const handleGeneratePassword = async () => {
    try {
      const response = await fetch("/api/admin/generate-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error generating password");
        return;
      }

      setNewPassword(data.password);
      setShowPassword(true);
      setPasswordGenerated(true);
      setGeneratedTime(new Date().toLocaleTimeString());
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminUsername");
    window.location.href = "/admin/unlock";
  };

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        {/* Header */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f9fafb", marginBottom: "0.5rem" }}>
              Dashboard
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
              Welcome back, <strong>{adminUsername}</strong>
            </p>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.65rem 1.25rem",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              color: "#fca5a5",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          {/* Site Status Card */}
          <motion.div variants={itemVariants} style={{ gridColumn: "span 1" }}>
            <div
              style={{
                background: underConstruction
                  ? "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)",
                border: underConstruction ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "16px",
                padding: "1.5rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem" }}>Site Status</p>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f9fafb" }}>
                    {underConstruction ? "🚧 Under Construction" : "🟢 Live"}
                  </h3>
                </div>
                <div style={{ fontSize: "2.5rem" }}>{underConstruction ? "🔴" : "✅"}</div>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                {underConstruction ? "Website is hidden from visitors" : "Website is publicly visible"}
              </p>
            </div>
          </motion.div>

          {/* Admin Email Card */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "16px",
                padding: "1.5rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem" }}>Admin Email</p>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#93c5fd", wordBreak: "break-all" }}>
                📧 {adminEmail}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.75rem" }}>
                Passwords sent here
              </p>
            </div>
          </motion.div>

          {/* Session Info Card */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "16px",
                padding: "1.5rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem" }}>Session</p>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#d8b4fe" }}>🔐 Active</h3>
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.75rem" }}>
                Expires on logout
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Controls Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Generate Password Card */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "16px",
                padding: "2rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f9fafb", marginBottom: "0.5rem" }}>
                  🔑 Generate New Password
                </h2>
                <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                  Create a new login password
                </p>
              </div>

              <motion.button
                onClick={handleGeneratePassword}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "rgba(37, 99, 235, 0.2)",
                  border: "1px solid rgba(37, 99, 235, 0.3)",
                  borderRadius: "12px",
                  color: "#93c5fd",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Generate Password
              </motion.button>

              {showPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "#86efac", marginBottom: "0.5rem", fontWeight: 600 }}>
                    ✅ New Password Generated {generatedTime && `at ${generatedTime}`}
                  </div>
                  <div
                    style={{
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      borderRadius: "6px",
                      fontFamily: "monospace",
                      fontSize: "1rem",
                      wordBreak: "break-all",
                      userSelect: "all",
                      color: "#86efac",
                      cursor: "pointer",
                    }}
                    onClick={() => navigator.clipboard.writeText(newPassword)}
                  >
                    {newPassword}
                  </div>
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#4ade80" }}>
                    💡 Click to copy • Expires on logout
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Site Control Card */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "16px",
                padding: "2rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f9fafb", marginBottom: "0.5rem" }}>
                  🌐 Site Control
                </h2>
                <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                  Toggle website visibility
                </p>
              </div>

              <Link href="/admin/settings">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "1rem",
                    background: underConstruction
                      ? "rgba(34, 197, 94, 0.2)"
                      : "rgba(239, 68, 68, 0.2)",
                    border: underConstruction
                      ? "1px solid rgba(34, 197, 94, 0.3)"
                      : "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: "12px",
                    color: underConstruction ? "#86efac" : "#fca5a5",
                    fontWeight: 700,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  {underConstruction ? "✅ Turn Website ON" : "❌ Put Under Construction"}
                </motion.div>
              </Link>

              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "1rem" }}>
                Current: <strong>{underConstruction ? "Under Construction" : "Live"}</strong>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
