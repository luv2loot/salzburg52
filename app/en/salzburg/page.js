import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "en";

export default function EnSalzburgPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Salzburg</h1>
          <p>
            Salzburg is compact, walkable, and full of contrasts: classical
            music and modern tourism, quiet corners and busy squares, mountains
            and city life.
          </p>

          <h2>City impressions</h2>
          <p>
            Most routes cross the river at least once. Depending on the light,
            the view towards the fortress and the old town never looks exactly
            the same twice.
          </p>

          <h2>Some favorite spots</h2>
          <ul>
            <li>
              Mirabell area – formal gardens, views towards the fortress, and a
              good starting point for exploring.
            </li>
            <li>
              Getreidegasse & side streets – classic Salzburg atmosphere, small
              passages, and a mix of tourists and locals.
            </li>
            <li>
              Along the river – simple but effective: walking along the Salzach,
              especially around sunset.
            </li>
          </ul>

          <p>
            This page will later include more personal recommendations, photos,
            and maybe short notes from different shifts and days in the city.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
