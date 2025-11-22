"use client";

import { motion } from "framer-motion";

const defaultItems = [
  {
    id: "salzburg-center",
    label: "Altstadt Salzburg",
    note: "Drop in your favorite city shots here."
  },
  {
    id: "hotel-vibes",
    label: "Hyperion Vibes",
    note: "Front office, details, lobby atmosphere."
  },
  {
    id: "coffee-break",
    label: "Behind the desk",
    note: "Service moments, coffee, little stories."
  }
];

export default function MediaStrip({ items = defaultItems }) {
  return (
    <section className="app-shell mediastrip-root">
      <div className="surface mediastrip-inner">
        <div className="mediastrip-header">
          <span className="text-muted">Snapshots</span>
        </div>
        <div className="mediastrip-row">
          {items.map((item, index) => (
            <motion.div
              key={item.id ?? index}
              className="mediastrip-card"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="mediastrip-thumb-placeholder">
                <span className="mediastrip-thumb-label">{item.label}</span>
              </div>
              {item.note && (
                <p className="mediastrip-note text-muted">{item.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
