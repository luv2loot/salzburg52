"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import MediaStrip from "@/components/MediaStrip";

import { getGreetingForTime, getHeroCopy } from "@/lib/copy";
import { getRandomSnippet } from "@/lib/quotes";

const LANG = "es";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

export default function EsHomePage() {
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
                  ? "Cita"
                  : snippet.kind === "fact"
                  ? "Dato curioso"
                  : "Sólo por diversión"}
              </p>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">De qué va esta página</h2>
            <p className="feature-text">
              Salzburg52 es un espacio personal donde se mezclan recepción de
              hotel, estructura y un poco de vida en Salzburgo.
            </p>
            <ul className="feature-list">
              <li>Presentar de forma directa quién soy y cómo trabajo.</li>
              <li>Ofrecer una forma simple de contacto.</li>
              <li>
                Ir sumando poco a poco rincones y notas breves de la ciudad.
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
