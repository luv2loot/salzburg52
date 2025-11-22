import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "es";

export default function EsInfoPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Sobre mí</h1>
          <p>
            Me llamo Amir Ismaili, vivo en Salzburgo y trabajo en el HYPERION
            Hotel Salzburg como aprendiz de recepción con experiencia también en
            servicio.
          </p>
          <p>
            Me gusta la combinación de estructura, contacto con personas y
            resolución tranquila de problemas que exige la hospitalidad.
          </p>

          <h2>Personalidad</h2>
          <p>
            Según el modelo de Stefanie Stahl soy “IKDL”: introvertido, concreto,
            lógico al decidir y relajado. Eso encaja bien con el trabajo en
            recepción.
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
