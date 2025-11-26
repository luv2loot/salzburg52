"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

export default function FrInfoPage() {
  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Hall d'Hôtel de Luxe" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Design Intérieur d'Hôtel" },
    { src: "/images/fine_dining_experience.png", alt: "Expérience Gastronomique" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Hôtel de Luxe" },
    { src: "/images/professional_hospitality_service.png", alt: "Service Professionnel" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Chambre Premium" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div style={{ marginBottom: "2rem", borderRadius: "18px", overflow: "hidden", height: "280px", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}>
          <img src="/images/professional_hospita_96a18705.jpg" alt="Hospitalité professionnelle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1 style={{ marginTop: 0 }}>À Propos de Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 est ma marque professionnelle et mon portfolio en tant qu'apprenti 
            à l'HYPERION Hotel Salzbourg. Cet espace partage mon parcours dans le développement 
            d'une expertise en hospitalité professionnelle, combinant apprentissage pratique 
            et réflexions sur l'excellence du service et la connaissance authentique de Salzbourg.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Ma formation se construit à travers le travail à la réception de l'HYPERION Hotel Salzbourg, 
            où j'apprends l'importance de l'attention aux détails, du professionnalisme serein 
            et du soin authentique pour créer des expériences mémorables pour les clients.
          </p>

          <h2>Galerie d'Hospitalité</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Mon Approche</h2>
          <p style={{ lineHeight: 1.7 }}>
            Je crois en une prestation de services structurée combinée à une hospitalité 
            chaleureuse. Chaque interaction avec les clients est une opportunité d'appliquer 
            ce que j'ai appris et de présenter le charme de Salzbourg tout en maintenant 
            des standards professionnels.
          </p>

          <h2>Philosophie Professionnelle</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Écoute attentive et réponses réfléchies aux besoins des clients</li>
            <li>Communication claire et transmission organisée de l'information</li>
            <li>Maintien du calme et de l'élégance en toutes situations</li>
            <li>Interactions honnêtes et courtoises plutôt que des politesses superficielles</li>
          </ul>

          <h2>Me Contacter</h2>
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
