import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItInfoPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Chi sono</h1>
          <p>
            Mi chiamo Amir Ismaili, vivo a Salisburgo e lavoro all’HYPERION
            Hotel Salzburg come apprendista al front office con esperienza sia
            in reception che in servizio.
          </p>
          <p>
            Mi piace l’equilibrio tra struttura, contatto con le persone e
            problem solving tranquillo che richiede l’ospitalità, soprattutto
            alla reception.
          </p>

          <h2>Lingue</h2>
          <p>
            Parlo italiano, tedesco, inglese, francese e spagnolo. Cambiare
            lingua più volte nello stesso turno è normale per me e aiuta gli
            ospiti a sentirsi subito a loro agio.
          </p>

          <h2>Personalità</h2>
          <p>
            Secondo il modello di Stefanie Stahl sono “IKDL” – introverso,
            concreto, logico nelle decisioni, rilassato. In pratica significa
            che preferisco informazioni chiare e processi ordinati, anche quando
            l’hotel è pieno.
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
            Email: <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
