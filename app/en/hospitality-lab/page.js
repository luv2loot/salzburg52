"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "en";

const principles = [
  {
    id: 1,
    title: "The Art of First Impressions",
    description: "The first 30 seconds of any interaction set the tone for everything that follows. A genuine smile, eye contact, and undivided attention communicate more than any rehearsed greeting ever could. Excellence isn't about perfection — it's about presence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Making Guests Feel Seen",
    description: "Every guest carries their own story, their own reasons for being here. The best hospitality professionals learn to read between the lines — noticing the small details that reveal what someone truly needs, often before they know it themselves.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Handling Difficult Situations with Grace",
    description: "Challenges are inevitable in hospitality. What defines a professional isn't the absence of problems, but the calm confidence with which they're resolved. Every complaint is an opportunity to demonstrate what we truly value: the guest's experience above all.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "The Details That Matter",
    description: "Luxury isn't always about grandeur. Sometimes it's remembering how a returning guest takes their coffee, or noticing when someone looks lost before they ask for directions. These small acts of attention create memories that last far longer than any amenity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Building Genuine Connections",
    description: "Behind every check-in is a human being with hopes for their stay. The difference between good service and memorable service lies in authenticity. When we care genuinely — not because we're trained to, but because we choose to — guests feel the difference.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Lessons from HYPERION",
    description: "Working at HYPERION Hotel Salzburg has taught me that true hospitality is a team effort. Every department, every colleague contributes to the guest experience. The front desk may be the face, but the heart of a hotel beats in every corner.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  }
];

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

function LabHero() {
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
            Professional Insights
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Hospitality Lab
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Thoughts on service excellence. Lessons learned through experience, observation, 
            and a deep commitment to the craft of hospitality.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
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

function PrincipleCard({ principle, index }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isIconHovered, setIsIconHovered] = useState(false);

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
            padding: "2rem",
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
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(139, 92, 246, 0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              marginBottom: "1.25rem",
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
              {principle.icon}
            </motion.div>
          </motion.div>

          <h3 style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            marginBottom: "0.75rem",
            lineHeight: 1.3
          }}>
            {principle.title}
          </h3>

          <p style={{
            color: "var(--color-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            flexGrow: 1
          }}>
            {principle.description}
          </p>

          <motion.div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--color-border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--color-muted)"
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: reducedMotion ? 0 : 0.4 + index * 0.1, duration: reducedMotion ? 0 : 0.4 }}
          >
            <motion.span 
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), var(--secondary))"
              }}
              animate={reducedMotion ? {} : { 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Principle {index + 1} of {principles.length}
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

function PrinciplesSection() {
  const reducedMotion = useReducedMotion();
  
  return (
    <section className="app-shell" style={{ marginTop: "1rem", marginBottom: "3rem", position: "relative" }}>
      <FloatingOrb size={250} color="rgba(37, 99, 235, 0.08)" blur={80} top="20%" left="-5%" delay={2} duration={30} />
      <FloatingOrb size={200} color="rgba(139, 92, 246, 0.06)" blur={60} bottom="10%" right="-3%" delay={4} duration={25} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        style={{ textAlign: "center", marginBottom: "2.5rem", position: "relative", zIndex: 1 }}
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
          Core Principles
        </motion.span>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          The Foundations of Excellence
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
          Six principles that guide my approach to hospitality, learned through practice and reflection.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem",
        position: "relative",
        zIndex: 1
      }}>
        {principles.map((principle, index) => (
          <PrincipleCard key={principle.id} principle={principle} index={index} />
        ))}
      </div>
    </section>
  );
}

function QuoteSection() {
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
          padding: "3rem 2.5rem",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(139, 92, 246, 0.02))",
          position: "relative",
          overflow: "hidden"
        }}
        whileHover={reducedMotion ? {} : {
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.08)"
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
            background: "linear-gradient(90deg, transparent, var(--primary), var(--secondary), var(--primary), transparent)",
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
              style={{ color: "var(--primary)", opacity: 0.6, marginBottom: "1.5rem" }}
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
          </motion.div>

          <p style={{
            fontSize: "1.4rem",
            fontStyle: "italic",
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 1.5rem",
            color: "var(--color-text)"
          }}>
            True hospitality is not about impressing people with what you have, 
            but about making them feel valued for who they are.
          </p>

          <p style={{
            color: "var(--color-muted)",
            fontSize: "0.9rem"
          }}>
            — A guiding philosophy
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function ClosingSection() {
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
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem" }}>
            The Learning Never Stops
          </h3>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "600px" }}>
            These principles aren't rigid rules — they're living ideas that evolve with each interaction, 
            each challenge, and each moment of growth. The hospitality lab is always open for new lessons.
          </p>
          <motion.a
            href={`/${LANG}`}
            className="glass-button-primary"
            whileHover={reducedMotion ? {} : { scale: 1.03, y: -4 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Back to Home
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

export default function HospitalityLabPage() {
  return (
    <>
      <Header lang={LANG} />
      <main>
        <LabHero />
        <SectionDivider />
        <PrinciplesSection />
        <SectionDivider />
        <QuoteSection />
        <SectionDivider />
        <ClosingSection />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
