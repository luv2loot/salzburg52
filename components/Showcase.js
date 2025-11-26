"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { t } from "@/lib/translations";

const getShowcaseItems = (lang) => [
  {
    image: "/images/luxury_hotel_lobby_elegance.png",
    title: t("showcase.items.luxurySpaces.title", lang),
    description: t("showcase.items.luxurySpaces.description", lang),
    extraInfo: t("showcase.items.luxurySpaces.extraInfo", lang),
  },
  {
    image: "/images/salzburg_cityscape_sunset_view.png",
    title: t("showcase.items.salzburgBeauty.title", lang),
    description: t("showcase.items.salzburgBeauty.description", lang),
    extraInfo: t("showcase.items.salzburgBeauty.extraInfo", lang),
  },
  {
    image: "/images/professional_hospitality_service.png",
    title: t("showcase.items.professionalExpertise.title", lang),
    description: t("showcase.items.professionalExpertise.description", lang),
    extraInfo: t("showcase.items.professionalExpertise.extraInfo", lang),
  },
  {
    image: "/images/fine_dining_experience.png",
    title: t("showcase.items.refinedStandards.title", lang),
    description: t("showcase.items.refinedStandards.description", lang),
    extraInfo: t("showcase.items.refinedStandards.extraInfo", lang),
  },
];

function ShowcaseCard({ item, idx, lang }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="showcase-card-wrapper"
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className={`showcase-card-premium${isHovered ? " is-hovered" : ""}`}
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -12 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="showcase-shimmer-border" />
        
        <div className="showcase-image-container-premium">
          <motion.div
            style={{ width: "100%", height: "100%", position: "relative" }}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={item.image}
              alt={item.title}
              className="showcase-image-premium"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
          
          <motion.div
            className="showcase-overlay-premium"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="showcase-extra-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
          >
            <span className="showcase-extra-text">{item.extraInfo}</span>
          </motion.div>
          
          <motion.div
            className="showcase-shine-effect"
            animate={{
              opacity: isHovered ? [0, 0.5, 0] : 0,
              x: isHovered ? ["-100%", "200%"] : "-100%",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <motion.div
          className="showcase-content-premium"
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="showcase-card-title-premium"
            animate={{
              color: isHovered ? "var(--primary)" : "var(--color-text)",
            }}
            transition={{ duration: 0.2 }}
          >
            {item.title}
          </motion.h3>
          <p className="showcase-card-description-premium">{item.description}</p>
          
          <motion.div
            className="showcase-learn-more"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.25, delay: isHovered ? 0.15 : 0 }}
          >
            <span className="learn-more-text">{t("showcase.learnMore", lang)}</span>
            <motion.span 
              className="learn-more-arrow"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Showcase({ lang = "en" }) {
  const showcaseItems = getShowcaseItems(lang);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="showcase-root-premium"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="app-shell">
        <motion.div
          className="showcase-header-premium"
          initial={{ opacity: 0, y: -25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <motion.span 
            className="showcase-label"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("showcase.label", lang)}
          </motion.span>
          <h2 className="showcase-title-premium">{t("showcase.title", lang)}</h2>
          <p className="showcase-subtitle-premium">
            {t("showcase.subtitle", lang)}
          </p>
        </motion.div>

        <motion.div
          className="showcase-grid-premium"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {showcaseItems.map((item, idx) => (
            <ShowcaseCard key={idx} item={item} idx={idx} lang={lang} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
