const year = new Date().getFullYear();

const phrases = {
  en: "Built in Salzburg with way too much coffee.",
  de: "Entstanden in Salzburg mit viel zu viel Kaffee.",
  it: "Creato a Salisburgo con troppo caffè.",
  fr: "Créé à Salzbourg avec beaucoup trop de café.",
  es: "Creado en Salzburgo con demasiado café."
};

export default function Footer({ lang = "en" }) {
  const text = phrases[lang] ?? phrases.en;

  return (
    <footer className="app-shell footer-root">
      <div className="surface footer-inner">
        <div className="footer-left">
          <span className="text-muted">© {year} Salzburg52 · Amir Ismaili</span>
        </div>
        <div className="footer-right">
          <span className="text-muted">{text}</span>
        </div>
      </div>
    </footer>
  );
}
