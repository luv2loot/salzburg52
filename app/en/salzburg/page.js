"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "en";

export default function EnSalzburgPage() {
  const salzburg_images = [
    { src: "/images/salzburg_austria_his_c717a1e9.jpg", alt: "Salzburg Historic Center" },
    { src: "/images/salzburg_austria_his_ddc72f4b.jpg", alt: "Salzburg Cathedral" },
    { src: "/images/salzburg_austria_his_ea8bfaf1.jpg", alt: "Salzburg Old Town" },
    { src: "/images/salzburg_austria_mou_6393989e.jpg", alt: "Mountain View Salzburg" },
    { src: "/images/salzburg_austria_mou_7fa6ee31.jpg", alt: "Salzburg Landscape" },
    { src: "/images/salzburg_cityscape_sunset_view.png", alt: "Salzburg Sunset" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1>Salzburg</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg is compact, walkable, and full of contrasts: classical
            music and modern tourism, quiet corners and busy squares, mountains
            and city life.
          </p>

          <h2>City Impressions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {salzburg_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>City Atmosphere</h2>
          <p style={{ lineHeight: 1.7 }}>
            Most routes cross the river at least once. Depending on the light,
            the view towards the fortress and the old town never looks exactly
            the same twice.
          </p>

          <h2>Some Favorite Spots</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>Mirabell Area</strong> – formal gardens, views towards the fortress, and a good starting point for exploring.
            </li>
            <li>
              <strong>Getreidegasse & Side Streets</strong> – classic Salzburg atmosphere, small passages, and a mix of tourists and locals.
            </li>
            <li>
              <strong>Along the River</strong> – simple but effective: walking along the Salzach, especially around sunset.
            </li>
          </ul>

          <p style={{ lineHeight: 1.7, marginTop: "1.5rem", color: "var(--color-muted)" }}>
            Each corner of Salzburg tells a story—whether it's the architecture, the people, or the everyday moments that make this city special.
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
