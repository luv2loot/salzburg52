"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const LANG = "fr";

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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.66, delay: idx * 0.11, ease: [0.16, 1, 0.3, 1] }}
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

export default function FrInfoPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const hospitality_images = [
    { src: "/images/luxury_hotel_lobby_elegance.png", alt: "Hall d'Hôtel de Luxe" },
    { src: "/images/luxury_hotel_interio_59b25bc9.jpg", alt: "Design Intérieur d'Hôtel" },
    { src: "/images/fine_dining_experience.png", alt: "Expérience Gastronomique" },
    { src: "/images/luxury_hotel_interio_aa4bb2e2.jpg", alt: "Hôtel de Luxe" },
    { src: "/images/professional_hospitality_service.png", alt: "Service Professionnel" },
    { src: "/images/luxury_hotel_interio_dd2a3b13.jpg", alt: "Chambre Premium" }
  ];

  const philosophyItems = [
    "Écoute attentive et réponses réfléchies aux besoins des clients",
    "Communication claire et transmission organisée de l'information",
    "Maintien du calme et de l'élégance en toutes situations",
    "Interactions honnêtes et courtoises plutôt que des politesses superficielles"
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
          <img src="/images/professional_hospita_96a18705.jpg" alt="Hospitalité professionnelle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>

        <motion.div
          className="surface"
          style={{ padding: "2rem 2.2rem" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h1 variants={itemVariants} style={{ marginTop: 0 }}>À Propos de Salzburg52</motion.h1>
          <motion.p variants={itemVariants} style={{ lineHeight: 1.7 }}>
            Salzburg52 est ma marque professionnelle et mon portfolio en tant qu'apprenti 
            à l'HYPERION Hotel Salzbourg. Cet espace partage mon parcours dans le développement 
            d'une expertise en hospitalité professionnelle, combinant apprentissage pratique 
            et réflexions sur l'excellence du service et la connaissance authentique de Salzbourg.
          </motion.p>
          <motion.p variants={itemVariants} style={{ lineHeight: 1.7 }}>
            Ma formation se construit à travers le travail à la réception de l'HYPERION Hotel Salzbourg, 
            où j'apprends l'importance de l'attention aux détails, du professionnalisme serein 
            et du soin authentique pour créer des expériences mémorables pour les clients.
          </motion.p>

          <AnimatedSection delay={0.1}>
            <h2>Galerie d'Hospitalité</h2>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", margin: "2rem auto", maxWidth: "1000px" }}>
            {hospitality_images.map((img, idx) => (
              <GalleryCard key={idx} img={img} idx={idx} />
            ))}
          </div>

          <AnimatedSection delay={0.1}>
            <h2>Mon Approche</h2>
            <p style={{ lineHeight: 1.7 }}>
              Je crois en une prestation de services structurée combinée à une hospitalité 
              chaleureuse. Chaque interaction avec les clients est une opportunité d'appliquer 
              ce que j'ai appris et de présenter le charme de Salzbourg tout en maintenant 
              des standards professionnels.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2>Philosophie Professionnelle</h2>
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
            <h2>Mon Parcours chez HYPERION</h2>
            <p style={{ lineHeight: 1.7 }}>
              Mon apprentissage à l'HYPERION Hotel Salzbourg a été transformateur—depuis l'apprentissage des fondamentaux des opérations de réception jusqu'au développement d'une compréhension profonde de l'hospitalité de luxe. Chaque jour apporte de nouvelles opportunités de croissance et de perfectionnement de mes compétences.
            </p>
            <motion.a
              href={`/${LANG}/journey`}
              className="glass-button-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              En savoir plus
              <span style={{ fontSize: "1.1em" }}>→</span>
            </motion.a>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
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
          </AnimatedSection>
        </motion.div>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
