"use client";

import { useEffect, useRef } from "react";
import data from "@emoji-mart/data";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

export function EmojiPicker({ onEmojiSelect, className = "" }: EmojiPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pickerInstance: any = null;

    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      import("emoji-mart").then(({ Picker }) => {
        if (containerRef.current) {
          const isDark = document.documentElement.classList.contains("dark");

          pickerInstance = new Picker({
            parent: containerRef.current,
            data,
            theme: isDark ? "dark" : "light",
            locale: "pt",
            previewPosition: "none",
            skinTonePosition: "none",
            navPosition: "top",
            perLine: 8,
            maxFrequentRows: 1,
            onEmojiSelect: (emoji: any) => {
              if (emoji && emoji.native) {
                onEmojiSelect(emoji.native);
              }
            },
          });
        }
      });
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [onEmojiSelect]);

  return (
    <div
      ref={containerRef}
      className={`rounded-3xl overflow-hidden shadow-2xl border border-light-300 dark:border-gold-500/30 inline-block max-w-full ${className}`}
    />
  );
}
