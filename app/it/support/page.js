import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItSupportPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Supporto & contatti</h1>
          <p>
            Per domande su Salisburgo, sulle lingue o su questo sito puoi
            contattarmi direttamente.
          </p>

          <h2>Email</h2>
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
