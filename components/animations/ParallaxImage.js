"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export function ParallaxImage({
  children,
  speed = 0.5,
  mouseParallax = true,
  mouseIntensity = 10,
  className = ""
}) {
  const ref = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * speed, 100 * speed]
  );

  const smoothParallaxY = useSpring(parallaxY, {
    stiffness: 100,
    damping: 30
  });

  const combinedY = useTransform(
    [smoothParallaxY, mouseYSpring],
    ([scroll, mouse]) => scroll + mouse
  );

  useEffect(() => {
    setIsMounted(true);
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mouseParallax || prefersReducedMotion || !isMounted) return;

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(deltaX * mouseIntensity);
      mouseY.set(deltaY * mouseIntensity);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseParallax, mouseIntensity, prefersReducedMotion, isMounted, mouseX, mouseY]);

  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: mouseParallax ? combinedY : smoothParallaxY,
        x: mouseParallax ? mouseXSpring : 0,
        willChange: "transform"
      }}
    >
      {children}
    </motion.div>
  );
}

export default ParallaxImage;
