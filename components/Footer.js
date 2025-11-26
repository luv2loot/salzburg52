"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const year = new Date().getFullYear();

const phrases = {
  en: "Crafted with dedication in Salzburg.",
  de: "Mit Hingabe in Salzburg gestaltet.",
  it: "Realizzato con dedizione a Salisburgo.",
  fr: "Conçu avec dévouement à Salzbourg.",
  es: "Elaborado con dedicación en Salzburgo."
};

const legalLabels = {
  en: {
    impressum: "Imprint",
    privacy: "Privacy Policy"
  },
  de: {
    impressum: "Impressum",
    privacy: "Datenschutzerklärung"
  },
  it: {
    impressum: "Note legali",
    privacy: "Informativa privacy"
  },
  fr: {
    impressum: "Mentions légales",
    privacy: "Politique de confidentialité"
  },
  es: {
    impressum: "Aviso legal",
    privacy: "Política de privacidad"
  }
};

function FooterLink({ href, children }) {
  return (
    <motion.span
      className="footer-link-wrapper"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} className="footer-link-premium">
        <span className="footer-link-text">{children}</span>
        <span className="footer-link-underline" />
      </Link>
    </motion.span>
  );
}

export default function Footer({ lang = "en" }) {
  const text = phrases[lang] ?? phrases.en;
  const labels = legalLabels[lang] ?? legalLabels.en;

  return (
    <footer className="app-shell footer-root-premium" role="contentinfo">
      <motion.div 
        className="surface footer-inner-premium"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="footer-gradient-accent" />
        
        <div className="footer-content-wrapper">
          <div className="footer-left-premium">
            <motion.div 
              className="footer-brand"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="footer-brand-dot" />
              <span className="footer-brand-text">Salzburg52</span>
            </motion.div>
            <span className="footer-copyright">
              © {year} All rights reserved
            </span>
          </div>

          <div className="footer-center-premium">
            <nav className="footer-links-premium" aria-label="Legal">
              <FooterLink href="/legal/impressum">{labels.impressum}</FooterLink>
              <span className="footer-divider">·</span>
              <FooterLink href="/legal/privacy">{labels.privacy}</FooterLink>
            </nav>
          </div>

          <div className="footer-right-premium">
            <motion.span 
              className="footer-note-premium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {text}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
