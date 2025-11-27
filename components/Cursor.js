"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const handleMove = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!mounted) return null;

  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    borderRadius: "999px",
    border: "2px solid rgba(255, 255, 255, 0.9)",
    background:
      "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(200, 200, 200, 0.3))",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
    pointerEvents: "none",
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
    zIndex: 9999,
    opacity: visible ? 1 : 0
  };

  return <div style={baseStyle} aria-hidden="true" />;
}
