// Communication Layer — makes the site feel alive and operational.
// Unified dark green band with the utility bar above.
// Gold "NEWS" badge + white text on islamic-800 — readable, premium.
// Pure CSS marquee: no JS, pauses on hover.

import { Megaphone } from "lucide-react";
import { tickerMessages } from "@/lib/mock-data";
import { apiFetch } from "@/lib/api";

export async function AnnouncementTicker() {
  const apiMessages = await apiFetch<string[]>("/announcements/ticker");
  const messages = apiMessages?.length ? apiMessages : tickerMessages;
  if (!messages.length) return null;

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "#0D3C1D", borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-stretch h-8">

        {/* Gold NEWS badge */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-gold-400 text-islamic-900 px-4 text-[10px] font-bold uppercase tracking-widest">
          <Megaphone className="h-3 w-3 flex-shrink-0" />
          <span className="hidden sm:inline">News</span>
        </div>

        {/* Thin separator line */}
        <div className="w-px bg-white/10 flex-shrink-0" />

        {/* Scrolling strip */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fade edges — match ticker background */}
          <div
            className="absolute inset-y-0 left-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0D3C1D, transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-10 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0D3C1D, transparent)" }}
          />

          {/* Duplicated for seamless loop */}
          <div className="flex items-center h-full whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {[...messages, ...messages].map((msg, i) => (
              <span key={i} className="inline-flex items-center text-[11px] text-white/75 px-6 tracking-wide">
                {msg}
                <span className="ms-6 text-gold-400/50 text-[9px]">◆</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
