"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import MediaStrip from "@/components/MediaStrip";
import Showcase from "@/components/Showcase";
import SnippetRefreshButton from "@/components/SnippetRefreshButton";

import { getGreetingForTime, getHeroCopy } from "@/lib/copy";
import { getRandomSnippet } from "@/lib/quotes";

const LANG = "de";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

export default function DeHomePage() {
  const [greeting, setGreeting] = useState("");
  const [snippet, setSnippet] = useState(null);

  const heroCopy = getHeroCopy(LANG);

  useEffect(() => {
    setGreeting(getGreetingForTime(LANG, new Date()));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const previousId = window.localStorage.getItem(SNIPPET_KEY) || undefined;
    const chosen = getRandomSnippet(LANG, { excludeId: previousId });
    if (chosen) {
      setSnippet(chosen);
      window.localStorage.setItem(SNIPPET_KEY, chosen.id);
    }
  }, []);

  const handleRefreshSnippet = () => {
    if (!snippet) return;
    if (typeof window === "undefined") return;

    const next = getRandomSnippet(LANG, { excludeId: snippet.id });
    if (next) {
      setSnippet(next);
      window.localStorage.setItem(SNIPPET_KEY, next.id);
    }
  };

  return (
    <>
      <Cursor />
      <Header lang={LANG} />
      <main>
        <Hero
          greeting={greeting || getGreetingForTime(LANG, new Date())}
          title={heroCopy.title}
          subtitle={heroCopy.subtitle}
          accent={heroCopy.accent}
          lang={LANG}
        />

        {snippet && (
          <section className="app-shell snippet-root">
            <div className="surface snippet-inner">
              <div className="snippet-header">
                <p className="snippet-label text-muted">
                  {snippet.kind === "quote"
                    ? "Zitat"
                    : snippet.kind === "fact"
                    ? "Wissenswertes"
                    : "Nur zum Spaß"}
                </p>
                <SnippetRefreshButton onClick={handleRefreshSnippet} />
              </div>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">Meine Professionelle Laufbahn</h2>
            <p className="feature-text">
              Als Lehrling im HYPERION Hotel Salzburg entwickle ich Expertise in 
              professioneller Gastfreundschaft und teile Einblicke in Service-Exzellenz und lokale Salzburger Kenntnisse.
            </p>
            <ul className="feature-list">
              <li>Lernen Sie aus praktischen Erfahrungen im Luxus-Gastfreundschaftsservice.</li>
              <li>Entdecken Sie praktische Einblicke in die Schaffung unvergesslicher Gästeerlebnisse.</li>
              <li>Erkunden Sie Salzburg aus der Perspektive professioneller Gastfreundschaft.</li>
            </ul>
          </div>
        </section>

        <Showcase />

        <section style={{ marginTop: "3rem" }}>
          <div className="app-shell" style={{ padding: "0 2.2rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "2rem" }}>Salzburg & Gastfreundschaft</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem", maxWidth: "900px", margin: "0 auto" }}>
              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src="/images/salzburg_austria_his_ea8bfaf1.jpg" alt="Salzburg historische Straßen" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src="/images/salzburg_austria_mou_7fa6ee31.jpg" alt="Salzburg Landschaft" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "1 / 1", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.1)", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.1)"; }}>
                <img src="/images/luxury_hotel_interio_dd2a3b13.jpg" alt="Hotel Interieur" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>

        <MediaStrip />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
