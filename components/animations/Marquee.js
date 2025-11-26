"use client";

import { motion } from "framer-motion";

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = ""
}) {
  const baseVelocity = direction === "left" ? -speed : speed;

  return (
    <div
      className={`marquee-container ${className}`}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex",
        flexWrap: "nowrap"
      }}
    >
      <motion.div
        className="marquee-content"
        animate={{ x: direction === "left" ? [0, -1000] : [-1000, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "2rem"
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export function TextMarquee({
  text,
  separator = "•",
  speed = 25,
  direction = "left",
  className = "",
  textClassName = ""
}) {
  const items = Array(8).fill(null);

  return (
    <div
      className={`text-marquee ${className}`}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "1rem 0"
      }}
    >
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "2rem"
        }}
      >
        {items.map((_, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "2rem" }}>
            <span className={textClassName} style={{ display: "inline-block" }}>{text}</span>
            <span style={{ opacity: 0.4 }}>{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ServiceMarquee({ items, speed = 35, className = "" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`service-marquee ${className}`}
      style={{
        overflow: "hidden",
        padding: "0.75rem 0",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)"
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-25%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "3rem"
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--color-text)",
              whiteSpace: "nowrap"
            }}
          >
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--primary)"
            }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
