import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function DeSupportPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Kontakt & Support</h1>
          <p>
            Für Fragen zu Salzburg, Sprachen oder dieser Seite kannst du mich
            direkt erreichen.
          </p>

          <h2>E-Mail</h2>
          <p>
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>

          <h2>Social</h2>
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
