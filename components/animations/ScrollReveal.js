"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export function ScrollReveal({ 
  children, 
  direction = "left",
  delay = 0,
  duration = 0.6,
  distance = 60,
  threshold = 0.2,
  once = false,
  className = ""
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      default:
        return { x: -distance, y: 0 };
    }
  };

  const initial = getInitialPosition();

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        x: initial.x, 
        y: initial.y 
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : { 
        opacity: 0, 
        x: initial.x, 
        y: initial.y 
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: isInView ? delay : 0,
        duration
      }}
      style={{
        willChange: "transform, opacity"
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
