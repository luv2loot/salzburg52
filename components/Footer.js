const year = new Date().getFullYear();

const phrases = {
  en: "Built in Salzburg with way too much coffee.",
  de: "Entstanden in Salzburg mit viel zu viel Kaffee.",
  it: "Creato a Salisburgo con troppo caffè.",
  fr: "Créé à Salzbourg avec beaucoup trop de café.",
  es: "Creado en Salzburgo con demasiado café."
};

const legalLabels = {
  en: {
    impressum: "Imprint",
    privacy: "Privacy Policy",
    cookies: "Cookies"
  },
  de: {
    impressum: "Impressum",
    privacy: "Datenschutzerklärung",
    cookies: "Cookies"
  },
  it: {
    impressum: "Note legali",
    privacy: "Informativa privacy",
    cookies: "Cookie"
  },
  fr: {
    impressum: "Mentions légales",
    privacy: "Politique de confidentialité",
    cookies: "Cookies"
  },
  es: {
    impressum: "Aviso legal",
    privacy: "Política de privacidad",
    cookies: "Cookies"
  }
};

export default function Footer({ lang = "en" }) {
  const text = phrases[lang] ?? phrases.en;
  const labels = legalLabels[lang] ?? legalLabels.en;

  return (
    <footer className="app-shell footer-root">
      <div className="surface footer-inner">
        <div className="footer-left">
          <span className="text-muted">© {year} Salzburg52 · Amir Ismaili</span>
        </div>

        <div className="footer-center">
          <nav className="footer-links">
            <a href="/legal/impressum">{labels.impressum}</a>
            <span>·</span>
            <a href="/legal/privacy">{labels.privacy}</a>
            <span>·</span>
            <a href="/legal/cookies">{labels.cookies}</a>
          </nav>
        </div>

        <div className="footer-right">
          <span className="text-muted footer-note">{text}</span>
        </div>
      </div>
    </footer>
  );
}
