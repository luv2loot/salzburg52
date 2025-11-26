"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function SplitText({ children, className = "", delay = 0 }) {
  if (!children || typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }
  
  const words = children.split(" ");
  
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span 
          key={i} 
          style={{ 
            display: "inline-block", 
            overflow: "hidden", 
            marginRight: "0.25em",
            verticalAlign: "top"
          }}
        >
          <motion.span
            style={{ 
              display: "inline-block",
              willChange: "transform"
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function GradientCanvas() {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    const colors = [
      { r: 37, g: 99, b: 235 },
      { r: 124, g: 58, b: 237 },
      { r: 236, g: 72, b: 153 },
      { r: 6, g: 182, b: 212 },
    ];
    
    const blobs = colors.map((color, i) => ({
      x: 0.2 + (i * 0.2),
      y: 0.3 + (i % 2) * 0.4,
      radius: 0.3 + Math.random() * 0.2,
      color,
      speed: 0.0005 + Math.random() * 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    
    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const mx = mouseX.get();
      const my = mouseY.get();
      
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      blobs.forEach((blob, i) => {
        const bx = blob.x + Math.sin(t * blob.speed * 100 + blob.phase) * 0.1 + (mx - 0.5) * 0.1;
        const by = blob.y + Math.cos(t * blob.speed * 80 + blob.phase) * 0.1 + (my - 0.5) * 0.1;
        
        const gradient = ctx.createRadialGradient(
          bx * window.innerWidth,
          by * window.innerHeight,
          0,
          bx * window.innerWidth,
          by * window.innerHeight,
          blob.radius * Math.min(window.innerWidth, window.innerHeight)
        );
        
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.4)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.1)`);
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

function FloatingOrb({ size, color, top, left, right, bottom, delay = 0, blur = 60 }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        top,
        left,
        right,
        bottom,
        zIndex: 1,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -30, 0],
        x: [0, 20, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: { duration: 15 + delay * 2, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 12 + delay * 2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

function GridOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        zIndex: 1,
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
      }}
    />
  );
}

function GrainOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.03,
        zIndex: 2,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
}

export default function Hero({ greeting, title = "", subtitle = "", accent = "", ctaText, ctaHref }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section 
      className="hero-section-cinematic" 
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, var(--color-bg) 0%, rgba(37, 99, 235, 0.03) 50%, var(--color-bg) 100%)",
          zIndex: 0,
        }}
      />

      {mounted && <GradientCanvas />}
      <GridOverlay />
      <GrainOverlay />
      
      <FloatingOrb size={400} color="rgba(37, 99, 235, 0.15)" top="-10%" left="-5%" delay={0} blur={80} />
      <FloatingOrb size={300} color="rgba(124, 58, 237, 0.12)" top="20%" right="-10%" delay={0.5} blur={70} />
      <FloatingOrb size={250} color="rgba(236, 72, 153, 0.1)" bottom="10%" left="20%" delay={1} blur={60} />
      <FloatingOrb size={200} color="rgba(6, 182, 212, 0.1)" bottom="30%" right="15%" delay={1.5} blur={50} />

      <motion.div
        className="hero-content-wrapper"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "900px",
          padding: "0 2rem",
          y,
          opacity: contentOpacity,
          scale: contentScale,
        }}
      >
        {greeting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <motion.span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.25rem",
                background: "rgba(37, 99, 235, 0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "999px",
                border: "1px solid rgba(37, 99, 235, 0.15)",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: "var(--primary)" }}
              >
                ✦
              </motion.span>
              {greeting}
            </motion.span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2.8rem, 8vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            color: "#0f172a",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            lineHeight: 1.7,
            color: "#64748b",
            maxWidth: "580px",
            margin: "0 auto 2.5rem",
            fontWeight: 400,
          }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {ctaText && ctaHref ? (
            <motion.a
              href={ctaHref}
              className="hero-cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, var(--primary), #7C3AED)",
                color: "white",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3)",
              }}
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 8px 30px rgba(37, 99, 235, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span style={{ position: "relative" }}>{ctaText}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          ) : (
            <motion.span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "rgba(37, 99, 235, 0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "999px",
                border: "1px solid rgba(37, 99, 235, 0.15)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "var(--primary)",
              }}
              whileHover={{ scale: 1.02, borderColor: "rgba(37, 99, 235, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {accent}
            </motion.span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              opacity: 0.5,
            }}
          >
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Scroll
            </span>
            <motion.div
              style={{
                width: "1px",
                height: "40px",
                background: "linear-gradient(to bottom, var(--color-muted), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
