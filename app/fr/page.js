"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import MediaStrip from "@/components/MediaStrip";
import Showcase from "@/components/Showcase";
import SnippetRefreshButton from "@/components/SnippetRefreshButton";
import FloatingCardHub from "@/components/FloatingCardHub";

import { getGreetingForTime, getHeroCopy } from "@/lib/copy";
import { getRandomSnippet } from "@/lib/quotes";

const LANG = "fr";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const featureIcons = {
  experience: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  insights: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  ),
  explore: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  )
};

const galleryImages = [
  { src: "/images/salzburg_austria_his_ea8bfaf1.jpg", alt: "Rues historiques de Salzbourg", label: "Rues Historiques" },
  { src: "/images/salzburg_austria_mou_7fa6ee31.jpg", alt: "Paysage de Salzbourg", label: "Vues Alpines" },
  { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Intérieur de l'hôtel", label: "Intérieur de Luxe" },
  { src: "/images/professional_hospita_96a18705.jpg", alt: "Hospitalité professionnelle", label: "Excellence du Service" }
];

function SectionDivider() {
  return (
    <motion.div 
      className="section-divider"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
        margin: "3rem auto",
        maxWidth: "200px",
        transformOrigin: "center"
      }}
    />
  );
}

function ParallaxImage({ src, alt, label, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="gallery-item"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        boxShadow: "0 8px 32px rgba(15, 23, 42, 0.12)",
        cursor: "pointer",
        position: "relative",
        background: "var(--color-bg-elevated)"
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 50px rgba(37, 99, 235, 0.2)",
        transition: { duration: 0.3 }
      }}
    >
      <motion.div style={{ y, scale, height: "100%", width: "100%" }}>
        <img 
          src={src} 
          alt={alt} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            transition: "transform 0.5s ease"
          }} 
        />
      </motion.div>
      <motion.div
        className="gallery-label"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5rem 1rem 1rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "0.02em"
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

function FeatureBadge({ icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.1))",
        border: "1px solid rgba(37, 99, 235, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--primary)",
        flexShrink: 0
      }}
    >
      {icon}
    </motion.div>
  );
}

export default function FrHomePage() {
  const [greeting, setGreeting] = useState("");
  const [snippet, setSnippet] = useState(null);

  const heroCopy = getHeroCopy(LANG);

  useEffect(() => {
    setGreeting(getGreetingForTime(LANG, new Date()));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const previousId = window.localStorage.getItem(SNIPPET_KEY) || undefined;
    const chosen = getRandomSnippet(LANG, { excludeId: previousId });
    if (chosen) {
      setSnippet(chosen);
      window.localStorage.setItem(SNIPPET_KEY, chosen.id);
    }
  }, []);

  const handleRefreshSnippet = () => {
    if (!snippet) return;
    if (typeof window === "undefined") return;

    const next = getRandomSnippet(LANG, { excludeId: snippet.id });
    if (next) {
      setSnippet(next);
      window.localStorage.setItem(SNIPPET_KEY, next.id);
    }
  };

  const featureItems = [
    { icon: featureIcons.experience, text: "Apprenez de l'expérience pratique du service d'hospitalité de luxe." },
    { icon: featureIcons.insights, text: "Découvrez des perspectives pratiques sur la création d'expériences mémorables pour les clients." },
    { icon: featureIcons.explore, text: "Explorez Salzbourg à travers la perspective de l'hospitalité professionnelle." }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main>
        <Hero
          greeting={greeting || getGreetingForTime(LANG, new Date())}
          title={heroCopy.title}
          subtitle={heroCopy.subtitle}
          accent={heroCopy.accent}
          lang={LANG}
        />

        <FloatingCardHub lang={LANG} />

        {snippet && (
          <motion.section 
            className="app-shell snippet-root"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className="surface snippet-inner">
              <div className="snippet-header">
                <p className="snippet-label text-muted">
                  {snippet.kind === "quote"
                    ? "Citation"
                    : snippet.kind === "fact"
                    ? "Fait intéressant"
                    : "Juste pour sourire"}
                </p>
                <SnippetRefreshButton onClick={handleRefreshSnippet} />
              </div>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </motion.section>
        )}

        <SectionDivider />

        <motion.section 
          className="app-shell feature-root"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <div className="surface feature-inner" style={{ padding: "2.5rem" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "0.5rem" }}
            >
              <span style={{
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
              }}>
                À Propos
              </span>
            </motion.div>
            <h2 className="feature-title" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Ma Trajectoire Professionnelle</h2>
            <p className="feature-text" style={{ marginBottom: "2rem", lineHeight: 1.8 }}>
              En tant qu'apprenti à l'HYPERION Hotel Salzbourg, je développe mon expertise en 
              hospitalité professionnelle tout en partageant des perspectives sur l'excellence du service et la connaissance locale.
            </p>
            <motion.ul 
              className="feature-list"
              style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.2rem" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featureItems.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={staggerItem}
                  style={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: "12px",
                    background: "rgba(37, 99, 235, 0.03)",
                    border: "1px solid rgba(37, 99, 235, 0.08)",
                    transition: "all 0.3s ease"
                  }}
                  whileHover={{ 
                    background: "rgba(37, 99, 235, 0.06)",
                    borderColor: "rgba(37, 99, 235, 0.15)",
                    x: 4
                  }}
                >
                  <FeatureBadge icon={item.icon} delay={index * 0.1} />
                  <span style={{ paddingTop: "0.6rem", lineHeight: 1.6 }}>{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        <SectionDivider />

        <Showcase />

        <SectionDivider />

        <motion.section 
          style={{ marginTop: "1rem", marginBottom: "3rem" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <div className="app-shell" style={{ padding: "0 2.2rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center", marginBottom: "2.5rem" }}
            >
              <span style={{
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
              }}>
                Galerie
              </span>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 600, margin: 0 }}>Salzbourg & Hospitalité</h2>
            </motion.div>
            <motion.div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
                gap: "1.5rem", 
                maxWidth: "1000px", 
                margin: "0 auto" 
              }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {galleryImages.map((image, index) => (
                <ParallaxImage 
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  label={image.label}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <MediaStrip />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
