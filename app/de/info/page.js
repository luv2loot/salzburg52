import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function DeInfoPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Über mich</h1>
          <p>
            Ich heiße Amir Ismaili, wohne in Salzburg und arbeite im HYPERION
            Hotel Salzburg als HGA-Auszubildender im Front Office mit Erfahrung
            in Empfang und Service.
          </p>
          <p>
            Mir gefällt die Mischung aus Struktur, Kommunikation und ruhigem
            Problemlösen, die die Hotellerie verlangt – besonders an der
            Rezeption, wo jede Anreise anders ist.
          </p>

          <h2>Sprachen</h2>
          <p>
            Ich spreche Deutsch, Englisch, Italienisch, Französisch und
            Spanisch. Sprachwechsel gehören für mich zum Alltag und helfen, dass
            sich Gäste schneller wohlfühlen.
          </p>

          <h2>Persönlichkeit</h2>
          <p>
            Nach dem Modell von Stefanie Stahl bin ich „IKDL“ – introvertiert,
            konkret, logisch entscheidungsfreudig, entspannt. Das passt gut zum
            Front Office: klar bleiben, auch wenn es voll wird.
          </p>

          <h2>Online</h2>
          <p>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
            <br />
            E-Mail:{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
