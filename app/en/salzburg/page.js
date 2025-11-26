"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "en";

const DAY_ACTIVITIES = [
  {
    id: "day-1",
    title: "Salzburg Old Town",
    description: "Historic UNESCO World Heritage walking tour through baroque architecture, charming squares, and centuries of history in every cobblestone.",
    tag: "Walk",
    image: "/images/salzburg_austria_his_ea8bfaf1.jpg"
  },
  {
    id: "day-2",
    title: "Mirabell Palace & Gardens",
    description: "Beautiful baroque gardens with geometric flowerbeds, fountains, and the famous Sound of Music filming location.",
    tag: "Walk",
    image: "/images/salzburg_austria_his_ddc72f4b.jpg"
  },
  {
    id: "day-3",
    title: "Mozart's Birthplace",
    description: "Museum in the iconic yellow townhouse where Wolfgang Amadeus Mozart was born in 1756—explore his early life and musical genius.",
    tag: "Culture",
    image: "/images/salzburg_austria_mou_6393989e.jpg"
  },
  {
    id: "day-4",
    title: "Getreidegasse",
    description: "Famous shopping street with traditional ornate wrought-iron guild signs, boutique shops, and hidden courtyards connecting to parallel lanes.",
    tag: "Walk",
    image: "/images/salzburg_austria_mou_7fa6ee31.jpg"
  },
  {
    id: "day-5",
    title: "Hohensalzburg Fortress",
    description: "Daytime panoramic views of the city from the iconic medieval fortress perched high above the old town.",
    tag: "View",
    image: "/images/salzburg_austria_his_c717a1e9.jpg"
  },
  {
    id: "day-6",
    title: "Local Coffee Culture",
    description: "Traditional Viennese-style coffee houses serving rich melange, delicate pastries, and the timeless art of Austrian café life.",
    tag: "Food",
    image: "/images/fine_dining_experience.png"
  },
  {
    id: "day-7",
    title: "Salzach River Walk",
    description: "Scenic riverside promenade along the emerald waters, connecting the old and new town with beautiful bridge views.",
    tag: "Walk",
    image: "/images/salzburg_cityscape_sunset_view.png"
  },
  {
    id: "day-8",
    title: "Mountain Viewpoints",
    description: "Cable car to Untersberg mountain for breathtaking Alpine panoramas just minutes from the city center.",
    tag: "View",
    image: "/images/salzburg_austria_his_ddc72f4b.jpg"
  }
];

const NIGHT_ACTIVITIES = [
  {
    id: "night-1",
    title: "Fortress by Night",
    description: "Illuminated fortress views and evening concerts at Hohensalzburg—a magical silhouette against the starlit sky.",
    tag: "View",
    image: "/images/salzburg_austria_his_c717a1e9.jpg"
  },
  {
    id: "night-2",
    title: "Fine Dining",
    description: "Michelin-starred restaurants and local cuisine—indulge in exquisite Austrian dishes with panoramic views and candlelit ambiance.",
    tag: "Food",
    image: "/images/fine_dining_experience.png"
  },
  {
    id: "night-3",
    title: "Wine Bars & Cellars",
    description: "Cozy Austrian wine tastings in intimate cellars and stylish bars, savoring local Grüner Veltliner and regional specialties.",
    tag: "Food",
    image: "/images/luxury_hotel_interio_aa4bb2e2.jpg"
  },
  {
    id: "night-4",
    title: "Old Town at Dusk",
    description: "Magical atmosphere with lit streets, glowing shop windows, and the timeless charm of Salzburg after sunset.",
    tag: "Walk",
    image: "/images/salzburg_austria_his_ea8bfaf1.jpg"
  },
  {
    id: "night-5",
    title: "Concert Halls",
    description: "Salzburg Festival venues and classical music—experience world-class performances in historic concert halls.",
    tag: "Music",
    image: "/images/salzburg_austria_mou_6393989e.jpg"
  },
  {
    id: "night-6",
    title: "Rooftop Bars",
    description: "City views under the stars—sip cocktails with panoramic vistas of the illuminated old town and fortress.",
    tag: "Nightlife",
    image: "/images/salzburg_cityscape_sunset_view.png"
  },
  {
    id: "night-7",
    title: "Jazz Clubs",
    description: "Live music scene in the old town—discover intimate venues featuring local and international jazz artists.",
    tag: "Music",
    image: "/images/luxury_hotel_interio_dd2a3b13.jpg"
  },
  {
    id: "night-8",
    title: "Night Photography",
    description: "Best spots for evening shots—capture the illuminated fortress, reflections on the Salzach, and atmospheric streets.",
    tag: "Photo",
    image: "/images/salzburg_austria_his_ddc72f4b.jpg"
  }
];

