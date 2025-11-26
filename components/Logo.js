"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo({ size = 40, showText = true, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`logo-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          style={{
            position: "relative",
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="sheenGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <clipPath id="logoClipPath">
                <rect x="4" y="4" width="40" height="40" rx="12" />
              </clipPath>
            </defs>

            <rect
              x="4"
              y="4"
              width="40"
              height="40"
              rx="12"
              fill="url(#logoGradient)"
            />

            <rect
              x="4"
              y="4"
              width="40"
              height="40"
              rx="12"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />

            <text
              x="24"
              y="29"
              fill="white"
              fontSize="14"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              textAnchor="middle"
              letterSpacing="-0.3"
            >
              S·52
            </text>

            <motion.rect
              x="-40"
              y="4"
              width="40"
              height="40"
              fill="url(#sheenGradient)"
              clipPath="url(#logoClipPath)"
              animate={{
                x: isHovered ? 88 : -40,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
              }}
            />
          </svg>

          <motion.div
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: 15,
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))",
              filter: "blur(10px)",
              zIndex: -1,
              pointerEvents: "none",
            }}
            animate={{
              opacity: isHovered ? 0.7 : 0,
            }}
            transition={{ duration: 0.25 }}
          />
        </div>

        {showText && (
          <motion.span
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              whiteSpace: "nowrap",
            }}
            animate={{
              color: isHovered ? "#8B5CF6" : "var(--color-text)",
            }}
            transition={{ duration: 0.25 }}
          >
            Salzburg52
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

export function LogoMark({ size = 32 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "inline-flex",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          transformOrigin: "center",
          backfaceVisibility: "hidden",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="markGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="12"
            fill="url(#markGradient)"
          />

          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="12"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />

          <text
            x="24"
            y="29"
            fill="white"
            fontSize="14"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
            letterSpacing="-0.3"
          >
            S·52
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

export function LogoAnimated({ size = 48 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="animLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <motion.stop
            offset="0%"
            animate={{ stopColor: ["#3B82F6", "#8B5CF6", "#3B82F6"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.stop
            offset="100%"
            animate={{ stopColor: ["#8B5CF6", "#3B82F6", "#8B5CF6"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </linearGradient>
      </defs>

      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="12"
        fill="url(#animLogoGradient)"
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <text
          x="24"
          y="29"
          fill="white"
          fontSize="14"
          fontWeight="700"
          fontFamily="system-ui"
          textAnchor="middle"
          letterSpacing="-0.3"
        >
          S·52
        </text>
      </motion.g>
    </motion.svg>
  );
}
