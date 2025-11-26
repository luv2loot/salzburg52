"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Logo({ size = 40, showText = false, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`logo-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        style={{
          display: "inline-flex",
          alignItems: "center",
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          willChange: "transform",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
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
          <Image
            src="/images/logo.png"
            alt="Salzburg52"
            width={size}
            height={size}
            style={{
              objectFit: "contain",
              display: "block",
            }}
            priority
          />

          <motion.div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(168, 85, 247, 0.2))",
              filter: "blur(12px)",
              zIndex: -1,
              pointerEvents: "none",
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0,
              scale: isHovered ? 1.1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
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
              marginLeft: "0.25rem",
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
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Image
          src="/images/logo.png"
          alt="Salzburg52"
          width={size}
          height={size}
          style={{
            objectFit: "contain",
            display: "block",
          }}
        />
      </motion.div>
    </div>
  );
}

export function LogoAnimated({ size = 48 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "inline-block" }}
    >
      <Image
        src="/images/logo.png"
        alt="Salzburg52"
        width={size}
        height={size}
        style={{
          objectFit: "contain",
          display: "block",
        }}
      />
    </motion.div>
  );
}
