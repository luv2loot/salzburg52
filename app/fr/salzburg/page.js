import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

export default function FrSalzburgPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Salzbourg</h1>
          <p>
            Salzbourg est une ville compacte, facile à explorer à pied, avec un
            mélange de musique classique, de tourisme moderne et de ruelles
            calmes.
          </p>

          <h2>Ambiance</h2>
          <p>
            Beaucoup de trajets passent par le fleuve Salzach. Selon la lumière,
            la vue sur la forteresse et la vieille ville change toujours un peu.
          </p>

          <h2>Quelques endroits favoris</h2>
          <ul>
            <li>
              Quartier de Mirabell – jardins, vue sur la forteresse et bon point
              de départ pour découvrir la ville.
            </li>
            <li>
              Getreidegasse et petites rues – l’image classique de Salzbourg,
              avec des passages étroits et un mélange de touristes et d’habitants.
            </li>
            <li>
              Promenade le long du Salzach – simple et efficace, surtout au
              coucher du soleil.
            </li>
          </ul>

          <p>
            Cette page accueillera plus tard des recommandations personnelles,
            des photos et de petites notes du quotidien à Salzbourg.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
