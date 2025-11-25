"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItSalzburgPage() {
  const salzburg_images = [
    { src: "/images/salzburg_austria_his_c717a1e9.jpg", alt: "Centro Storico Salisburgo" },
    { src: "/images/salzburg_austria_his_ddc72f4b.jpg", alt: "Cattedrale Salisburgo" },
    { src: "/images/salzburg_austria_his_ea8bfaf1.jpg", alt: "Vecchia Città Salisburgo" },
    { src: "/images/salzburg_austria_mou_6393989e.jpg", alt: "Montagne Salisburgo" },
    { src: "/images/salzburg_austria_mou_7fa6ee31.jpg", alt: "Paesaggio Salisburgo" },
    { src: "/images/salzburg_cityscape_sunset_view.png", alt: "Tramonto Salisburgo" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1>Salisburgo</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salisburgo è una città compatta, facile da esplorare a piedi e piena
            di contrasti: musica classica e turismo moderno, angoli tranquilli e
            piazze affollate.
          </p>

          <h2>Impressioni di Salisburgo</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            {salzburg_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "18px", overflow: "hidden", height: "240px", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)", transition: "transform 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Atmosfera della Città</h2>
          <p style={{ lineHeight: 1.7 }}>
            La maggior parte dei percorsi attraversa il Salzach almeno una volta.
            A seconda della luce, la vista sulla fortezza e la vecchia città
            cambia sempre un po'.
          </p>

          <h2>Alcuni Posti Preferiti</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Area di Mirabell</strong> – giardini, vista sulla fortezza e buon punto di partenza per esplorare.
            </li>
            <li>
              <strong>Getreidegasse e Strade Laterali</strong> – atmosfera classica di Salisburgo, piccoli passaggi e un mix di turisti e locali.
            </li>
            <li>
              <strong>Lungo il Salzach</strong> – semplice ma efficace, soprattutto al tramonto.
            </li>
          </ul>

          <p style={{ lineHeight: 1.7, marginTop: "1.5rem", color: "var(--color-muted)" }}>
            Ogni angolo di Salisburgo racconta una storia unica e affascinante.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
