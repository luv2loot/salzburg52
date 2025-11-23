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
                  ? "Zitat"
                  : snippet.kind === "fact"
                  ? "Fun Fact"
                  : "Nur zum Spaß"}
              </p>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">Worum es auf dieser Seite geht</h2>
            <p className="feature-text">
              Salzburg52 ist eine kleine, persönliche Seite – irgendwo zwischen
              Lebenslauf, Gästeperspektive und Stadt-Notizbuch.
            </p>
            <ul className="feature-list">
              <li>Ein Eindruck, wer ich bin und wie ich arbeite.</li>
              <li>Eine einfache Möglichkeit, mich zu erreichen.</li>
              <li>
                Nach und nach mehr persönliche Orte und Eindrücke aus Salzburg.
              </li>
            </ul>
          </div>
        </section>

        <MediaStrip />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
