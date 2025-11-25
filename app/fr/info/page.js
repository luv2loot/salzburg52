"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

export default function FrInfoPage() {
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
          <h1 style={{ marginTop: 0 }}>À Propos de Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 incarne l'essence de l'hospitalité raffinée dans l'une des villes 
            les plus enchanteresses d'Europe. Enracinés dans l'excellence du service 
            professionnel et l'expertise locale, nous représentons l'harmonie parfaite 
            entre l'hospitalité autrichienne traditionnelle et les standards contemporains.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Notre fondement repose sur l'excellence du front office de l'HYPERION Hotel Salzburg, 
            où l'attention aux détails, le professionnalisme serein et le soin authentique 
            créent des expériences mémorables pour les clients.
          </p>

          <h2>Galerie d'Hospitalité</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "18px", overflow: "hidden", height: "200px", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)", transition: "transform 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Notre Approche</h2>
          <p style={{ lineHeight: 1.7 }}>
            Nous croyons en une prestation de services structurée combinée à une hospitalité 
            chaleureuse. Chaque interaction avec les clients est une opportunité de présenter 
            le charme de Salzbourg tout en maintenant les plus hauts standards professionnels.
          </p>

          <h2>Philosophie de Service</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Écoute attentive et réponses réfléchies aux besoins des clients</li>
            <li>Communication claire et transmission organisée de l'information</li>
            <li>Maintien du calme et de l'élégance en toutes situations</li>
            <li>Interactions honnêtes et courtoises plutôt que des politesses superficielles</li>
          </ul>

          <h2>Nous Contacter</h2>
          <p style={{ lineHeight: 1.7 }}>
            Instagram :{" "}
            <a
              href="https://www.instagram.com/am.rsbgg"
              target="_blank"
              rel="noreferrer"
            >
              @am.rsbgg
            </a>
            <br />
            E-mail :{" "}
            <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
