import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

export default function FrInfoPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>À propos</h1>
          <p>
            Je m’appelle Amir Ismaili. Je vis à Salzbourg et je travaille à
            l’HYPERION Hotel Salzburg comme apprenti à la réception, avec de
            l’expérience en service.
          </p>
          <p>
            J’aime l’équilibre entre organisation, contact humain et résolution
            calme des problèmes que demande l’hôtellerie – surtout au front
            office.
          </p>

          <h2>Personnalité</h2>
          <p>
            Selon le modèle de Stefanie Stahl, je suis « IKDL » – introverti,
            concret, logique dans les décisions, détendu. Cela m’aide à rester
            clair même lorsque le lobby est agité.
          </p>

          <h2>En ligne</h2>
          <p>
            Instagram :{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
            <br />
            E-mail :{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
