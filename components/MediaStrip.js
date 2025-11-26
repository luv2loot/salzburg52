"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const HIGHLIGHTS = [
  {
    id: "guests",
    number: "2000+",
    label: "Guests Welcomed",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    id: "languages",
    number: "5",
    label: "Languages Spoken",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  {
    id: "experience",
    number: "3+",
    label: "Years of Training",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  },
  {
    id: "rating",
    number: "5★",
    label: "Service Standard",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

function AnimatedNumber({ value, inView }) {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    if (!inView) return;
    
    const numericPart = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");
    const target = parseInt(numericPart, 10);
    
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }
    
    let current = 0;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current) + suffix);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, inView]);
  
  return <span>{displayValue}</span>;
}

export default function MediaStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section className="app-shell" style={{ padding: "3rem 0" }}>
      <motion.div
        ref={ref}
        className="surface"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
          borderRadius: "24px",
          background: "linear-gradient(135deg, var(--color-bg-elevated) 0%, var(--color-bg) 100%)",
          border: "1px solid var(--color-border)"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "0.4rem 1rem",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.1))",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "0.75rem"
            }}
          >
            At a Glance
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 600,
              color: "var(--color-text)",
              margin: 0
            }}
          >
            Apprenticeship Highlights
          </h2>
        </motion.div>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem"
          }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {HIGHLIGHTS.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "2rem 1.5rem",
                borderRadius: "20px",
                background: "linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)",
                border: "1px solid rgba(37, 99, 235, 0.15)",
                cursor: "default"
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(139, 92, 246, 0.15))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "var(--primary)"
                }}
              >
                {item.icon}
              </div>
              
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem"
                }}
              >
                <AnimatedNumber value={item.number} inView={isInView} />
              </div>
              
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-muted)",
                  fontWeight: 500
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
