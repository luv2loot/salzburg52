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
        <div className="surface" style={{ padding: "1.9rem" }}>
          <h1>Impressum / Legal Notice</h1>

          <section style={{ marginTop: "1.4rem" }}>
            <h2>Deutsch</h2>
            <p>
              Diese Website ist ein privates, nicht-kommerzielles Projekt.
              Angaben gemäß § 5 TMG / § 14 UGB / ECG:
            </p>
            <p>
              Amir Ismaili
              <br />
              Lanserhofstraße 10
              <br />
              5020 Salzburg
              <br />
              Österreich
            </p>

            <h3>Kontakt</h3>
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

            <h3>Haftung für Inhalte</h3>
            <p>
              Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Es wird
              jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und
              Aktualität der Inhalte übernommen. Alle Angaben sind unverbindlich
              und stellen keine rechtliche oder geschäftliche Beratung dar.
            </p>

            <h3>Haftung für Links</h3>
            <p>
              Diese Website kann Links zu externen Websites enthalten. Für die
              Inhalte verlinkter Seiten ist ausschließlich der jeweilige
              Anbieter oder Betreiber verantwortlich. Zum Zeitpunkt der
              Verlinkung waren keine rechtswidrigen Inhalte erkennbar.
            </p>

            <h3>Urheberrecht</h3>
            <p>
              Die auf dieser Website veröffentlichten Inhalte (Texte, Layout,
              ggf. Bilder) unterliegen dem Urheberrecht. Jede Nutzung über den
              privaten Gebrauch hinaus bedarf der vorherigen Zustimmung des
              Rechteinhabers, soweit nicht ausdrücklich anders gekennzeichnet.
            </p>
          </section>

          <section style={{ marginTop: "1.8rem" }}>
            <h2>English</h2>
            <p>
              This website is a private, non-commercial project. The following
              information is provided according to common legal requirements for
              website identification.
            </p>

            <p>
              Amir Ismaili
              <br />
              Lanserhofstraße 10
              <br />
              5020 Salzburg
              <br />
              Austria
            </p>

            <h3>Contact</h3>
            <p>
              Email:{" "}
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

            <h3>Liability for content</h3>
            <p>
              The content on this website is created with care. However, no
              guarantee is given for completeness, correctness or up-to-date
              status. All information is non-binding and does not constitute
              legal or professional advice.
            </p>

            <h3>Liability for external links</h3>
            <p>
              This website may contain links to external third-party websites.
              The respective providers or operators are solely responsible for
              their content. No ongoing monitoring of linked pages takes place;
              if legal violations become known, such links will be removed as
              far as technically possible.
            </p>

            <h3>Copyright</h3>
            <p>
              Texts, layout and other content on this site may be protected by
              copyright. Any use beyond private viewing requires prior consent
              of the rights holder, unless explicitly stated otherwise.
            </p>
          </section>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
