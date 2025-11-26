"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFooterTranslations, normalizeLang } from "@/lib/translations";

const year = new Date().getFullYear();

function FooterLink({ href, children, external = false }) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  
  return (
    <motion.span
      className="footer-link-wrapper"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} className="footer-link-premium" {...linkProps}>
        <span className="footer-link-text">{children}</span>
        <span className="footer-link-underline" />
      </Link>
    </motion.span>
  );
}

function InstagramIcon() {
  return (
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

export default function Footer({ lang = "en" }) {
  const normalized = normalizeLang(lang);
  const translations = getFooterTranslations(normalized);

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
              © {year} {translations.allRightsReserved}
            </span>
          </div>

          <div className="footer-center-premium">
            <nav className="footer-links-premium" aria-label="Legal">
              <FooterLink href="/legal/impressum">{translations.imprint}</FooterLink>
              <span className="footer-divider">·</span>
              <FooterLink href="/legal/privacy">{translations.privacy}</FooterLink>
            </nav>
            
            <div className="footer-contact-row">
              <motion.a
                href="mailto:info@salzburg52.com"
                className="footer-contact-link"
                whileHover={{ scale: 1.05, color: "var(--primary)" }}
                transition={{ duration: 0.2 }}
                title={translations.contactUs}
              >
                <EmailIcon />
                <span>info@salzburg52.com</span>
              </motion.a>
              <span className="footer-divider">·</span>
              <motion.a
                href="https://instagram.com/salzburg52"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
                whileHover={{ scale: 1.05, color: "var(--primary)" }}
                transition={{ duration: 0.2 }}
                title={translations.followUs}
              >
                <InstagramIcon />
                <span>@salzburg52</span>
              </motion.a>
            </div>
          </div>

          <div className="footer-right-premium">
            <motion.span 
              className="footer-note-premium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {translations.craftedWith}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
