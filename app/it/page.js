"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import MediaStrip from "@/components/MediaStrip";

import { getGreetingForTime, getHeroCopy } from "@/lib/copy";
import { getRandomSnippet } from "@/lib/quotes";

const LANG = "it";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

export default function ItHomePage() {
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
                  ? "Citazione"
                  : snippet.kind === "fact"
                  ? "Curiosità"
                  : "Solo per ridere"}
              </p>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">A cosa serve questo sito</h2>
            <p className="feature-text">
              Salzburg52 è un piccolo spazio personale: ospitalità, struttura e
              un po&rsquo; di vita a Salisburgo vista dal front office.
            </p>
            <ul className="feature-list">
              <li>Far capire velocemente chi sono e come lavoro.</li>
              <li>Dare un contatto semplice, se serve.</li>
              <li>
                Raccogliere nel tempo appunti e posti preferiti in città.
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
