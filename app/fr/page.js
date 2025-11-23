"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import MediaStrip from "@/components/MediaStrip";
import SnippetRefreshButton from "@/components/SnippetRefreshButton";
import { getGreetingForTime, getHeroCopy } from "@/lib/copy";
import { getRandomSnippet } from "@/lib/quotes";

const LANG = "fr";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

export default function FrHomePage() {
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
              <p className="snippet-label text-muted">
                {snippet.kind === "quote"
                  ? "Citation"
                  : snippet.kind === "fact"
                  ? "Fait intéressant"
                  : "Juste pour sourire"}
              </p>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">L’idée du site</h2>
            <p className="feature-text">
              Salzburg52 est un petit espace personnel sur l’hôtellerie, le
              front office et la vie quotidienne à Salzbourg.
            </p>
            <ul className="feature-list">
              <li>Donner une image claire de qui je suis et de mon travail.</li>
              <li>Proposer un moyen simple de me contacter si besoin.</li>
              <li>Partager quelques lieux et impressions de la ville.</li>
            </ul>
          </div>
        </section>

        <MediaStrip />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
