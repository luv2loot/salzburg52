"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LANG = "fr";

const scenarios = [
  {
    id: 1,
    situation: "Le client insiste que sa réservation est pour une chambre avec vue sur la montagne, mais vous n'avez que des vues sur la ville disponibles.",
    options: [
      { text: "S'excuser et offrir une boisson gratuite", outcome: "Le client se calme, apprécie son aperol spritz, et publie plus tard un charmant avis mentionnant 'récupération de service exceptionnelle'. +50 points d'hospitalité!" },
      { text: "Vérifier si une chambre avec vue sur la montagne devient disponible", outcome: "Vous appelez le service d'étage toutes les 10 minutes pendant 3 heures. Une chambre avec vue sur la montagne se libère! Le client est ravi. Votre bras téléphonique est maintenant définitivement tordu. Ça valait le coup!" },
      { text: "Décrire créativement la vue sur la ville comme 'esthétique de montagne urbaine'", outcome: "Le client regarde le parking, puis vous, puis le parking à nouveau. 'Je suppose que ces bâtiments ont des sommets?' Vous avez inventé une nouvelle philosophie de l'hospitalité." }
    ]
  },
  {
    id: 2,
    situation: "Une célébrité veut s'enregistrer anonymement mais son entourage fait du bruit dans le hall.",
    options: [
      { text: "Escorter discrètement tout le monde vers une zone privée", outcome: "Crise évitée! La célébrité vous envoie une photo dédicacée. C'est une photo de vous l'air stressé. Ils ont trouvé ça artistique." },
      { text: "Faire semblant de ne pas les reconnaître du tout", outcome: "Vous maintenez un visage de poker parfait pendant que leur garde du corps déplace une corde de velours. 'Procédure d'enregistrement standard', dites-vous. La célébrité est impressionnée par votre professionnalisme." },
      { text: "Annoncer fort 'Juste un autre client normal!'", outcome: "Tout le monde se retourne pour regarder. Un touriste les reconnaît. Le chaos s'ensuit. La célébrité respecte votre énergie chaotique et vous invite à son after-party. Vous passez un super moment!" }
    ]
  },
  {
    id: 3,
    situation: "Le client demande s'il peut amener son paon de soutien émotionnel dans sa chambre.",
    options: [
      { text: "Expliquer calmement les politiques sur les animaux tout en gardant son calme", outcome: "Le client comprend. Le paon non. Il déploie ses plumes en désapprobation. Vous ne vous êtes jamais senti aussi jugé par un oiseau." },
      { text: "Suggérer le jardin de l'hôtel comme alternative", outcome: "Le paon vit maintenant dans le jardin de façon permanente. Les clients adorent. Vous avez accidentellement amélioré la note TripAdvisor. La direction est confuse mais satisfaite." },
      { text: "Demander à voir les documents du paon", outcome: "Le paon a de meilleurs documents de voyage que la plupart des clients. Plusieurs tampons de pays européens. Vous êtes légèrement intimidé." }
    ]
  },
  {
    id: 4,
    situation: "Un client appelle à 3h du matin demandant où trouver 'la meilleure cuisine locale authentique' à proximité.",
    options: [
      { text: "Recommander le kebab 24h/24 en bas de la rue", outcome: "Le client revient à 4h du matin en s'extasiant sur le döner. Il vous donne un pourboire avec du falafel restant. C'est vraiment délicieux. Meilleur encas de service jamais." },
      { text: "Expliquer que la plupart des restaurants sont fermés", outcome: "Le client soupire dramatiquement. Vous proposez de vérifier les options du minibar. Ils découvrent une passion surprenante pour le Toblerone trop cher." },
      { text: "Partager l'emplacement de votre réserve personnelle de snacks nocturnes", outcome: "Votre endroit secret de distributeur est maintenant compromis. Ça vaut le coup pour l'avis 5 étoiles mentionnant 'connaissance d'initié'. L'auditeur de nuit est soupçonneux." }
    ]
  },
  {
    id: 5,
    situation: "L'enfant du client a appuyé sur tous les boutons de l'ascenseur. Il s'arrête maintenant aux 12 étages.",
    options: [
      { text: "Attendre patiemment avec un sourire zen", outcome: "Les autres clients admirent votre calme. Le parent de l'enfant s'excuse abondamment. Vous avez atteint l'illumination de l'hospitalité au 7ème étage." },
      { text: "En faire une 'visite de l'hôtel' pour l'enfant", outcome: "Au 9ème étage, vous avez expliqué le ménage, le room service et comment fonctionnent les clés. L'enfant veut devenir directeur d'hôtel quand il sera grand. Carrière influencée!" },
      { text: "Défier l'enfant de deviner ce qu'il y a à chaque étage", outcome: "Le jeu est un succès. L'enfant devine correctement 'plus de couloirs' pour chaque étage. Il a techniquement raison. Tout le monde gagne." }
    ]
  },
  {
    id: 6,
    situation: "Un client insiste qu'il a laissé un 'objet très important' dans sa chambre mais ne se souvient pas de quoi il s'agit.",
    options: [
      { text: "Organiser une recherche approfondie de la chambre", outcome: "Vous trouvez trois chargeurs de téléphone, une chaussette et un livre de motivation. Le client se souvient soudain: c'était ses lunettes de lecture. Elles étaient sur sa tête tout le temps." },
      { text: "Poser des questions réfléchies pour rafraîchir sa mémoire", outcome: "Après 20 questions, vous avez établi que ce ne sont pas des bijoux, pas de l'électronique, et possiblement violet. C'était une balle anti-stress violette. L'ironie n'échappe à personne." },
      { text: "Suggérer de vérifier d'abord leurs poches", outcome: "Le client trouve ses clés de voiture, un reçu de 2019 et des peluches. L''objet important' était bien dans la poche n°4. Vous êtes maintenant un archéologue professionnel des poches." }
    ]
  }
];

