"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminUnlock() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Authentication failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.email);
      localStorage.setItem("adminUsername", username);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Connection error. Try again.");
      setIsLoading(false);
    }
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(37, 99, 235, 0.2)",
          borderRadius: "24px",
          padding: "3rem 2.5rem",
          backdropFilter: "blur(10px)",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            🔐
          </motion.div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f9fafb", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
            Salzburg52 Admin
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            Secure authentication required
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#d1d5db", display: "block", marginBottom: "0.5rem" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={isLoading}
              autoFocus
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "12px",
                color: "#f9fafb",
                fontSize: "0.95rem",
                opacity: isLoading ? 0.5 : 1,
                cursor: isLoading ? "not-allowed" : "text",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#d1d5db", display: "block", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleLogin(e);
              }}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "12px",
                color: "#f9fafb",
                fontSize: "0.95rem",
                opacity: isLoading ? 0.5 : 1,
                cursor: isLoading ? "not-allowed" : "text",
              }}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "0.75rem",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                color: "#fca5a5",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              ❌ {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading || !username || !password}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "0.875rem 1.5rem",
              background: isLoading ? "rgba(37, 99, 235, 0.5)" : "rgba(37, 99, 235, 0.8)",
              border: "1px solid rgba(37, 99, 235, 0.5)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              marginTop: "0.5rem",
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p style={{ fontSize: "0.8rem", color: "#6b7280", textAlign: "center", marginTop: "2rem" }}>
          Session will expire on logout
        </p>
      </motion.div>

      <motion.div
        animate={{ x: [-50, 50, -50] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </motion.div>
  );
}
