"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const showcaseItems = [
  {
    image: "/images/luxury_hotel_lobby_elegance.png",
    title: "Luxury Spaces",
    description: "Learning the art of elegant hospitality at HYPERION Hotel",
    extraInfo: "Creating memorable guest experiences in sophisticated environments",
  },
  {
    image: "/images/salzburg_cityscape_sunset_view.png",
    title: "Salzburg Beauty",
    description: "Sharing the enchanting charm of historic Salzburg with guests",
    extraInfo: "A city of music, culture, and timeless Alpine elegance",
  },
  {
    image: "/images/professional_hospitality_service.png",
    title: "Professional Expertise",
    description: "Developing excellence in hospitality service and care",
    extraInfo: "Attention to detail in every guest interaction",
  },
  {
    image: "/images/fine_dining_experience.png",
    title: "Refined Standards",
    description: "Understanding premium hospitality through daily practice",
    extraInfo: "Elevating service quality through continuous improvement",
  },
];

function ShowcaseCard({ item, idx }) {
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
          <Image
            src={item.image}
            alt={item.title}
            className="showcase-image-premium"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
          />
          
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
            <span className="learn-more-text">Learn More</span>
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

export default function Showcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="showcase-root-premium">
      <div className="app-shell">
        <motion.div
          className="showcase-header-premium"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            className="showcase-label"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience Excellence
          </motion.span>
          <h2 className="showcase-title-premium">My Journey at HYPERION Hotel Salzburg</h2>
          <p className="showcase-subtitle-premium">
            Developing professional expertise in hospitality excellence
          </p>
        </motion.div>

        <motion.div
          className="showcase-grid-premium"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {showcaseItems.map((item, idx) => (
            <ShowcaseCard key={idx} item={item} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
