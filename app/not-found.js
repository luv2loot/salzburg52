"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "en";

export default function NotFound() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell notfound-root">
        <motion.div
          className="surface notfound-inner"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.div
            className="notfound-ghost"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            404
          </motion.div>

          <motion.h1
            className="notfound-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35 }}
          >
            Oh no… looks like you got lost.
          </motion.h1>

          <motion.p
            className="notfound-text text-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.35 }}
          >
            The page you’re looking for doesn’t exist anymore, never existed,
            or is currently somewhere in Salzburg without Wi-Fi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }}
          >
            <Link href="/en" className="notfound-btn">
              Back to homepage
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
