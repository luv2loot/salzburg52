"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LogoAnimated } from "@/components/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050509 0%, #0b0b12 50%, #1a1a2e 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        cursor: "default",
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-10%",
          right: "-5%",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-15%",
          left: "-10%",
          filter: "blur(50px)",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            maxWidth: "1100px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              style={{
                marginBottom: "2rem",
              }}
            >
              <LogoAnimated size={120} />
            </motion.div>

            <motion.h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#f8f9fa",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              Welcome back Amir
            </motion.h1>

            <motion.p
              style={{
                fontSize: "1.1rem",
                color: "#9ca3af",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              Access your Salzburg52 portfolio management system.
            </motion.p>

            {/* Features List */}
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {["Real-time site management", "One-click settings control", "Secure access"].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "#9ca3af",
                    fontSize: "0.95rem",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2563EB, #8B5CF6)",
                    }}
                  />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              style={{
                padding: "3rem",
                background: "rgba(15, 15, 25, 0.6)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "24px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Form Title */}
              <motion.div
                style={{
                  marginBottom: "2.5rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f8f9fa",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Sign In
                </h2>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  Enter your admin credentials
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Username Field */}
                <motion.div
                  layout
                  style={{
                    position: "relative",
                  }}
                >
                  <motion.label
                    animate={{
                      y: focusedField === "username" || username ? -24 : 0,
                      fontSize: focusedField === "username" || username ? "0.8rem" : "0.9rem",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: focusedField === "username" || username ? "absolute" : "static",
                      left: "0",
                      color: focusedField === "username" ? "#93c5fd" : "#9ca3af",
                      fontWeight: 500,
                      pointerEvents: "none",
                      display: "block",
                      marginBottom: focusedField === "username" || username ? "0" : "0.5rem",
                    }}
                  >
                    Username
                  </motion.label>
                  <motion.input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=""
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      paddingTop: focusedField === "username" || username ? "1.2rem" : "1rem",
                      background: focusedField === "username" ? "rgba(37, 99, 235, 0.1)" : "rgba(255, 255, 255, 0.04)",
                      border: focusedField === "username" ? "1.5px solid rgba(37, 99, 235, 0.6)" : "1px solid rgba(37, 99, 235, 0.2)",
                      borderRadius: "12px",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  layout
                  style={{
                    position: "relative",
                  }}
                >
                  <motion.label
                    animate={{
                      y: focusedField === "password" || password ? -24 : 0,
                      fontSize: focusedField === "password" || password ? "0.8rem" : "0.9rem",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: focusedField === "password" || password ? "absolute" : "static",
                      left: "0",
                      color: focusedField === "password" ? "#93c5fd" : "#9ca3af",
                      fontWeight: 500,
                      pointerEvents: "none",
                      display: "block",
                      marginBottom: focusedField === "password" || password ? "0" : "0.5rem",
                    }}
                  >
                    Password
                  </motion.label>
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=""
                    whileFocus={{ scale: 1.01 }}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      paddingTop: focusedField === "password" || password ? "1.2rem" : "1rem",
                      background: focusedField === "password" ? "rgba(37, 99, 235, 0.1)" : "rgba(255, 255, 255, 0.04)",
                      border: focusedField === "password" ? "1.5px solid rgba(37, 99, 235, 0.6)" : "1px solid rgba(37, 99, 235, 0.2)",
                      borderRadius: "12px",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: "1rem",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      borderRadius: "12px",
                      color: "#fca5a5",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>⚠️</span>
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "1rem 1.5rem",
                    background: loading ? "rgba(37, 99, 235, 0.5)" : "linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    marginTop: "1rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)",
                  }}
                >
                  {loading ? (
                    <motion.div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: "4px",
                          height: "4px",
                          background: "#fff",
                          borderRadius: "50%",
                        }}
                      />
                      Signing in...
                    </motion.div>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(37, 99, 235, 0.1)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  🔒 Enterprise-grade security
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Responsive */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
