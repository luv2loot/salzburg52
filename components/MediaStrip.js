"use client";

import { motion } from "framer-motion";

const ITEMS = [
  {
    id: "shift-notes",
    label: "Front office notes",
    note: "Small patterns from different shifts – arrivals, late check-ins, and what usually calms things down.",
    tag: "Work"
  },
  {
    id: "salzburg-corners",
    label: "Salzburg corners",
    note: "Places that feel a bit less touristy, even if they are technically still in the center.",
    tag: "City"
  },
  {
    id: "hotel-moments",
    label: "Hotel moments",
    note: "Short observations from the lobby: good arrivals, difficult days, and what guests rarely see.",
    tag: "Observations"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function MediaStrip() {
  return (
    <section className="app-shell mediastrip-root">
      <motion.div
        className="surface mediastrip-inner"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mediastrip-header">
          <span className="text-muted">Coming soon</span>
          <span className="text-muted" style={{ fontSize: "0.78rem" }}>
            Notes, photos & more
          </span>
        </div>

        <motion.div
          className="mediastrip-row"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {ITEMS.map((item) => (
            <motion.article
              key={item.id}
              className="mediastrip-card"
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="mediastrip-thumb-placeholder">
                <div className="mediastrip-thumb-label">{item.label}</div>
              </div>
              <p className="mediastrip-note text-muted">{item.note}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
