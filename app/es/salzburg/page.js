"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "es";

export default function EsSalzburgPage() {
  const salzburg_images = [
    { src: "/images/salzburg_austria_his_c717a1e9.jpg", alt: "Centro Histórico Salzburgo" },
    { src: "/images/salzburg_austria_his_ddc72f4b.jpg", alt: "Catedral Salzburgo" },
    { src: "/images/salzburg_austria_his_ea8bfaf1.jpg", alt: "Casco Antiguo Salzburgo" },
    { src: "/images/salzburg_austria_mou_6393989e.jpg", alt: "Vistas Montañas Salzburgo" },
    { src: "/images/salzburg_austria_mou_7fa6ee31.jpg", alt: "Paisaje Salzburgo" },
    { src: "/images/salzburg_cityscape_sunset_view.png", alt: "Atardecer Salzburgo" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1>Salzburgo</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburgo es una ciudad compacta, fácil de recorrer a pie y llena de
            contrastes: música clásica, turismo moderno, rincones tranquilos y
            plazas llenas.
          </p>

          <h2>Ambiente de Salzburgo</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            {salzburg_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "18px", overflow: "hidden", height: "240px", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)", transition: "transform 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Vistas de la Ciudad</h2>
          <p style={{ lineHeight: 1.7 }}>
            Muchos recorridos cruzan el río Salzach. Según la luz, la vista
            hacia la fortaleza y el casco antiguo cambia siempre un poco.
          </p>

          <h2>Algunos Lugares Favoritos</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Zona de Mirabell</strong> – jardines, vista a la fortaleza y buen punto de partida para pasear.
            </li>
            <li>
              <strong>Getreidegasse y Calles Laterales</strong> – la imagen clásica de Salzburgo, con pasajes estrechos y mezcla de turistas y locales.
            </li>
            <li>
              <strong>Paseo junto al Salzach</strong> – simple pero efectivo, sobre todo al atardecer.
            </li>
          </ul>

          <p style={{ lineHeight: 1.7, marginTop: "1.5rem", color: "var(--color-muted)" }}>
            Cada rincón de Salzburgo cuenta una historia especial.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
