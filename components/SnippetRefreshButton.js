"use client";

import { motion } from "framer-motion";

export default function SnippetRefreshButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="snippet-refresh-btn"
      aria-label="Refresh snippet"
    >
      ↻
    </motion.button>
  );
}
