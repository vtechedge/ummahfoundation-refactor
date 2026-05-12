"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export function ScrollButtons() {
  const [show, setShow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setShow(scrolled > 200);
      setAtBottom(maxScroll - scrolled < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div
      className="hidden sm:flex fixed bottom-8 right-6 md:right-10 z-50 flex-col gap-3 transition-all duration-400"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0)" : "translateY(12px)",
      }}
    >
      {/* Scroll to top — always visible once show=true */}
      <button
        id="scroll-top-btn"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        title="Back to top"
        className="w-11 h-11 rounded-full bg-gold-400 text-islamic-900 shadow-soft flex items-center justify-center hover:bg-gold-300 hover:-translate-y-1 active:scale-95 transition-all duration-300"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Scroll to bottom — hidden when already at bottom */}
      <button
        id="scroll-down-btn"
        aria-label="Scroll to bottom"
        onClick={scrollToBottom}
        title="Scroll to bottom"
        className="w-11 h-11 rounded-full bg-islamic-700 text-cream shadow-soft flex items-center justify-center hover:bg-islamic-600 hover:translate-y-1 active:scale-95 transition-all duration-300"
        style={{
          opacity: atBottom ? 0 : 1,
          pointerEvents: atBottom ? "none" : "auto",
          transform: atBottom ? "scale(0.85)" : "scale(1)",
        }}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
}
