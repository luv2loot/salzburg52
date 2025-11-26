"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "es";

export default function EsInfoPage() {
  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Vestíbulo de Hotel de Lujo" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Diseño Interior del Hotel" },
    { src: "/images/fine_dining_experience.png", alt: "Experiencia Gastronómica" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Hotel de Lujo" },
    { src: "/images/professional_hospitality_service.png", alt: "Servicio Profesional" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Habitación Premium" }
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <div style={{ marginBottom: "2rem", borderRadius: "18px", overflow: "hidden", height: "280px", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}>
          <img src="/images/professional_hospita_96a18705.jpg" alt="Hospitalidad profesional" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="surface" style={{ padding: "2rem 2.2rem" }}>
          <h1 style={{ marginTop: 0 }}>Acerca de Salzburg52</h1>
          <p style={{ lineHeight: 1.7 }}>
            Salzburg52 es mi marca profesional y portfolio como aprendiz en HYPERION Hotel Salzburg. 
            Este espacio comparte mi trayectoria desarrollando experiencia en hospitalidad profesional, 
            combinando aprendizaje práctico con conocimientos sobre excelencia en el servicio y 
            auténtico conocimiento de Salzburgo.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            Mi formación se construye a través del trabajo en recepción del HYPERION Hotel Salzburg, 
            donde aprendo la importancia de la atención al detalle, el profesionalismo sereno y 
            el cuidado genuino para crear experiencias memorables para los huéspedes.
          </p>

          <h2>Galería de Hospitalidad</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <h2>Mi Enfoque</h2>
          <p style={{ lineHeight: 1.7 }}>
            Creo en la prestación de servicios estructurados combinada con una cálida 
            hospitalidad. Cada interacción con los huéspedes es una oportunidad para aplicar 
            lo aprendido y mostrar el encanto de Salzburgo manteniendo estándares profesionales.
          </p>

          <h2>Filosofía Profesional</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Escucha atenta y respuestas reflexivas a las necesidades de los huéspedes</li>
            <li>Comunicación clara y entrega organizada de información</li>
            <li>Mantener la compostura y elegancia en todas las situaciones</li>
            <li>Interacciones honestas y corteses en lugar de formalidades superficiales</li>
          </ul>

          <h2>Conecta Conmigo</h2>
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