function PlaceCard({ place, isNightMode, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [place.id]);

  const tagColors = {
    View: isNightMode 
      ? { bg: "rgba(139, 92, 246, 0.3)", text: "#c4b5fd" }
      : { bg: "rgba(37, 99, 235, 0.15)", text: "#2563eb" },
    Walk: isNightMode 
      ? { bg: "rgba(6, 182, 212, 0.3)", text: "#67e8f9" }
      : { bg: "rgba(16, 185, 129, 0.15)", text: "#059669" },
    Culture: isNightMode 
      ? { bg: "rgba(236, 72, 153, 0.3)", text: "#f9a8d4" }
      : { bg: "rgba(236, 72, 153, 0.15)", text: "#db2777" },
    Food: isNightMode 
      ? { bg: "rgba(245, 158, 11, 0.3)", text: "#fcd34d" }
      : { bg: "rgba(180, 83, 9, 0.15)", text: "#b45309" },
    Music: isNightMode 
      ? { bg: "rgba(168, 85, 247, 0.3)", text: "#d8b4fe" }
      : { bg: "rgba(168, 85, 247, 0.15)", text: "#9333ea" },
    Nightlife: isNightMode 
      ? { bg: "rgba(99, 102, 241, 0.3)", text: "#a5b4fc" }
      : { bg: "rgba(99, 102, 241, 0.15)", text: "#4f46e5" },
    Romance: isNightMode 
      ? { bg: "rgba(244, 63, 94, 0.3)", text: "#fda4af" }
      : { bg: "rgba(244, 63, 94, 0.15)", text: "#e11d48" },
    Photo: isNightMode 
      ? { bg: "rgba(34, 211, 238, 0.3)", text: "#67e8f9" }
      : { bg: "rgba(14, 165, 233, 0.15)", text: "#0284c7" }
  };

  const tagStyle = tagColors[place.tag] || tagColors.View;

  return (
    <motion.div
      ref={ref}
      className="place-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{
        background: isNightMode 
          ? "rgba(15, 23, 42, 0.7)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isNightMode 
          ? "1px solid rgba(148, 163, 184, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: isNightMode 
          ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          : "0 8px 32px rgba(31, 38, 135, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        transition: "background 0.6s ease, border 0.6s ease, box-shadow 0.3s ease"
      }}
    >
      <div style={{
        height: "180px",
        overflow: "hidden",
        position: "relative"
      }}>
        <motion.img
          src={place.image}
          alt={place.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isNightMode ? "brightness(0.7) saturate(0.9)" : "brightness(1) saturate(1.1)",
            transition: "filter 0.6s ease"
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: isNightMode 
            ? "linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)"
            : "linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent)",
          transition: "background 0.6s ease"
        }} />
      </div>
      
      <div style={{ padding: "1.25rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.75rem"
        }}>
          <h3 style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 600,
            color: isNightMode ? "#f1f5f9" : "#0f172a",
            transition: "color 0.6s ease"
          }}>
            {place.title}
          </h3>
          <span style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            background: tagStyle.bg,
            color: tagStyle.text,
            transition: "background 0.6s ease, color 0.6s ease",
            flexShrink: 0,
            marginLeft: "0.5rem"
          }}>
            {place.tag}
          </span>
        </div>
        
        <p style={{
          margin: 0,
          fontSize: "0.9rem",
          lineHeight: 1.6,
          color: isNightMode ? "#94a3b8" : "#64748b",
          transition: "color 0.6s ease"
        }}>
          {place.description}
        </p>
      </div>
    </motion.div>
  );
}

