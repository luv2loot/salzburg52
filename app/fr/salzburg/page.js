"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

export default function FrSalzburgPage() {
  const salzburg_images = [
    { src: "/images/salzburg_austria_his_c717a1e9.jpg", alt: "Centre Historique Salzbourg" },
    { src: "/images/salzburg_austria_his_ddc72f4b.jpg", alt: "Cathédrale Salzbourg" },
    { src: "/images/salzburg_austria_his_ea8bfaf1.jpg", alt: "Vieille Ville Salzbourg" },
    { src: "/images/salzburg_austria_mou_6393989e.jpg", alt: "Montagnes Salzbourg" },
    { src: "/images/salzburg_austria_mou_7fa6ee31.jpg", alt: "Paysage Salzbourg" },
    { src: "/images/salzburg_cityscape_sunset_view.png", alt: "Coucher de Soleil Salzbourg" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1>Salzbourg</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzbourg est une ville compacte, facile à explorer à pied et remplie
            de contrastes : musique classique et tourisme moderne, coins tranquilles
            et places animées.
          </p>

          <h2>Impressions de Salzbourg</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            {salzburg_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "18px", overflow: "hidden", height: "240px", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)", transition: "transform 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Ambiance de la Ville</h2>
          <p style={{ lineHeight: 1.7 }}>
            La plupart des itinéraires traversent la Salzach au moins une fois.
            Selon la lumière, la vue sur la forteresse et la vieille ville change
            à chaque fois.
          </p>

          <h2>Quelques Endroits Préférés</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Quartier de Mirabell</strong> – jardins, vue sur la forteresse et bon point de départ pour explorer.
            </li>
            <li>
              <strong>Getreidegasse et Rues Latérales</strong> – atmosphère classique de Salzbourg, petits passages et mélange de touristes et de locaux.
            </li>
            <li>
              <strong>Le Long de la Salzach</strong> – simple mais efficace, surtout au coucher du soleil.
            </li>
          </ul>

          <p style={{ lineHeight: 1.7, marginTop: "1.5rem", color: "var(--color-muted)" }}>
            Chaque coin de Salzbourg raconte une histoire unique et captivante.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
