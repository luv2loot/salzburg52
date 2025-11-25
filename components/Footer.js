"use client";

import Link from "next/link";

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

export default function Footer({ lang = "en" }) {
  const text = phrases[lang] ?? phrases.en;
  const labels = legalLabels[lang] ?? legalLabels.en;

  return (
    <footer className="app-shell footer-root" role="contentinfo">
      <div className="surface footer-inner">
        <div className="footer-left">
          <span className="text-muted">
            © {year} Salzburg52
          </span>
        </div>

        <div className="footer-center">
          <nav className="footer-links" aria-label="Legal">
            <Link href="/legal/impressum">{labels.impressum}</Link>
            <span>·</span>
            <Link href="/legal/privacy">{labels.privacy}</Link>
          </nav>
        </div>

        <div className="footer-right">
          <span className="text-muted footer-note">{text}</span>
        </div>
      </div>
    </footer>
  );
}
