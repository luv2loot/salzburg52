"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "en";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  
  return reducedMotion;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function FloatingOrb({ size, color, blur, top, left, right, bottom, delay = 0, duration = 20 }) {
  const reducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={reducedMotion ? { opacity: 0.3 } : {
        opacity: [0.2, 0.4, 0.2],
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

function SectionDivider() {
  const reducedMotion = useReducedMotion();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        height: "2px",
        background: "linear-gradient(90deg, transparent, var(--primary), var(--secondary), var(--primary), transparent)",
        margin: "3rem auto",
        maxWidth: "300px",
        transformOrigin: "center",
        borderRadius: "1px"
      }}
    />
  );
}

function TiltCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouse = (e) => {
    if (reducedMotion || !ref.current) return;
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

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        ...style
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
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

function InfoHero() {
  const reducedMotion = useReducedMotion();
  
  return (
    <section className="app-shell hero-root" style={{ position: "relative", overflow: "hidden" }}>
      <FloatingOrb size={400} color="rgba(37, 99, 235, 0.12)" blur={100} top="-15%" left="-10%" delay={0} duration={25} />
      <FloatingOrb size={300} color="rgba(139, 92, 246, 0.1)" blur={80} top="50%" right="-8%" delay={3} duration={22} />
      <FloatingOrb size={200} color="rgba(236, 72, 153, 0.08)" blur={60} bottom="-10%" left="20%" delay={5} duration={28} />
      
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-gradient-bg" />

        <motion.div
          className="hero-orb hero-orb-1"
          animate={reducedMotion ? {} : { y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          animate={reducedMotion ? {} : { y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.span
            variants={itemVariants}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.1))",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "1rem"
            }}
          >
            About Me
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            About Salzburg52
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            My professional brand and portfolio as an apprentice at HYPERION Hotel Salzburg. 
            A journey of developing expertise in professional hospitality.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PhilosophyCard({ item, index }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isIconHovered, setIsIconHovered] = useState(false);

  const icons = [
    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>,
    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>,
    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>,
    <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ 
        duration: reducedMotion ? 0 : 0.6, 
        delay: reducedMotion ? 0 : index * 0.12, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <TiltCard style={{ height: "100%", position: "relative" }}>
        <motion.div
          className="surface"
          style={{
            padding: "1.75rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden"
          }}
          whileHover={reducedMotion ? {} : { 
            boxShadow: "0 25px 50px rgba(37, 99, 235, 0.15)",
            borderColor: "rgba(37, 99, 235, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent-pink))",
              transformOrigin: "left"
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.3 + index * 0.1 }}
          />

          <motion.div
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(139, 92, 246, 0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              marginBottom: "1rem",
              border: "1px solid rgba(37, 99, 235, 0.15)"
            }}
            animate={reducedMotion ? {} : {
              scale: isIconHovered ? 1.1 : 1,
              rotate: isIconHovered ? 5 : 0,
              boxShadow: isIconHovered 
                ? "0 8px 25px rgba(37, 99, 235, 0.25)" 
                : "0 4px 12px rgba(37, 99, 235, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={reducedMotion ? {} : {
                scale: isIconHovered ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.4 }}
            >
              {icons[index % icons.length]}
            </motion.div>
          </motion.div>

          <p style={{
            color: "var(--color-text)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            flexGrow: 1
          }}>
            {item}
          </p>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

function PhilosophySection({ philosophyItems }) {
  const reducedMotion = useReducedMotion();
  
  return (
    <section className="app-shell" style={{ marginTop: "1rem", marginBottom: "2rem", position: "relative" }}>
      <FloatingOrb size={250} color="rgba(37, 99, 235, 0.08)" blur={80} top="20%" left="-5%" delay={2} duration={30} />
      <FloatingOrb size={200} color="rgba(139, 92, 246, 0.06)" blur={60} bottom="10%" right="-3%" delay={4} duration={25} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}
      >
        <motion.span 
          style={{
            display: "inline-block",
            padding: "0.4rem 1rem",
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08))",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: "1rem"
          }}
          whileHover={reducedMotion ? {} : { scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Core Values
        </motion.span>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Professional Philosophy
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
          The principles that guide my approach to hospitality excellence.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.25rem",
        position: "relative",
        zIndex: 1
      }}>
        {philosophyItems.map((item, index) => (
          <PhilosophyCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      style={{ marginBottom: "2rem" }}
    >
      <motion.div 
        className="surface" 
        style={{ 
          padding: "2.5rem", 
          position: "relative", 
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(139, 92, 246, 0.02))"
        }}
        whileHover={reducedMotion ? {} : {
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.1)"
        }}
      >
        <motion.div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent-pink))",
            transformOrigin: "left"
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={itemVariants} style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1.25rem" }}>
            My Story
          </motion.h2>
          <motion.p variants={itemVariants} style={{ lineHeight: 1.7, marginBottom: "1rem", color: "var(--color-text)" }}>
            Salzburg52 is my professional brand and portfolio as an apprentice at HYPERION Hotel Salzburg. 
            This space shares my journey developing expertise in professional hospitality, combining hands-on 
            learning with insights into service excellence and authentic Salzburg knowledge.
          </motion.p>
          <motion.p variants={itemVariants} style={{ lineHeight: 1.7, color: "var(--color-muted)" }}>
            My foundation is built through front office work at HYPERION Hotel Salzburg, 
            where I'm learning the importance of attention to detail, calm professionalism, 
            and genuine care in creating memorable guest experiences.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function ApproachSection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      style={{ marginBottom: "2rem" }}
    >
      <motion.div
        className="surface"
        style={{
          padding: "2.5rem",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(236, 72, 153, 0.02))",
          position: "relative",
          overflow: "hidden"
        }}
        whileHover={reducedMotion ? {} : {
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.08)"
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "150px",
            height: "3px",
            background: "linear-gradient(90deg, transparent, var(--secondary), var(--accent-pink), var(--secondary), transparent)",
            borderRadius: "2px"
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.5 }}
        >
          <motion.div
            animate={reducedMotion ? {} : { 
              y: [0, -5, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: "var(--secondary)", opacity: 0.6, marginBottom: "1.5rem" }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </motion.div>

          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem" }}>My Approach</h2>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            maxWidth: "600px",
            margin: "0 auto",
            color: "var(--color-text)"
          }}>
            I believe in structured service delivery combined with warm hospitality. 
            Every guest interaction is an opportunity to apply what I've learned and 
            showcase Salzburg's charm while maintaining professional standards.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function JourneySection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      style={{ marginBottom: "2rem" }}
    >
      <motion.div 
        className="surface" 
        style={{ padding: "2.5rem", position: "relative", overflow: "hidden" }}
        whileHover={reducedMotion ? {} : {
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.1)"
        }}
      >
        <motion.div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent-pink))",
            transformOrigin: "left"
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.6 }}
        >
          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem" }}>
            My Journey at HYPERION
          </h2>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "600px" }}>
            My apprenticeship at HYPERION Hotel Salzburg has been transformative—from learning the fundamentals 
            of front office operations to developing a deep understanding of luxury hospitality. Each day brings 
            new opportunities to grow and refine my skills.
          </p>
          <motion.a
            href={`/${LANG}/journey`}
            className="glass-button-primary"
            whileHover={reducedMotion ? {} : { scale: 1.03, y: -4 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Learn more
            <motion.span
              animate={reducedMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function ConnectSection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      style={{ marginBottom: "2rem" }}
    >
      <motion.div 
        className="surface" 
        style={{ 
          padding: "2.5rem", 
          position: "relative", 
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(37, 99, 235, 0.02))"
        }}
        whileHover={reducedMotion ? {} : {
          boxShadow: "0 20px 40px rgba(236, 72, 153, 0.08)"
        }}
      >
        <motion.div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--accent-pink), var(--secondary), var(--primary))",
            transformOrigin: "left"
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.6 }}
        >
          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem" }}>
            Connect With Me
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <motion.a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.75rem",
                color: "var(--color-text)",
                textDecoration: "none",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                background: "rgba(37, 99, 235, 0.05)",
                border: "1px solid rgba(37, 99, 235, 0.1)",
                width: "fit-content"
              }}
              whileHover={reducedMotion ? {} : { 
                scale: 1.02, 
                x: 5,
                background: "rgba(37, 99, 235, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @am.rsbgg
            </motion.a>
            <motion.a
              href="mailto:info@salzburg52.com"
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.75rem",
                color: "var(--color-text)",
                textDecoration: "none",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                background: "rgba(139, 92, 246, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.1)",
                width: "fit-content"
              }}
              whileHover={reducedMotion ? {} : { 
                scale: 1.02, 
                x: 5,
                background: "rgba(139, 92, 246, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@salzburg52.com
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default function EnInfoPage() {
  const philosophyItems = [
    "Attentive listening and thoughtful responses to guest needs",
    "Clear communication and organized information delivery",
    "Maintaining composure and elegance in all situations",
    "Honest, courteous interactions over superficial pleasantries"
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main>
        <InfoHero />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ApproachSection />
        <SectionDivider />
        <PhilosophySection philosophyItems={philosophyItems} />
        <SectionDivider />
        <JourneySection />
        <SectionDivider />
        <ConnectSection />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
