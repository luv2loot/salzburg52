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

const LANG = "en";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

export default function EnHomePage() {
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
                  ? "Quote"
                  : snippet.kind === "fact"
                  ? "Fun fact"
                  : "Just for fun"}
              </p>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">What this site is for</h2>
            <p className="feature-text">
              Salzburg52 is a small personal hub: a mix of hospitality,
              structure, and a bit of city life from Salzburg.
            </p>
            <ul className="feature-list">
              <li>Get a quick idea of who I am and how I work.</li>
              <li>Have a simple way to reach me if needed.</li>
              <li>Collect personal notes and spots around Salzburg over time.</li>
            </ul>
          </div>
        </section>

        <MediaStrip />
      </main>
      <Footer lang={LANG} />
    </>
  );
}
