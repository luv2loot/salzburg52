"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  radius = 100,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength
      });
    }
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      style={{ display: "inline-block" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MagneticLink({
  children,
  href,
  className = "",
  strength = 0.4,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setPosition({
      x: (clientX - centerX) * strength,
      y: (clientY - centerY) * strength
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      style={{ display: "inline-block" }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function GlowButton({ children, className = "", onClick, href }) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`glow-button ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.875rem 1.75rem",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "#fff",
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        overflow: "hidden",
        textDecoration: "none"
      }}
    >
      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
          opacity: 0
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <motion.span
        style={{
          position: "absolute",
          inset: "-2px",
          background: "linear-gradient(135deg, var(--primary), var(--secondary))",
          borderRadius: "14px",
          filter: "blur(15px)",
          opacity: 0,
          zIndex: -1
        }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
    </Component>
  );
}
