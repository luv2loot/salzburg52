"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "it";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GalleryCard({ img, idx }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)",
        cursor: "pointer"
      }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.64, delay: idx * 0.095, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.img 
        src={img.src} 
        alt={img.alt} 
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

export default function ItInfoPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Hall di Hotel di Lusso" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Design Interno dell'Hotel" },
    { src: "/images/fine_dining_experience.png", alt: "Esperienza Gastronomica" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Hotel di Lusso" },
    { src: "/images/professional_hospitality_service.png", alt: "Servizio Professionale" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Camera Premium" }
  ];

  const philosophyItems = [
    "Ascolto attento e risposte ponderate alle esigenze degli ospiti",
    "Comunicazione chiara e trasmissione organizzata delle informazioni",
    "Mantenimento della compostezza ed eleganza in ogni situazione",
    "Interazioni oneste e cortesi invece di gentilezze superficiali"
  ];

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main className="app-shell">
        <motion.div
          ref={heroRef}
          style={{ marginBottom: "2rem", borderRadius: "18px", overflow: "hidden", height: "280px", boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/images/professional_hospita_96a18705.jpg" alt="Ospitalità professionale" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>

        <motion.div
          className="surface"
          style={{ padding: "2rem 2.2rem" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h1 variants={itemVariants} style={{ marginTop: 0 }}>Chi Sono - Salzburg52</motion.h1>
          <motion.p variants={itemVariants} style={{ lineHeight: 1.7 }}>
            Salzburg52 è il mio marchio professionale e portfolio come apprendista presso 
            l'HYPERION Hotel Salisburgo. Questo spazio condivide il mio percorso nello sviluppo 
            dell'esperienza nell'ospitalità professionale, combinando apprendimento pratico 
            con approfondimenti sull'eccellenza del servizio e la conoscenza autentica di Salisburgo.
          </motion.p>
          <motion.p variants={itemVariants} style={{ lineHeight: 1.7 }}>
            La mia formazione si costruisce attraverso il lavoro alla reception dell'HYPERION Hotel Salisburgo, 
            dove imparo l'importanza dell'attenzione ai dettagli, del professionalismo sereno 
            e della cura autentica per creare esperienze memorabili per gli ospiti.
          </motion.p>

          <AnimatedSection delay={0.1}>
            <h2>Galleria dell'Ospitalità</h2>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <GalleryCard key={idx} img={img} idx={idx} />
            ))}
          </div>

          <AnimatedSection delay={0.1}>
            <h2>Il Mio Approccio</h2>
            <p style={{ lineHeight: 1.7 }}>
              Credo in un'erogazione di servizi strutturata combinata con una calorosa 
              ospitalità. Ogni interazione con gli ospiti è un'opportunità per applicare 
              ciò che ho imparato e mostrare il fascino di Salisburgo mantenendo standard professionali.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2>Filosofia Professionale</h2>
            <motion.ul
              style={{ lineHeight: 1.8 }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {philosophyItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2>Il Mio Percorso all'HYPERION</h2>
            <p style={{ lineHeight: 1.7 }}>
              Il mio apprendistato all'HYPERION Hotel Salisburgo è stato trasformativo—dall'apprendimento dei fondamenti delle operazioni di reception allo sviluppo di una profonda comprensione dell'ospitalità di lusso. Ogni giorno porta nuove opportunità per crescere e perfezionare le mie competenze.
            </p>
            <motion.a
              href={`/${LANG}/journey`}
              className="glass-button-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Scopri di più
              <span style={{ fontSize: "1.1em" }}>→</span>
            </motion.a>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
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
          </AnimatedSection>
        </motion.div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
