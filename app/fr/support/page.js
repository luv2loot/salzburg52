import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

export default function FrSupportPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Support & contact</h1>
          <p>
            Pour toute question sur Salzbourg, les langues ou ce site, vous
            pouvez me contacter directement.
          </p>

          <h2>E-mail</h2>
          <p>
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>

          <h2>Réseaux</h2>
          <p>
            Instagram :{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
          </p>

          <h2>Langues</h2>
          <p>
            Vous pouvez écrire en français, allemand, anglais, italien ou
            espagnol. Je répondrai autant que possible dans la même langue.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
