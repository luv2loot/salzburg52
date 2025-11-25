"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "en";

export default function EnInfoPage() {
  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Luxury Hotel Lobby" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Hotel Interior Design" },
    { src: "/images/fine_dining_experience.png", alt: "Fine Dining" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Luxury Hotel" },
    { src: "/images/professional_hospitality_service.png", alt: "Professional Service" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Premium Hotel Room" }
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
          <h1 style={{ marginTop: 0 }}>About Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 is my professional brand and portfolio as an apprentice at HYPERION Hotel Salzburg. 
            This space shares my journey developing expertise in professional hospitality, combining hands-on 
            learning with insights into service excellence and authentic Salzburg knowledge.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            My foundation is built through front office work at HYPERION Hotel Salzburg, 
            where I'm learning the importance of attention to detail, calm professionalism, 
            and genuine care in creating memorable guest experiences.
          </p>

          <h2>Hospitality Gallery</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>My Approach</h2>
          <p style={{ lineHeight: 1.7 }}>
            I believe in structured service delivery combined with warm hospitality. 
            Every guest interaction is an opportunity to apply what I've learned and 
            showcase Salzburg's charm while maintaining professional standards.
          </p>

          <h2>Professional Philosophy</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Attentive listening and thoughtful responses to guest needs</li>
            <li>Clear communication and organized information delivery</li>
            <li>Maintaining composure and elegance in all situations</li>
            <li>Honest, courteous interactions over superficial pleasantries</li>
          </ul>

          <h2>Connect With Me</h2>
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
