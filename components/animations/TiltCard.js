"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({
  children,
  className = "",
  intensity = 10,
  scale = 1.02,
  perspective = 1000,
  style = {}
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
        ...style
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? scale : 1,
          transformStyle: "preserve-3d",
          transition: "scale 0.2s ease"
        }}
      >
        {children}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
              borderRadius: "inherit",
              pointerEvents: "none"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export function HoverRevealCard({
  children,
  hoverContent,
  className = "",
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style
      }}
    >
      {children}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          pointerEvents: isHovered ? "auto" : "none"
        }}
      >
        {hoverContent}
      </motion.div>
    </motion.div>
  );
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
  style = {}
}) {
  return (
    <motion.div
      className={className}
      whileHover={hover ? { y: -6, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "relative",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        overflow: "hidden",
        ...style
      }}
    >
      {children}
      {glow && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: "-1px",
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(139, 92, 246, 0.2))",
            borderRadius: "inherit",
            filter: "blur(20px)",
            zIndex: -1
          }}
        />
      )}
    </motion.div>
  );
}

export function SpotlightCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          x: useTransform(mouseX, v => v - 150),
          y: useTransform(mouseY, v => v - 150)
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
}
