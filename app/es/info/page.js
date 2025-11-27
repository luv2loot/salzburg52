"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollReveal from "@/components/animations/ScrollReveal";

const LANG = "es";

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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
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
            Acerca de Mí
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Salzburg52
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Mi marca profesional y portfolio como aprendiz en hospitalidad de lujo. 
            Compartiendo mi trayectoria hacia la excelencia en el servicio.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ContentCard({ title, children, index = 0 }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ 
        duration: reducedMotion ? 0 : 0.6, 
        delay: reducedMotion ? 0 : index * 0.1, 
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

          {title && (
            <h3 style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              marginBottom: "1rem",
              lineHeight: 1.3
            }}>
              {title}
            </h3>
          )}

          <div style={{
            color: "var(--color-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            flexGrow: 1
          }}>
            {children}
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

function PhilosophySection() {
  const reducedMotion = useReducedMotion();
  
  const philosophyItems = [
    {
      title: "Escucha Atenta",
      description: "Escucha atenta y respuestas reflexivas a las necesidades de los huéspedes"
    },
    {
      title: "Comunicación Clara",
      description: "Comunicación clara y entrega organizada de información"
    },
    {
      title: "Compostura Elegante",
      description: "Mantener la compostura y elegancia en todas las situaciones"
    },
    {
      title: "Interacciones Honestas",
      description: "Interacciones honestas y corteses en lugar de formalidades superficiales"
    }
  ];

  return (
    <section className="app-shell" style={{ marginTop: "1rem", marginBottom: "2rem", position: "relative" }}>
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
          Filosofía Profesional
        </motion.span>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Mis Principios Fundamentales
        </h2>
        <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
          Los valores que guían mi enfoque hacia la excelencia en hospitalidad.
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
          <ContentCard key={index} title={item.title} index={index}>
            <p style={{ margin: 0 }}>{item.description}</p>
          </ContentCard>
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
          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1.25rem" }}>
            Acerca de Salzburg52
          </h2>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Salzburg52 es mi marca profesional y portfolio como aprendiz en HYPERION Hotel Salzburg. 
            Este espacio comparte mi trayectoria desarrollando experiencia en hospitalidad profesional, 
            combinando aprendizaje práctico con conocimientos sobre excelencia en el servicio y 
            auténtico conocimiento de Salzburgo.
          </p>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>
            Mi formación se construye a través del trabajo en recepción del HYPERION Hotel Salzburg, 
            donde aprendo la importancia de la atención al detalle, el profesionalismo sereno y 
            el cuidado genuino para crear experiencias memorables para los huéspedes.
          </p>
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
          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1.25rem" }}>
            Mi Enfoque
          </h2>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>
            Creo en la prestación de servicios estructurados combinada con una cálida 
            hospitalidad. Cada interacción con los huéspedes es una oportunidad para aplicar 
            lo aprendido y mostrar el encanto de Salzburgo manteniendo estándares profesionales.
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
          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1.25rem" }}>
            Mi Trayectoria en HYPERION
          </h2>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Mi aprendizaje en HYPERION Hotel Salzburg ha sido transformador—desde aprender los fundamentos de las operaciones de recepción hasta desarrollar una profunda comprensión de la hospitalidad de lujo. Cada día trae nuevas oportunidades para crecer y perfeccionar mis habilidades.
          </p>
          <motion.a
            href={`/${LANG}/journey`}
            className="glass-button-primary"
            whileHover={reducedMotion ? {} : { scale: 1.03, y: -4 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Saber más
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
      <motion.div
        className="surface"
        style={{
          padding: "2.5rem",
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </motion.div>

          <h2 style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            marginBottom: "1.25rem"
          }}>
            Conecta Conmigo
          </h2>

          <p style={{
            color: "var(--color-muted)",
            lineHeight: 1.7
          }}>
            Instagram:{" "}
            <motion.a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
              whileHover={reducedMotion ? {} : { color: "var(--primary)" }}
              style={{ transition: "color 0.2s ease" }}
            >
              @am.rsbgg
            </motion.a>
            <br />
            Email:{" "}
            <motion.a 
              href="mailto:info@salzburg52.com"
              whileHover={reducedMotion ? {} : { color: "var(--primary)" }}
              style={{ transition: "color 0.2s ease" }}
            >
              info@salzburg52.com
            </motion.a>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default function EsInfoPage() {
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
