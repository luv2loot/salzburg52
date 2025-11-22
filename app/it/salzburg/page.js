import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItSalzburgPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Salisburgo</h1>
          <p>
            Salisburgo è una città compatta, facile da girare a piedi e piena di
            contrasti: musica classica, turismo moderno, vicoli tranquilli e
            piazze piene.
          </p>

          <h2>Atmosfera</h2>
          <p>
            Molti percorsi attraversano il fiume Salzach. A seconda della luce,
            la vista sulla fortezza e sul centro storico cambia sempre un po’.
          </p>

          <h2>Alcuni luoghi preferiti</h2>
          <ul>
            <li>
              Zona di Mirabell – giardini, vista sulla fortezza e ottimo punto
              di partenza per esplorare la città.
            </li>
            <li>
              Getreidegasse e vicoli laterali – l’immagine classica di
              Salisburgo, con piccoli passaggi e una miscela di turisti e
              abitanti.
            </li>
            <li>
              Lungo il Salzach – una passeggiata semplice, soprattutto al
              tramonto.
            </li>
          </ul>

          <p>
            Più avanti questa pagina includerà consigli personali, foto e brevi
            note dalla vita quotidiana in città.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
