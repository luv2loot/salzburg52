"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { t } from "@/lib/translations";

const zoneIcons = {
  journey: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  salzburg: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M9 8h1"/>
      <path d="M9 12h1"/>
      <path d="M9 16h1"/>
      <path d="M14 8h1"/>
      <path d="M14 12h1"/>
      <path d="M14 16h1"/>
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
    </svg>
  ),
  playground: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  hospitality: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4"/>
      <path d="M12 18v4"/>
      <path d="m4.93 4.93 2.83 2.83"/>
      <path d="m16.24 16.24 2.83 2.83"/>
      <path d="M2 12h4"/>
      <path d="M18 12h4"/>
      <path d="m4.93 19.07 2.83-2.83"/>
      <path d="m16.24 7.76 2.83-2.83"/>
    </svg>
  ),
  info: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  )
};

const zoneConfigs = [
  { id: "journey", hrefPath: "journey", isPrimary: true, position: { x: 0, y: 0, z: 60, rotateX: 0, rotateY: 0 } },
  { id: "salzburg", hrefPath: "salzburg", isPrimary: false, position: { x: -180, y: -80, z: 20, rotateX: 8, rotateY: -12 } },
  { id: "playground", hrefPath: "playground", isPrimary: false, position: { x: 190, y: -60, z: 30, rotateX: 5, rotateY: 15 } },
  { id: "hospitality", hrefPath: "hospitality-lab", isPrimary: false, position: { x: -160, y: 100, z: 10, rotateX: -10, rotateY: -8 } },
  { id: "info", hrefPath: "info", isPrimary: false, position: { x: 170, y: 90, z: 15, rotateX: -8, rotateY: 10 } }
];

function getZones(lang) {
  return zoneConfigs.map(config => ({
    id: config.id,
    title: t(`floatingCardHub.zones.${config.id}.title`, lang),
    description: t(`floatingCardHub.zones.${config.id}.description`, lang),
    href: `/${lang}/${config.hrefPath}`,
    icon: zoneIcons[config.id],
    isPrimary: config.isPrimary,
    position: config.position
  }));
}

