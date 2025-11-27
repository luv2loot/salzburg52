"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", username);
      localStorage.setItem("adminEmail", "admin@salzburg52.com");
      
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 300);
    } catch (err) {
      setError("Connection error. Please try again.");
      setLoading(false);
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
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "3rem 2rem",
          background: "rgba(15, 15, 25, 0.8)",
          border: "1px solid rgba(37, 99, 235, 0.2)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            background: "linear-gradient(135deg, #2563EB, #8B5CF6)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1.5rem",
            textAlign: "center",
            letterSpacing: "-2px",
          }}
        >
          S·52
        </motion.div>

        {/* Title */}
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#f8f9fa",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Admin Panel
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#9ca3af",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Salzburg52 Administration
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Username */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#e0e7ff",
                marginBottom: "0.5rem",
              }}
            >
              Username
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="adms52"
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "8px",
                color: "#f8f9fa",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(37, 99, 235, 0.6)";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(37, 99, 235, 0.3)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#e0e7ff",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  paddingRight: "2.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(37, 99, 235, 0.3)",
                  borderRadius: "8px",
                  color: "#f8f9fa",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(37, 99, 235, 0.6)";
                  e.target.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(37, 99, 235, 0.3)";
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  padding: "0.5rem",
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </motion.button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "0.875rem 1rem",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "8px",
                color: "#fca5a5",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "1rem",
              background: "linear-gradient(135deg, #2563EB, #8B5CF6)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Footer */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "#6b7280",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          🔒 Secure Admin Access
        </p>
      </motion.div>
    </motion.div>
  );
}
