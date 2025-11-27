"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if authenticated
    const token = localStorage.getItem("adminToken");
    const email = localStorage.getItem("adminEmail");
    
    if (!token) {
      window.location.href = "/admin/unlock";
      return;
    }
    
    setAdminEmail(email || "");
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
      alert(`✅ New password sent to ${adminEmail} and displayed below`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.location.href = "/admin/unlock";
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
              Admin Dashboard
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Manage Under Construction mode</p>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px",
              color: "#fca5a5",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Control Cards */}
        <div style={{ display: "grid", gap: "1rem" }}>
          {/* Site Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#f9fafb",
                  marginBottom: "0.5rem",
                }}
              >
                🌐 Site Status
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Toggle Under Construction mode</p>
            </div>

            <Link href="/admin/settings">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "1rem",
                  background: "rgba(37, 99, 235, 0.1)",
                  border: "1px solid rgba(37, 99, 235, 0.3)",
                  borderRadius: "12px",
                  color: "#93c5fd",
                  textAlign: "center",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                Go to Settings →
              </motion.div>
            </Link>
          </motion.div>

          {/* Password Management Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#f9fafb",
                  marginBottom: "0.5rem",
                }}
              >
                🔑 Generate New Password
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                Creates a new admin password and sends it to {adminEmail}
              </p>
            </div>

            <motion.button
              onClick={handleGeneratePassword}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "0.875rem",
                background: "rgba(37, 99, 235, 0.2)",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "12px",
                color: "#93c5fd",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "1rem",
                transition: "all 0.2s",
              }}
            >
              Generate & Send Password
            </motion.button>

            {showPassword && newPassword && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "1rem",
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  borderRadius: "8px",
                  color: "#86efac",
                }}
              >
                <div style={{ fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: 600 }}>
                  ✅ New Password Generated:
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
                  }}
                >
                  {newPassword}
                </div>
                <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#4ade80" }}>
                  💡 This password expires when you log out
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              borderRadius: "16px",
              padding: "1.5rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#f9fafb",
                marginBottom: "1rem",
              }}
            >
              ℹ️ How It Works
            </h2>
            <ul
              style={{
                color: "#9ca3af",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                paddingLeft: "1.5rem",
              }}
            >
              <li>Each password is unique and changes every time you generate it</li>
              <li>Passwords are sent to {adminEmail}</li>
              <li>Passwords expire when you log out</li>
              <li>Only you can access this dashboard</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
