"use client";

import { motion } from "framer-motion";

export default function Logo({ size = 32, showText = true, className = "" }) {
  return (
    <div className={`logo-container ${className}`} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary, #2563EB)" />
            <stop offset="100%" stopColor="var(--secondary, #8B5CF6)" />
          </linearGradient>
        </defs>
        
        <motion.rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          fill="url(#logoGradient)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.text
          x="20"
          y="26"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          52
        </motion.text>
      </motion.svg>
      
      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--color-text)",
            letterSpacing: "-0.01em"
          }}
        >
          Salzburg52
        </motion.span>
      )}
    </div>
  );
}

export function LogoMark({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary, #2563EB)" />
          <stop offset="100%" stopColor="var(--secondary, #8B5CF6)" />
        </linearGradient>
      </defs>
      
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="8"
        fill="url(#logoMarkGradient)"
      />
      
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        52
      </text>
    </svg>
  );
}
