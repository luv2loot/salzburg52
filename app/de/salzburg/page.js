import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function DeSalzburgPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Salzburg</h1>
          <p>
            Salzburg ist kompakt, zu Fuß gut zu erkunden und trotzdem voll von
            Gegensätzen: klassische Musik, moderner Tourismus, ruhige Gassen und
            volle Plätze.
          </p>

          <h2>Stadtgefühl</h2>
          <p>
            Viele Wege führen über die Salzach. Je nach Licht wirkt der Blick
            auf Festung und Altstadt jedes Mal ein bisschen anders.
          </p>

          <h2>Einige Lieblingsorte</h2>
          <ul>
            <li>
              Bereich Mirabell – Gärten, Sicht auf die Festung und ein guter
              Ausgangspunkt für Spaziergänge.
            </li>
            <li>
              Getreidegasse und Seitengassen – klassisches Salzburg-Gefühl,
              kleine Durchgänge, Mischung aus Touristen und Einheimischen.
            </li>
            <li>
              Entlang der Salzach – simpel, aber effektiv, vor allem zum
              Sonnenuntergang.
            </li>
          </ul>

          <p>
            Diese Seite wird später mehr persönliche Empfehlungen, Fotos und
            kleine Notizen aus dem Alltag in Salzburg enthalten.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
