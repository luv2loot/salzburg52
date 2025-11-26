"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`marquee-container ${className}`}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        flexWrap: "nowrap"
      }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      <motion.div
        className="marquee-content"
        animate={{ x: direction === "left" ? [0, -1000] : [-1000, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isHovered ? speed * 2 : speed,
            ease: "linear"
          }
        }}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "2rem"
        }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function ServiceMarquee({ 
  items = [], 
  speed = 30, 
  direction = "left",
  pauseOnHover = true,
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(2000);
  
  useEffect(() => {
    if (marqueeRef.current) {
      const width = marqueeRef.current.scrollWidth / 4;
      if (width > 0) setContentWidth(width);
    }
  }, [items]);
  
  const duration = contentWidth / speed;
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div 
      className={`marquee-wrapper ${className}`}
      style={{
        overflow: "hidden",
        padding: "1.25rem 0",
        background: "linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.03), transparent)",
        position: "relative",
        borderTop: "1px solid rgba(37, 99, 235, 0.08)",
        borderBottom: "1px solid rgba(37, 99, 235, 0.08)",
      }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(90deg, var(--color-bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(-90deg, var(--color-bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      
      <motion.div
        ref={marqueeRef}
        style={{
          display: "flex",
          gap: "2.5rem",
          width: "fit-content",
        }}
        animate={{
          x: direction === "left" ? [0, -contentWidth] : [-contentWidth, 0],
        }}
        transition={{
          x: {
            duration: isHovered ? duration * 2 : duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, i) => (
          <motion.div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              whiteSpace: "nowrap",
            }}
          >
            <motion.span
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--color-text)",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
              whileHover={{ 
                color: "var(--primary)", 
                scale: 1.05,
              }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.span>
            <motion.span 
              style={{ 
                color: "var(--primary)", 
                opacity: 0.5,
                fontSize: "0.5rem",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              ◆
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function TextMarquee({ 
  text, 
  separator = "✦", 
  speed = 25,
  className = "",
  textClassName = "",
  size = "large"
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(3000);
  
  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.scrollWidth / 4;
      if (w > 0) setWidth(w);
    }
  }, [text]);
  
  const duration = width / speed;
  const repeatedContent = Array(10).fill(`${text} ${separator} `).join("");
  
  const fontSize = size === "large" ? "clamp(2.5rem, 8vw, 5rem)" : "clamp(1rem, 3vw, 1.5rem)";

  return (
    <div 
      className={`text-marquee-wrapper ${className}`}
      style={{
        overflow: "hidden",
        padding: size === "large" ? "2.5rem 0" : "1.5rem 0",
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "fit-content",
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: [0, -width],
          rotateX: isHovered ? 8 : 0,
          z: isHovered ? -50 : 0,
        }}
        transition={{
          x: {
            duration: isHovered ? duration * 1.5 : duration,
            repeat: Infinity,
            ease: "linear",
          },
          rotateX: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          z: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <motion.span
          className={textClassName}
          style={{
            fontSize,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, var(--color-text) 0%, var(--color-muted) 50%, var(--color-text) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.08,
            textTransform: "uppercase",
          }}
        >
          {repeatedContent}
        </motion.span>
      </motion.div>
    </div>
  );
}

export function PerspectiveMarquee({
  items = [],
  speed = 40,
  className = ""
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { stiffness: 200, damping: 30 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top - rect.height / 2;
    mouseY.set(y);
  };
  
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const contentWidth = items.length * 220;
  const duration = contentWidth / speed;

  return (
    <div
      className={`perspective-marquee ${className}`}
      style={{
        overflow: "hidden",
        padding: "2.5rem 0",
        perspective: "800px",
        perspectiveOrigin: "center center",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseY.set(0);
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "2rem",
          width: "fit-content",
          rotateX,
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: [0, -contentWidth],
        }}
        transition={{
          x: {
            duration: isHovered ? duration * 1.4 : duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, i) => (
          <motion.div
            key={i}
            style={{
              padding: "1rem 1.75rem",
              background: "rgba(37, 99, 235, 0.04)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              border: "1px solid rgba(37, 99, 235, 0.08)",
              whiteSpace: "nowrap",
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              z: 40,
              scale: 1.08,
              background: "rgba(37, 99, 235, 0.1)",
              borderColor: "rgba(37, 99, 235, 0.2)",
              boxShadow: "0 10px 40px rgba(37, 99, 235, 0.15)",
            }}
            transition={{ duration: 0.25 }}
          >
            <span style={{ 
              fontSize: "0.95rem", 
              fontWeight: 600,
              color: "var(--color-text)",
              letterSpacing: "0.01em",
            }}>
              {item}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function InfiniteSlider({
  children,
  speed = 30,
  direction = "left",
  className = ""
}) {
  const [contentWidth, setContentWidth] = useState(2000);
  const sliderRef = useRef(null);
  
  useEffect(() => {
    if (sliderRef.current) {
      const w = sliderRef.current.scrollWidth / 2;
      if (w > 0) setContentWidth(w);
    }
  }, [children]);
  
  const duration = contentWidth / speed;

  return (
    <div 
      className={`infinite-slider ${className}`}
      style={{ overflow: "hidden" }}
    >
      <motion.div
        ref={sliderRef}
        style={{
          display: "flex",
          width: "fit-content",
        }}
        animate={{
          x: direction === "left" ? [0, -contentWidth] : [-contentWidth, 0],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
