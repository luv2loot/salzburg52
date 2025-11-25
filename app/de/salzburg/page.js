"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function DeSalzburgPage() {
  const salzburg_images = [
    { src: "/images/salzburg_austria_his_c717a1e9.jpg", alt: "Salzburg Altstadt" },
    { src: "/images/salzburg_austria_his_ddc72f4b.jpg", alt: "Salzburger Dom" },
    { src: "/images/salzburg_austria_his_ea8bfaf1.jpg", alt: "Salzburg Gassen" },
    { src: "/images/salzburg_austria_mou_6393989e.jpg", alt: "Salzburg Berge" },
    { src: "/images/salzburg_austria_mou_7fa6ee31.jpg", alt: "Salzburg Landschaft" },
    { src: "/images/salzburg_cityscape_sunset_view.png", alt: "Salzburg Sonnenuntergang" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1>Salzburg</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg ist kompakt, zu Fuß gut zu erkunden und trotzdem voll von
            Gegensätzen: klassische Musik, moderner Tourismus, ruhige Gassen und
            volle Plätze.
          </p>

          <h2>Salzburg Impressionen</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {salzburg_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Stadtgefühl</h2>
          <p style={{ lineHeight: 1.7 }}>
            Viele Wege führen über die Salzach. Je nach Licht wirkt der Blick
            auf Festung und Altstadt jedes Mal ein bisschen anders.
          </p>

          <h2>Einige Lieblingsorte</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Bereich Mirabell</strong> – Gärten, Sicht auf die Festung und ein guter Ausgangspunkt für Spaziergänge.
            </li>
            <li>
              <strong>Getreidegasse und Seitengassen</strong> – klassisches Salzburg-Gefühl, kleine Durchgänge, Mischung aus Touristen und Einheimischen.
            </li>
            <li>
              <strong>Entlang der Salzach</strong> – simpel, aber effektiv, vor allem zum Sonnenuntergang.
            </li>
          </ul>

          <p style={{ lineHeight: 1.7, marginTop: "1.5rem", color: "var(--color-muted)" }}>
            Jede Ecke Salzburgs erzählt eine Geschichte – ob in der Architektur, den Menschen oder in den alltäglichen Momenten.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
