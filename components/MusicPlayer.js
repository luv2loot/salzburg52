"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const playedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      clickCountRef.current += 1;

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 300);

      if (clickCountRef.current === 2) {
        clickCountRef.current = 0;
        
        if (isPlaying && audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
          playedRef.current = false;
        } else if (!playedRef.current && audioRef.current) {
          audioRef.current.volume = 0.4;
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
          playedRef.current = true;
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/ambient_music.mp3"
        crossOrigin="anonymous"
      />
      <div className="music-hint-small">
        Double-click to {isPlaying ? "stop" : "play"} music
      </div>
    </>
  );
}
