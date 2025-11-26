"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingOrb({
  size = 200,
  color = "var(--primary)",
  blur = 80,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 20
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        top,
        left,
        right,
        bottom
      }}
    />
  );
}

export function FloatingShape({
  type = "circle",
  size = 60,
  color = "var(--primary)",
  top,
  left,
  right,
  bottom,
  delay = 0,
  rotate = true
}) {
  const shapes = {
    circle: { borderRadius: "50%" },
    square: { borderRadius: "8px" },
    diamond: { borderRadius: "4px", transform: "rotate(45deg)" },
    triangle: {
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      borderRadius: 0
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.1, 0.2, 0.1],
        scale: [1, 1.05, 1],
        rotate: rotate ? [0, 360] : 0,
        y: [0, -20, 0]
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear",
        rotate: { duration: 30, repeat: Infinity, ease: "linear" }
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        border: `2px solid ${color}`,
        background: "transparent",
        pointerEvents: "none",
        zIndex: 0,
        top,
        left,
        right,
        bottom,
        ...shapes[type]
      }}
    />
  );
}

export function GradientBlob({ className = "" }) {
  return (
    <div className={`gradient-blob-container ${className}`} style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0
    }}>
      <FloatingOrb size={400} color="rgba(37, 99, 235, 0.15)" blur={100} top="-10%" left="-5%" delay={0} />
      <FloatingOrb size={300} color="rgba(139, 92, 246, 0.12)" blur={80} top="40%" right="-10%" delay={2} />
      <FloatingOrb size={250} color="rgba(236, 72, 153, 0.1)" blur={70} bottom="-5%" left="30%" delay={4} />
    </div>
  );
}

export function ParticleField({ count = 30 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0
    }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -100],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--primary)"
          }}
        />
      ))}
    </div>
  );
}

export function MouseFollowGradient() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
        x: useTransform(springX, v => v - 300),
        y: useTransform(springY, v => v - 300)
      }}
    />
  );
}

export function GridPattern({ className = "" }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 0,
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)"
      }}
    />
  );
}
