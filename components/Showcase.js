"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    image: "/images/luxury_hotel_lobby_elegance.png",
    title: "Luxury Spaces",
    description: "Learning the art of elegant hospitality at HYPERION Hotel",
  },
  {
    image: "/images/salzburg_cityscape_sunset_view.png",
    title: "Salzburg Beauty",
    description: "Sharing the enchanting charm of historic Salzburg with guests",
  },
  {
    image: "/images/professional_hospitality_service.png",
    title: "Professional Expertise",
    description: "Developing excellence in hospitality service and care",
  },
  {
    image: "/images/fine_dining_experience.png",
    title: "Refined Standards",
    description: "Understanding premium hospitality through daily practice",
  },
];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="showcase-root">
      <div className="app-shell">
        <motion.div
          className="showcase-header"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="showcase-title">My Journey at HYPERION Hotel Salzburg</h2>
          <p className="showcase-subtitle">
            Developing professional expertise in hospitality excellence
          </p>
        </motion.div>

        <motion.div
          className="showcase-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {showcaseItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="showcase-card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="showcase-image-container">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="showcase-image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                <motion.div
                  className="showcase-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="showcase-content"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h3 className="showcase-card-title">{item.title}</h3>
                <p className="showcase-card-description">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
