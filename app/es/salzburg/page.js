import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "es";

export default function EsSalzburgPage() {
  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "1.75rem" }}>
          <h1>Salzburgo</h1>
          <p>
            Salzburgo es una ciudad compacta, fácil de recorrer a pie y llena de
            contrastes: música clásica, turismo moderno, rincones tranquilos y
            plazas llenas.
          </p>

          <h2>Ambiente</h2>
          <p>
            Muchos recorridos cruzan el río Salzach. Según la luz, la vista
            hacia la fortaleza y el casco antiguo cambia siempre un poco.
          </p>

          <h2>Algunos lugares favoritos</h2>
          <ul>
            <li>
              Zona de Mirabell – jardines, vista a la fortaleza y buen punto de
              partida para pasear.
            </li>
            <li>
              Getreidegasse y calles laterales – la imagen clásica de
              Salzburgo, con pasajes estrechos y mezcla de turistas y locales.
            </li>
            <li>
              Paseo junto al Salzach – simple pero efectivo, sobre todo al
              atardecer.
            </li>
          </ul>

          <p>
            Más adelante esta página tendrá recomendaciones personales, fotos y
            notas breves del día a día en la ciudad.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
