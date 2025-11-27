"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollReveal from "@/components/animations/ScrollReveal";

const LANG = "it";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  
  return isClient ? reducedMotion : false;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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
            Il Mio Profilo
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Chi Sono
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Benvenuti nel mio spazio professionale. Scopri il mio percorso nell'ospitalità 
            e la mia passione per l'eccellenza del servizio.
          </motion.p>
        </motion.div>
      </motion.div>
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
      style={{ marginBottom: "2rem", position: "relative" }}
    >
      <FloatingOrb size={250} color="rgba(37, 99, 235, 0.08)" blur={80} top="10%" left="-5%" delay={2} duration={30} />
      
      <TiltCard style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="surface"
          style={{
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden"
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

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h2 variants={itemVariants} style={{ marginTop: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              Salzburg52
            </motion.h2>
            <motion.p variants={itemVariants} style={{ lineHeight: 1.7, color: "var(--color-muted)" }}>
              Salzburg52 è il mio marchio professionale e portfolio come apprendista presso 
              l'HYPERION Hotel Salisburgo. Questo spazio condivide il mio percorso nello sviluppo 
              dell'esperienza nell'ospitalità professionale, combinando apprendimento pratico 
              con approfondimenti sull'eccellenza del servizio e la conoscenza autentica di Salisburgo.
            </motion.p>
            <motion.p variants={itemVariants} style={{ lineHeight: 1.7, color: "var(--color-muted)", marginBottom: 0 }}>
              La mia formazione si costruisce attraverso il lavoro alla reception dell'HYPERION Hotel Salisburgo, 
              dove imparo l'importanza dell'attenzione ai dettagli, del professionalismo sereno 
              e della cura autentica per creare esperienze memorabili per gli ospiti.
            </motion.p>
          </motion.div>
        </motion.div>
      </TiltCard>
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
      style={{ marginBottom: "2rem", position: "relative" }}
    >
      <FloatingOrb size={200} color="rgba(139, 92, 246, 0.06)" blur={60} bottom="10%" right="-3%" delay={4} duration={25} />
      
      <TiltCard style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="surface"
          style={{
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden"
          }}
          whileHover={reducedMotion ? {} : {
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.1)"
          }}
        >
          <motion.div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, var(--secondary), var(--primary), var(--accent-pink))",
              transformOrigin: "left"
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
          />

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h2 variants={itemVariants} style={{ marginTop: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              Il Mio Approccio
            </motion.h2>
            <motion.p variants={itemVariants} style={{ lineHeight: 1.7, color: "var(--color-muted)", marginBottom: 0 }}>
              Credo in un'erogazione di servizi strutturata combinata con una calorosa 
              ospitalità. Ogni interazione con gli ospiti è un'opportunità per applicare 
              ciò che ho imparato e mostrare il fascino di Salisburgo mantenendo standard professionali.
            </motion.p>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.section>
  );
}

function PhilosophySection() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const philosophyItems = [
    {
      text: "Ascolto attento e risposte ponderate alle esigenze degli ospiti",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )
    },
    {
      text: "Comunicazione chiara e trasmissione organizzata delle informazioni",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    },
    {
      text: "Mantenimento della compostezza ed eleganza in ogni situazione",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      text: "Interazioni oneste e cortesi invece di gentilezze superficiali",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="app-shell"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      style={{ marginBottom: "2rem", position: "relative" }}
    >
      <FloatingOrb size={280} color="rgba(236, 72, 153, 0.06)" blur={70} top="20%" left="-8%" delay={1} duration={28} />
      
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
          Principi Fondamentali
        </motion.span>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Filosofia Professionale
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
          I valori che guidano il mio approccio all'ospitalità ogni giorno.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        position: "relative",
        zIndex: 1
      }}>
        {philosophyItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ 
              duration: reducedMotion ? 0 : 0.6, 
              delay: reducedMotion ? 0 : index * 0.12, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <TiltCard style={{ height: "100%" }}>
              <motion.div
                className="surface"
                style={{
                  padding: "1.5rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  position: "relative",
                  overflow: "hidden"
                }}
                whileHover={reducedMotion ? {} : { 
                  boxShadow: "0 25px 50px rgba(37, 99, 235, 0.15)",
                  borderColor: "rgba(37, 99, 235, 0.3)"
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
                  transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.3 + index * 0.1 }}
                />
                
                <motion.div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(139, 92, 246, 0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    flexShrink: 0,
                    border: "1px solid rgba(37, 99, 235, 0.15)"
                  }}
                  whileHover={reducedMotion ? {} : {
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 8px 25px rgba(37, 99, 235, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {item.icon}
                </motion.div>
                
                <p style={{
                  color: "var(--color-muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {item.text}
                </p>
              </motion.div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
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
      style={{ marginBottom: "2rem", position: "relative" }}
    >
      <FloatingOrb size={220} color="rgba(37, 99, 235, 0.07)" blur={70} bottom="20%" right="-5%" delay={3} duration={26} />
      
      <TiltCard style={{ position: "relative", zIndex: 1 }}>
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

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h2 variants={itemVariants} style={{ marginTop: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              Il Mio Percorso all'HYPERION
            </motion.h2>
            <motion.p variants={itemVariants} style={{ lineHeight: 1.7, color: "var(--color-muted)", marginBottom: "1.5rem" }}>
              Il mio apprendistato all'HYPERION Hotel Salisburgo è stato trasformativo—dall'apprendimento dei fondamenti delle operazioni di reception allo sviluppo di una profonda comprensione dell'ospitalità di lusso. Ogni giorno porta nuove opportunità per crescere e perfezionare le mie competenze.
            </motion.p>
            <motion.a
              href={`/${LANG}/journey`}
              className="glass-button-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              whileHover={reducedMotion ? {} : { scale: 1.03, y: -4 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              Scopri di più
              <motion.span
                animate={reducedMotion ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.section>
  );
}

function ContactSection() {
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
      <TiltCard>
        <motion.div
          className="surface"
          style={{
            padding: "2.5rem",
            textAlign: "center",
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

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.div
              variants={itemVariants}
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </motion.div>

            <motion.h2 variants={itemVariants} style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
              Contattami
            </motion.h2>
            <motion.div variants={itemVariants} style={{ lineHeight: 1.8, color: "var(--color-muted)" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                Instagram:{" "}
                <motion.a
                  href="https://www.instagram.com/am.rsbgg"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reducedMotion ? {} : { color: "var(--primary)" }}
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  @am.rsbgg
                </motion.a>
              </p>
              <p style={{ margin: 0 }}>
                Email:{" "}
                <motion.a 
                  href="mailto:info@salzburg52.com"
                  whileHover={reducedMotion ? {} : { color: "var(--primary)" }}
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  info@salzburg52.com
                </motion.a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.section>
  );
}

export default function ItInfoPage() {
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
        <PhilosophySection />
        <SectionDivider />
        <JourneySection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