const floatingVariants = {
  animate: (custom) => ({
    y: [0, custom.yOffset, 0],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const cardEntranceVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.6,
    y: 40,
    rotateX: 15
  },
  visible: (custom) => ({
    opacity: 1, 
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { 
      duration: 0.7, 
      delay: custom.delay,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

function Card({ zone, mouseX, mouseY, containerRef, lang, index, isInView }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  
  const magneticStrength = zone.isPrimary ? 0.15 : 0.2;
  const magneticRadius = zone.isPrimary ? 180 : 140;
  
  const magneticSpringConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const magneticX = useSpring(localMouseX, magneticSpringConfig);
  const magneticY = useSpring(localMouseY, magneticSpringConfig);
  
  const tiltSpringConfig = { stiffness: 200, damping: 25 };
  const tiltX = useSpring(useTransform(localMouseY, [-1, 1], [7, -7]), tiltSpringConfig);
  const tiltY = useSpring(useTransform(localMouseX, [-1, 1], [-7, 7]), tiltSpringConfig);
  
  const parallaxStrength = zone.isPrimary ? 0.02 : 0.035;
  const floatDuration = zone.isPrimary ? 6 : 4 + Math.random() * 2;
  const floatOffset = zone.isPrimary ? -8 : -12 - Math.random() * 8;
  
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  
  const cardRotateX = useSpring(
    useTransform(mouseY, (y) => -y * parallaxStrength + zone.position.rotateX),
    springConfig
  );
  const cardRotateY = useSpring(
    useTransform(mouseX, (x) => x * parallaxStrength + zone.position.rotateY),
    springConfig
  );
  
  const cardX = useSpring(
    useTransform(mouseX, (x) => x * (zone.isPrimary ? 0.03 : 0.05)),
    springConfig
  );
  const cardY = useSpring(
    useTransform(mouseY, (y) => y * (zone.isPrimary ? 0.03 : 0.05)),
    springConfig
  );

  const combinedRotateX = useTransform([cardRotateX, tiltX], ([parallax, tilt]) => 
    isHovered ? parallax + tilt : parallax
  );
  const combinedRotateY = useTransform([cardRotateY, tiltY], ([parallax, tilt]) => 
    isHovered ? parallax + tilt : parallax
  );

  const handleCardMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    if (distance < magneticRadius) {
      const factor = 1 - (distance / magneticRadius);
      localMouseX.set(distanceX * magneticStrength * factor);
      localMouseY.set(distanceY * magneticStrength * factor);
    }
    
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;
    glowX.set(normalizedX * 100);
    glowY.set(normalizedY * 100);
    
    const tiltNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const tiltNormY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    localMouseX.set(tiltNormX);
    localMouseY.set(tiltNormY);
  }, [magneticRadius, magneticStrength, localMouseX, localMouseY, glowX, glowY]);

  const handleCardMouseLeave = useCallback(() => {
    localMouseX.set(0);
    localMouseY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  }, [localMouseX, localMouseY, glowX, glowY]);

  const handleCardMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const cardSize = zone.isPrimary 
    ? { width: "220px", height: "260px" }
    : { width: "160px", height: "180px" };

  const staggerDelay = zone.isPrimary ? 0.1 : 0.2 + index * 0.1;

  return (
    <motion.div
      ref={cardRef}
      className="floating-card-wrapper"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: useTransform([cardX, magneticX], ([cx, mx]) => cx + (isHovered ? mx * 8 : 0)),
        y: useTransform([cardY, magneticY], ([cy, my]) => cy + (isHovered ? my * 8 : 0)),
        rotateX: combinedRotateX,
        rotateY: combinedRotateY,
        translateX: "-50%",
        translateY: "-50%",
        marginLeft: zone.position.x,
        marginTop: zone.position.y,
        zIndex: isHovered ? 20 : (zone.isPrimary ? 10 : 5),
        transformStyle: "preserve-3d",
      }}
      custom={{ yOffset: floatOffset, duration: floatDuration }}
      variants={floatingVariants}
      animate="animate"
      onMouseMove={handleCardMouseMove}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
    >
      <Link href={zone.href} style={{ textDecoration: "none" }}>
        <motion.div
          className="glass-card floating-card"
          style={{
            ...cardSize,
            padding: zone.isPrimary ? "2rem 1.5rem" : "1.25rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            transform: `translateZ(${zone.position.z}px)`,
            transformStyle: "preserve-3d",
            position: "relative",
            overflow: "hidden",
          }}
          variants={cardEntranceVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={{ delay: staggerDelay }}
          whileHover={{
            scale: 1.08,
            z: zone.position.z + 40,
            boxShadow: zone.isPrimary 
              ? "0 30px 80px rgba(37, 99, 235, 0.35), 0 0 60px rgba(139, 92, 246, 0.2)"
              : "0 25px 60px rgba(37, 99, 235, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)",
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="card-glow-static"
            style={{
              position: "absolute",
              inset: 0,
              background: zone.isPrimary
                ? "radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)"
                : "radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.1) 0%, transparent 60%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          
          <motion.div
            className="card-glow-dynamic"
            style={{
              position: "absolute",
              inset: 0,
              background: useTransform([glowX, glowY], ([x, y]) => 
                `radial-gradient(circle at ${x}% ${y}%, rgba(37, 99, 235, 0.25) 0%, rgba(139, 92, 246, 0.15) 30%, transparent 70%)`
              ),
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          
          <motion.div
            className="card-shine"
            style={{
              position: "absolute",
              inset: 0,
              background: useTransform([glowX, glowY], ([x, y]) => 
                `linear-gradient(${135 + (x - 50) * 0.5}deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)`
              ),
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          
          <motion.div
            className="card-icon"
            style={{
              width: zone.isPrimary ? "56px" : "44px",
              height: zone.isPrimary ? "56px" : "44px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              marginBottom: zone.isPrimary ? "1.25rem" : "0.75rem",
              position: "relative",
              zIndex: 2,
            }}
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              scale: 1.1,
              transition: { duration: 0.5 }
            }}
          >
            {zone.icon}
          </motion.div>
          
          <h3 
            style={{
              margin: 0,
              fontSize: zone.isPrimary ? "1.3rem" : "1rem",
              fontWeight: 700,
              color: "var(--color-text)",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            {zone.title}
          </h3>
          
          <p 
            style={{
              margin: 0,
              fontSize: zone.isPrimary ? "0.9rem" : "0.75rem",
              color: "var(--color-muted)",
              lineHeight: 1.4,
              position: "relative",
              zIndex: 2,
            }}
          >
            {zone.description}
          </p>
          
          {zone.isPrimary && (
            <motion.div
              style={{
                marginTop: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--primary)",
                position: "relative",
                zIndex: 2,
              }}
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, x: 4 }}
            >
              {t("floatingCardHub.enter", lang)}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </motion.div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function FloatingCardHub({ lang = "en" }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const zones = getZones(lang);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const containerRotateX = useSpring(
    useTransform(mouseY, [-300, 300], [8, -8]),
    springConfig
  );
  const containerRotateY = useSpring(
    useTransform(mouseX, [-400, 400], [-8, 8]),
    springConfig
  );
  
  const ambientGlowX = useSpring(
    useTransform(mouseX, [-400, 400], [-30, 30]),
    { stiffness: 50, damping: 30 }
  );
  const ambientGlowY = useSpring(
    useTransform(mouseY, [-300, 300], [-20, 20]),
    { stiffness: 50, damping: 30 }
  );

  return (
    <section className="floating-card-hub-section" ref={sectionRef}>
      <motion.div
        className="app-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("floatingCardHub.exploreBadge", lang)}
          </motion.span>
          <motion.h2 
            style={{ 
              fontSize: "clamp(1.5rem, 4vw, 2rem)", 
              fontWeight: 700, 
              margin: 0,
              letterSpacing: "-0.03em"
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("floatingCardHub.yourDigitalWorld", lang)}
          </motion.h2>
          <motion.p 
            style={{ 
              color: "var(--color-muted)", 
              marginTop: "0.75rem",
              fontSize: "1rem",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("floatingCardHub.navigateExperiences", lang)}
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          className="floating-cards-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            height: "500px",
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          <motion.div
            className="cards-cluster"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              rotateX: containerRotateX,
              rotateY: containerRotateY,
            }}
          >
            {zones.map((zone, index) => (
              <Card
                key={zone.id}
                zone={zone}
                mouseX={mouseX}
                mouseY={mouseY}
                containerRef={containerRef}
                lang={lang}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="hub-ambient-glow"
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: 0,
              pointerEvents: "none",
              x: ambientGlowX,
              y: ambientGlowY,
            }}
          />
          
          <motion.div 
            className="hub-ambient-glow-secondary"
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 60%)",
              filter: "blur(40px)",
              zIndex: 0,
              pointerEvents: "none",
              x: useTransform(ambientGlowX, v => -v * 0.5),
              y: useTransform(ambientGlowY, v => -v * 0.5),
            }}
          />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .floating-card-hub-section {
          padding: 2rem 0 4rem;
          position: relative;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .floating-cards-container {
            height: 600px !important;
            transform: scale(0.7);
            transform-origin: center center;
          }
        }
        
        @media (max-width: 480px) {
          .floating-cards-container {
            height: 550px !important;
            transform: scale(0.55);
          }
        }
      `}</style>
    </section>
  );
}