const funQuotes = [
  { text: "La seule chose que nous devons craindre est un client avec un vol à 6h du matin et une mentalité de check-out à midi.", author: "Ancien Proverbe Hôtelier" },
  { text: "Derrière chaque réceptionniste calme se cache un tableur mental du chaos.", author: "Le Philosophe du Hall" },
  { text: "L'hospitalité est l'art de faire sentir les gens chez eux quand vous souhaiteriez qu'ils y soient vraiment.", author: "Auditeur de Nuit Inconnu" },
  { text: "Le client a toujours raison, mais la réception sait où sont les serviettes supplémentaires.", author: "Sagesse des Cartes-Clés" },
  { text: "Un hôtel n'est qu'un bâtiment jusqu'à ce que quelqu'un sourie à l'entrée.", author: "Quelqu'un Qui Avait Besoin de Café" },
  { text: "L'heure de check-out est une suggestion. L'heure de check-in est une loi.", author: "Le Manuel du Concierge" },
  { text: "La vie est courte. Séjournez quelque part avec de bons oreillers.", author: "Sagesse du Voyage Vol. 3" }
];

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

function InteractiveBackground() {
  const bgRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="playground-interactive-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(236, 72, 153, 0.15) 0%, transparent 40%),
          radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(37, 99, 235, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
          var(--color-bg)
        `,
        transition: "background 0.3s ease-out"
      }}
    />
  );
}

function PlaygroundHero() {
  return (
    <section className="app-shell hero-root">
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(37, 99, 235, 0.08) 100%)",
          border: "1px solid rgba(236, 72, 153, 0.2)"
        }}
      >
        <div className="hero-gradient-bg" style={{ opacity: 0.5 }} />

        <motion.div
          className="hero-orb hero-orb-1"
          animate={{ y: [0, -25, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)" }}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          animate={{ y: [0, 30, 0], x: [0, -25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)" }}
        />

        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.span
            variants={itemVariants}
            style={{
              display: "inline-block",
              padding: "0.5rem 1.2rem",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.15))",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#EC4899",
              marginBottom: "1rem"
            }}
          >
            🎪 L'Espace Ludique
          </motion.span>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Aire de Jeux
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Là où le travail rencontre le jeu. Testez vos instincts d'hospitalité, amusez-vous, 
            et découvrez que la vie hôtelière n'est jamais ennuyeuse.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {["🎮 Interactif", "😄 Amusant", "🏨 Ambiance Hôtelière"].map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255, 255, 255, 0.15)"
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ChaosSimulator() {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);

  const startNewScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setCurrentScenario(scenarios[randomIndex]);
    setSelectedOption(null);
    setShowOutcome(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOutcome(true);
  };

  return (
    <motion.section
      className="app-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
    >
      <div className="surface" style={{ padding: "2.5rem", background: "linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.03))" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <motion.span
            style={{
              display: "inline-block",
              padding: "0.4rem 1rem",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.1))",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#EC4899",
              marginBottom: "1rem"
            }}
          >
            🎲 Jeu Interactif
          </motion.span>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}>Simulateur de Chaos à l'Accueil</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "500px", margin: "0 auto" }}>
            Testez vos instincts d'hospitalité! Comment géreriez-vous ces scénarios hôteliers (presque) réels?
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!currentScenario ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ textAlign: "center", padding: "3rem 1rem" }}
            >
              <motion.div
                style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎰
              </motion.div>
              <motion.button
                onClick={startNewScenario}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)"
                }}
              >
                Démarrer la Simulation
              </motion.button>
            </motion.div>
          ) : !showOutcome ? (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <motion.div
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(236, 72, 153, 0.2)"
                }}
                className="theme-dark"
                data-theme-style={{
                  background: "rgba(15, 23, 42, 0.5)"
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>📞</div>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 500 }}>
                  {currentScenario.situation}
                </p>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {currentScenario.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "1rem 1.25rem",
                      background: "var(--color-bg-elevated)",
                      border: "1px solid var(--color-border-subtle)",
                      borderRadius: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}
                  >
                    <span style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.15))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#EC4899",
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(37, 99, 235, 0.08))",
                  borderRadius: "16px",
                  padding: "2rem",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  textAlign: "center"
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎉</div>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text)" }}>
                  {selectedOption.outcome}
                </p>
              </motion.div>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  onClick={startNewScenario}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    color: "white",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Scénario Suivant →
                </motion.button>
                <motion.button
                  onClick={() => setCurrentScenario(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "var(--color-bg-elevated)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "999px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  Retour au Début
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % funQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="app-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
      style={{ marginTop: "2rem" }}
    >
      <div className="surface" style={{ padding: "2.5rem", textAlign: "center" }}>
        <motion.span
          style={{
            display: "inline-block",
            padding: "0.4rem 1rem",
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08))",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: "1.5rem"
          }}
        >
          💬 Sagesse de l'Hospitalité
        </motion.span>

        <div style={{ minHeight: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p style={{
                fontSize: "1.3rem",
                fontStyle: "italic",
                lineHeight: 1.6,
                maxWidth: "600px",
                margin: "0 auto 1rem"
              }}>
                "{funQuotes[currentIndex].text}"
              </p>
              <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
                — {funQuotes[currentIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {funQuotes.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: index === currentIndex
                  ? "linear-gradient(135deg, #EC4899, #8B5CF6)"
                  : "var(--color-border-subtle)"
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FunStats() {
  const stats = [
    { emoji: "☕", value: "∞", label: "Cafés consommés" },
    { emoji: "😊", value: "100%", label: "Sourire maintenu" },
    { emoji: "🎯", value: "0", label: "Clients perdus dans les couloirs" },
    { emoji: "🌟", value: "5★", label: "Note auto-attribuée" }
  ];

  return (
    <motion.section
      className="app-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem"
      }}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="surface"
            style={{
              padding: "1.5rem 1rem",
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.02))"
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <InteractiveBackground />
      <Header lang={LANG} />
      <main>
        <PlaygroundHero />
        <ChaosSimulator />
        <QuoteCarousel />
        <FunStats />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
