"use client";

import { useState, useEffect, useMemo } from "react";

export function TypewriterEffect({ content }: { content: string[] }) {
  const words = useMemo(() => content, [content]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[currentWordIndex];
      if (!currentWord) return;

      // Add characters
      setText(currentWord.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);

      // When typing is complete for first word
      if (charIndex >= currentWord.length && currentWordIndex === 0) return;

      if (charIndex >= currentWord.length) {
        setCharIndex(0);
        setCurrentWordIndex(0);
      }
    };

    const timer = setTimeout(typeEffect, 100);
    return () => clearTimeout(timer);
  }, [charIndex, currentWordIndex, words]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-4xl font-bold">{text}</h1>
    </div>
  );
}
