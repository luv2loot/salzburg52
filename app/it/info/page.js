"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

export default function ItInfoPage() {
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
          <h1 style={{ marginTop: 0 }}>Chi Siamo - Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 incarna l'essenza dell'ospitalità raffinata in una delle città 
            più incantevoli d'Europa. Radicati nell'eccellenza del servizio professionale 
            e nell'esperienza locale, rappresentiamo l'armonia perfetta tra l'ospitalità 
            austriaca tradizionale e gli standard contemporanei.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Il nostro fondamento risiede nell'eccellenza del front office dell'HYPERION Hotel Salzburg, 
            dove l'attenzione ai dettagli, il professionalismo sereno e la cura autentica 
            creano esperienze memorabili per gli ospiti.
          </p>

          <h2>Galleria dell'Ospitalità</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "18px", overflow: "hidden", height: "200px", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.12)", transition: "transform 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Il Nostro Approccio</h2>
          <p style={{ lineHeight: 1.7 }}>
            Crediamo in un'erogazione di servizi strutturata combinata con una calorosa 
            ospitalità. Ogni interazione con gli ospiti è un'opportunità per mostrare 
            il fascino di Salisburgo mantenendo i più alti standard professionali.
          </p>

          <h2>Filosofia di Servizio</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Ascolto attento e risposte ponderate alle esigenze degli ospiti</li>
            <li>Comunicazione chiara e trasmissione organizzata delle informazioni</li>
            <li>Mantenimento della compostezza ed eleganza in ogni situazione</li>
            <li>Interazioni oneste e cortesi invece di gentilezze superficiali</li>
          </ul>

          <h2>Contattaci</h2>
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
