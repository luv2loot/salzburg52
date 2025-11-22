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
            Rezeption, wo jede Anreise anders ist und kleine Entscheidungen
            einen großen Unterschied im Aufenthalt machen können.
          </p>

          <h2>Persönlichkeit</h2>
          <p>
            Nach dem Modell von Stefanie Stahl bin ich „IKDL“ – introvertiert,
            konkret, logisch entscheidungsfreudig, entspannt. Für die Arbeit im
            Front Office heißt das:
          </p>
          <ul>
            <li>Ich höre lieber erst zu und handle dann.</li>
            <li>Ich mag klare Abläufe und strukturierte Informationen.</li>
            <li>Ich bleibe ruhig, auch wenn viele Dinge gleichzeitig passieren.</li>
          </ul>

          <h2>Worauf ich im Alltag achte</h2>
          <p>
            Mir ist wichtig, dass Gäste sich ernst genommen fühlen – egal ob es
            um ein kleines Detail im Zimmer oder ein großes Problem in der Reise
            geht. Höflichkeit, Ehrlichkeit und ein ruhiger Ton sind mir lieber
            als große Show.
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
