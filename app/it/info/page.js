"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItInfoPage() {
  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Hall di Hotel di Lusso" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Design Interno dell'Hotel" },
    { src: "/images/fine_dining_experience.png", alt: "Esperienza Gastronomica" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Hotel di Lusso" },
    { src: "/images/professional_hospitality_service.png", alt: "Servizio Professionale" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Camera Premium" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div style={{ marginBottom: "2rem", borderRadius: "18px", overflow: "hidden", height: "280px", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}>
          <img src="/images/professional_hospita_96a18705.jpg" alt="Ospitalità professionale" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1 style={{ marginTop: 0 }}>Chi Sono - Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 è il mio marchio professionale e portfolio come apprendista presso 
            l'HYPERION Hotel Salisburgo. Questo spazio condivide il mio percorso nello sviluppo 
            dell'esperienza nell'ospitalità professionale, combinando apprendimento pratico 
            con approfondimenti sull'eccellenza del servizio e la conoscenza autentica di Salisburgo.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            La mia formazione si costruisce attraverso il lavoro alla reception dell'HYPERION Hotel Salisburgo, 
            dove imparo l'importanza dell'attenzione ai dettagli, del professionalismo sereno 
            e della cura autentica per creare esperienze memorabili per gli ospiti.
          </p>

          <h2>Galleria dell'Ospitalità</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Il Mio Approccio</h2>
          <p style={{ lineHeight: 1.7 }}>
            Credo in un'erogazione di servizi strutturata combinata con una calorosa 
            ospitalità. Ogni interazione con gli ospiti è un'opportunità per applicare 
            ciò che ho imparato e mostrare il fascino di Salisburgo mantenendo standard professionali.
          </p>

          <h2>Filosofia Professionale</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Ascolto attento e risposte ponderate alle esigenze degli ospiti</li>
            <li>Comunicazione chiara e trasmissione organizzata delle informazioni</li>
            <li>Mantenimento della compostezza ed eleganza in ogni situazione</li>
            <li>Interazioni oneste e cortesi invece di gentilezze superficiali</li>
          </ul>

          <h2>Contattami</h2>
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
            Email: <a href="mailto:info@salzburg52.com">info@salzburg52.com</a>
          </p>
        </div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
