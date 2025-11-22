import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function ImpressumPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Impressum</h1>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Dies ist eine private, nicht-kommerzielle Website. Die folgenden
            Informationen dienen der Orientierung und stellen keine
            Rechtsberatung dar.
          </p>

          <h2>Angaben gemäß § 5 TMG / ECG</h2>
          <p>
            Amir Ismaili
            <br />
            Lanserhofstraße 10
            <br />
            5020 Salzburg
            <br />
            Österreich
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
            <br />
            Instagram:{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieser Seite wurden mit Sorgfalt erstellt. Für die
            Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch
            keine Gewähr übernommen. Es handelt sich um persönliche, unverbindliche
            Informationen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Diese Website kann Links zu externen Websites enthalten. Auf deren
            Inhalte habe ich keinen Einfluss. Für diese fremden Inhalte ist
            stets der jeweilige Anbieter oder Betreiber verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die auf dieser Website veröffentlichten Inhalte und Werke
            unterliegen dem Urheberrecht. Eine Weiterverwendung von Texten oder
            Medien ist nur nach vorheriger Zustimmung erlaubt, soweit nicht
            ausdrücklich anders gekennzeichnet.
          </p>

          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            Hinweis: Für eine rechtssichere Ausgestaltung von Impressum und
            Rechtstexten sollte im Zweifel fachkundige Beratung (z. B. durch
            eine Rechtsanwältin oder einen Rechtsanwalt) eingeholt werden.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
