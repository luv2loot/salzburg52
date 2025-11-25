"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "de";

export default function DeInfoPage() {
  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Luxury Hotel Lobby" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Hotel Interieur Design" },
    { src: "/images/fine_dining_experience.png", alt: "Fine Dining" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Luxus Hotel" },
    { src: "/images/professional_hospitality_service.png", alt: "Professioneller Service" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Premium Hotel Zimmer" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div style={{ marginBottom: "2rem", borderRadius: "18px", overflow: "hidden", height: "280px", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}>
          <img src="/images/professional_hospita_96a18705.jpg" alt="Professional hospitality" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1 style={{ marginTop: 0 }}>Über Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 ist meine professionelle Marke und Portfolio als Lehrling im HYPERION Hotel Salzburg. 
            Dieser Raum teilt meine Reise bei der Entwicklung von Expertise in professioneller Gastfreundschaft, 
            wobei praktisches Lernen mit Einblicken in Service-Exzellenz und authentisches Salzburger Wissen kombiniert wird.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Meine Grundlage wird durch Rezeptionsarbeiten im HYPERION Hotel Salzburg aufgebaut, 
            wo ich die Bedeutung von Liebe zum Detail, ruhiger Professionalität und echtem Mitgefühl 
            bei der Schaffung unvergesslicher Gästeerlebnisse lerne.
          </p>

          <h2>Gastfreundschafts-Galerie</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Mein Ansatz</h2>
          <p style={{ lineHeight: 1.7 }}>
            Ich glaube an strukturierte Serviceleistung kombiniert mit herzlicher Gastfreundschaft. 
            Jede Gästeinteraktion ist eine Gelegenheit, das Gelernte anzuwenden und Salzburgs Charme 
            zu präsentieren, während professionelle Standards bewahrt werden.
          </p>

          <h2>Professionelle Philosophie</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Aufmerksames Zuhören und durchdachte Antworten auf Gästewünsche</li>
            <li>Klare Kommunikation und organisierte Informationsvermittlung</li>
            <li>Bewahrung von Ruhe und Eleganz in allen Situationen</li>
            <li>Ehrliche, höfliche Interaktionen statt oberflächlicher Höflichkeitsfloskeln</li>
          </ul>

          <h2>Kontaktieren Sie Mich</h2>
          <p style={{ lineHeight: 1.7 }}>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
            <br />
            E-Mail:{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
