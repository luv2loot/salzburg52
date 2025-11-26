"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Logo({ size = 40, showText = true, className = "", variant = "default" }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const sheenX = useSpring(useTransform(mouseX, [-50, 50], [-100, 200]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`logo-container ${className}`}
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.75rem",
        cursor: "pointer"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
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
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="logoGradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="logoGradientSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="sheenGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <clipPath id="logoClip">
              <path d="M8 12C8 9.79086 9.79086 8 12 8H36C38.2091 8 40 9.79086 40 12V36C40 38.2091 38.2091 40 36 40H12C9.79086 40 8 38.2091 8 36V12Z" />
            </clipPath>
            <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <motion.rect
            x="6"
            y="6"
            width="36"
            height="36"
            rx="10"
            fill="url(#logoGradientPrimary)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          
          <motion.rect
            x="6"
            y="6"
            width="36"
            height="36"
            rx="10"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />

          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <text
              x="14"
              y="29"
              fill="white"
              fontSize="15"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              letterSpacing="-0.5"
            >
              S
            </text>
            
            <motion.circle
              cx="22"
              cy="24"
              r="1.5"
              fill="rgba(255,255,255,0.8)"
              animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            />
            
            <text
              x="26"
              y="29"
              fill="white"
              fontSize="15"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              letterSpacing="-0.5"
            >
              52
            </text>
          </motion.g>

          <motion.rect
            x="6"
            y="6"
            width="36"
            height="36"
            rx="10"
            fill="url(#sheenGradient)"
            clipPath="url(#logoClip)"
            style={{ 
              x: sheenX,
              opacity: isHovered ? 0.7 : 0
            }}
            transition={{ opacity: { duration: 0.3 } }}
          />
        </svg>
        
        <motion.div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(124, 58, 237, 0.3), rgba(236, 72, 153, 0.2))",
            filter: "blur(12px)",
            opacity: 0,
            zIndex: -1,
          }}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {showText && (
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <motion.span
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: isHovered 
                ? "linear-gradient(135deg, #2563EB, #7C3AED, #EC4899)"
                : "var(--color-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: isHovered ? "transparent" : "var(--color-text)",
              backgroundClip: "text",
              transition: "all 0.3s ease"
            }}
          >
            Salzburg52
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}

export function LogoMark({ size = 32, animated = true }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ cursor: "pointer" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="markGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10"
          fill="url(#markGradient)"
        />
        
        <rect
          x="6"
          y="6"
          width="36"
          height="36"
          rx="10"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        <text
          x="14"
          y="29"
          fill="white"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
        >
          S
        </text>
        
        <circle cx="22" cy="24" r="1.5" fill="rgba(255,255,255,0.8)" />
        
        <text
          x="26"
          y="29"
          fill="white"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
        >
          52
        </text>
      </svg>
    </motion.div>
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
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <linearGradient id="animLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <motion.stop
            offset="0%"
            animate={{ stopColor: ["#2563EB", "#7C3AED", "#EC4899", "#2563EB"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.stop
            offset="100%"
            animate={{ stopColor: ["#EC4899", "#2563EB", "#7C3AED", "#EC4899"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </linearGradient>
      </defs>
      
      <motion.rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="10"
        fill="url(#animLogoGradient)"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(37, 99, 235, 0.5)",
            "0 0 40px rgba(124, 58, 237, 0.5)",
            "0 0 20px rgba(236, 72, 153, 0.5)",
            "0 0 20px rgba(37, 99, 235, 0.5)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <text x="14" y="29" fill="white" fontSize="15" fontWeight="800" fontFamily="system-ui">S</text>
        <motion.circle
          cx="22"
          cy="24"
          r="1.5"
          fill="white"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="26" y="29" fill="white" fontSize="15" fontWeight="800" fontFamily="system-ui">52</text>
      </motion.g>
    </motion.svg>
  );
}