function Star({ style }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }}
      style={{
        position: "absolute",
        width: "2px",
        height: "2px",
        borderRadius: "50%",
        background: "white",
        boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
        ...style
      }}
    />
  );
}

function StarField() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }));

  return (
    <>
      {stars.map(star => (
        <Star key={star.id} style={{ left: star.left, top: star.top }} />
      ))}
    </>
  );
}

export default function EnSalzburgPage() {
  const [isNightMode, setIsNightMode] = useState(false);

  const currentActivities = isNightMode ? NIGHT_ACTIVITIES : DAY_ACTIVITIES;

  const backgroundStyles = {
    day: {
      background: "linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 25%, #fffbeb 50%, #fef3c7 75%, #fff7ed 100%)",
    },
    night: {
      background: "linear-gradient(180deg, #020617 0%, #0f172a 25%, #1e1b4b 50%, #312e81 75%, #1e1b4b 100%)",
    }
  };

  return (
    <>
      <Cursor />
      <motion.div
        animate={isNightMode ? backgroundStyles.night : backgroundStyles.day}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <AnimatePresence>
          {isNightMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0
              }}
            >
              <StarField />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Header lang={LANG} />
          
          <main className="app-shell">
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                padding: "2rem 2rem 3rem",
                borderRadius: "32px",
                marginTop: "1.5rem",
                position: "relative",
                overflow: "hidden",
                background: isNightMode 
                  ? "rgba(15, 23, 42, 0.6)"
                  : "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: isNightMode 
                  ? "1px solid rgba(148, 163, 184, 0.1)"
                  : "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: isNightMode 
                  ? "0 25px 80px rgba(0, 0, 0, 0.5)"
                  : "0 25px 80px rgba(37, 99, 235, 0.1)",
                transition: "background 0.6s ease, border 0.6s ease, box-shadow 0.6s ease"
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isNightMode 
                    ? "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)"
                    : "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)",
                  zIndex: 0,
                  transition: "background 0.6s ease"
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2rem"
                }}>
                  <motion.div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "999px",
                      background: isNightMode 
                        ? "rgba(30, 41, 59, 0.8)"
                        : "rgba(255, 255, 255, 0.9)",
                      border: isNightMode 
                        ? "1px solid rgba(148, 163, 184, 0.2)"
                        : "1px solid rgba(0, 0, 0, 0.08)",
                      boxShadow: isNightMode 
                        ? "0 4px 24px rgba(0, 0, 0, 0.3)"
                        : "0 4px 24px rgba(0, 0, 0, 0.08)",
                      transition: "background 0.6s ease, border 0.6s ease, box-shadow 0.6s ease"
                    }}
                  >
                    <motion.button
                      onClick={() => setIsNightMode(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "999px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        background: !isNightMode 
                          ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                          : "transparent",
                        color: !isNightMode 
                          ? "white"
                          : isNightMode ? "#94a3b8" : "#64748b",
                        boxShadow: !isNightMode 
                          ? "0 4px 16px rgba(251, 191, 36, 0.4)"
                          : "none",
                        transition: "color 0.3s ease"
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>☀️</span>
                      Day
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setIsNightMode(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "999px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        background: isNightMode 
                          ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                          : "transparent",
                        color: isNightMode 
                          ? "white"
                          : "#64748b",
                        boxShadow: isNightMode 
                          ? "0 4px 16px rgba(139, 92, 246, 0.4)"
                          : "none",
                        transition: "color 0.3s ease"
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>🌙</span>
                      Night
                    </motion.button>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  style={{
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: isNightMode ? "#64748b" : "#94a3b8",
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                    transition: "color 0.6s ease"
                  }}
                >
                  This toggle controls which activities are shown, independent of the site's global theme.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{ textAlign: "center", marginBottom: "1rem" }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      background: isNightMode 
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(37, 99, 235, 0.1)",
                      color: isNightMode 
                        ? "#a78bfa"
                        : "#2563eb",
                      border: isNightMode 
                        ? "1px solid rgba(139, 92, 246, 0.3)"
                        : "1px solid rgba(37, 99, 235, 0.2)",
                      transition: "background 0.6s ease, color 0.6s ease, border 0.6s ease"
                    }}
                  >
                    {isNightMode ? "Explore by Moonlight" : "Discover by Daylight"}
                  </motion.span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  style={{
                    textAlign: "center",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    margin: "0 0 1rem",
                    lineHeight: 1.1,
                    background: isNightMode 
                      ? "linear-gradient(135deg, #c4b5fd 0%, #67e8f9 50%, #f0abfc 100%)"
                      : "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transition: "background 0.6s ease"
                  }}
                >
                  Salzburg Experience
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{
                    textAlign: "center",
                    fontSize: "1.15rem",
                    lineHeight: 1.7,
                    maxWidth: "600px",
                    margin: "0 auto",
                    color: isNightMode ? "#94a3b8" : "#64748b",
                    transition: "color 0.6s ease"
                  }}
                >
                  {isNightMode 
                    ? "Experience the magical atmosphere of Salzburg after dark—illuminated streets, cozy venues, and timeless beauty under the stars."
                    : "Discover the charm of Mozart's birthplace—baroque architecture, mountain views, and centuries of culture in every corner."}
                </motion.p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ marginTop: "3rem", paddingBottom: "2rem" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{
                  textAlign: "center",
                  marginBottom: "2.5rem"
                }}
              >
                <h2 style={{
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  margin: "0 0 0.5rem",
                  color: isNightMode ? "#f1f5f9" : "#0f172a",
                  transition: "color 0.6s ease"
                }}>
                  {isNightMode ? "Nighttime Favorites" : "Must-See Destinations"}
                </h2>
                <p style={{
                  fontSize: "1rem",
                  color: isNightMode ? "#64748b" : "#94a3b8",
                  margin: 0,
                  transition: "color 0.6s ease"
                }}>
                  {isNightMode 
                    ? "These spots come alive when the sun goes down"
                    : "The essential Salzburg experiences you won't want to miss"}
                </p>
              </motion.div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem"
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isNightMode ? "night" : "day"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                      display: "contents"
                    }}
                  >
                    {currentActivities.map((place, index) => (
                      <PlaceCard 
                        key={place.id} 
                        place={place} 
                        isNightMode={isNightMode}
                        index={index}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                padding: "2.5rem 2rem",
                borderRadius: "24px",
                textAlign: "center",
                background: isNightMode 
                  ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)"
                  : "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(236, 72, 153, 0.08) 100%)",
                border: isNightMode 
                  ? "1px solid rgba(139, 92, 246, 0.2)"
                  : "1px solid rgba(37, 99, 235, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition: "background 0.6s ease, border 0.6s ease"
              }}
            >
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                margin: "0 0 1rem",
                color: isNightMode ? "#f1f5f9" : "#0f172a",
                transition: "color 0.6s ease"
              }}>
                {isNightMode ? "Ready to explore the night?" : "Start your Salzburg journey"}
              </h3>
              <p style={{
                fontSize: "1rem",
                color: isNightMode ? "#94a3b8" : "#64748b",
                margin: "0 0 1.5rem",
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.7,
                transition: "color 0.6s ease"
              }}>
                {isNightMode 
                  ? "From illuminated historic sites to cozy evening venues, Salzburg's nighttime magic awaits."
                  : "Whether you're here for the music, the mountains, or the memories—Salzburg welcomes you."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "1rem 2.5rem",
                  borderRadius: "999px",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: isNightMode 
                    ? "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)"
                    : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  color: "white",
                  boxShadow: isNightMode 
                    ? "0 10px 40px rgba(139, 92, 246, 0.4)"
                    : "0 10px 40px rgba(37, 99, 235, 0.35)",
                  transition: "background 0.6s ease, box-shadow 0.6s ease"
                }}
              >
                Plan Your Visit
              </motion.button>
            </motion.section>
          </main>

          <Footer lang={LANG} />
        </div>
      </motion.div>
    </>
  );
}
