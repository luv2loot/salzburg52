"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: "999px",
    border: "1px solid rgba(148, 163, 184, 0.9)",
    background: "radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 0.9), rgba(148, 163, 184, 0.15))",
    pointerEvents: "none",
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
    transition: "transform 80ms ease-out, opacity 150ms ease-out",
    mixBlendMode: "screen",
    zIndex: 50,
    opacity: visible ? 1 : 0
  };

  // Optional: hide on small screens
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  if (isTouch) return null;

  return <div style={baseStyle} aria-hidden="true" />;
}
