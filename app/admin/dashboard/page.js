"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [underConstruction, setUnderConstruction] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");

    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    setAdminUsername(username || "Admin");
    const stored = localStorage.getItem("underConstructionMode") === "true";
    setUnderConstruction(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminUsername");
    window.location.href = "/admin/login";
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
        style={{ maxWidth: "900px", margin: "0 auto" }}
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
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#f8f9fa",
                margin: 0,
              }}
            >
              Welcome back, {adminUsername}
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#9ca3af",
                margin: "0.5rem 0 0 0",
              }}
            >
              Manage your Salzburg52 site
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
              cursor: "pointer",
            }}
          >
            Sign Out
          </motion.button>
        </motion.div>

        {/* Main Content */}
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
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#f8f9fa",
              marginBottom: "1.5rem",
            }}
          >
            Site Status
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            {/* Status Card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              style={{
                padding: "1.5rem",
                background: "rgba(37, 99, 235, 0.1)",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Site Status
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#60a5fa",
                  margin: 0,
                }}
              >
                {underConstruction ? "🚧 Under Construction" : "✅ Live"}
              </p>
            </motion.div>

            {/* Status Card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              style={{
                padding: "1.5rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Admin Panel
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#d8b4fe",
                  margin: 0,
                }}
              >
                Ready
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Settings Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: "2rem" }}
        >
          <Link href="/admin/settings" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "1.5rem",
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.1))",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#f8f9fa",
                    margin: 0,
                  }}
                >
                  Site Settings
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#9ca3af",
                    margin: "0.5rem 0 0 0",
                  }}
                >
                  Toggle under construction mode
                </p>
              </div>
              <span style={{ fontSize: "1.5rem" }}>⚙️</span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
