import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "es";

export default function EsSupportPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Soporte & contacto</h1>
          <p>
            Si tienes preguntas sobre Salzburgo, idiomas o este sitio, puedes
            contactarme directamente.
          </p>

          <h2>Email</h2>
          <p>
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>

          <h2>Redes</h2>
          <p>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
