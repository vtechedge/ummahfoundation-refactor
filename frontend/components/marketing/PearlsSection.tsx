import { pearls } from "@/lib/mock-data";

const ROW1 = [...pearls, ...pearls];
const ROW2 = [...[...pearls].reverse(), ...[...pearls].reverse()];

function PearlCard({
  arabic,
  text,
  source,
  gold = false,
}: {
  arabic?: string;
  text: string;
  source: string;
  gold?: boolean;
}) {
  return (
    <div
      className={`
        w-72 flex-shrink-0 rounded-xl px-5 py-4 border
        ${gold
          ? "bg-gold-400/8 border-gold-400/25"
          : "bg-white/5 border-white/10"
        }
      `}
    >
      {arabic && (
        <p dir="rtl" className="font-arabic text-xl leading-[1.9] text-gold-300 mb-2">
          {arabic}
        </p>
      )}
      <p className="text-[15px] font-semibold text-cream leading-snug">
        &ldquo;{text}&rdquo;
      </p>
      <p className="mt-2 text-sm text-white/40 truncate">{source}</p>
    </div>
  );
}

export function PearlsSection() {
  return (
    <section className="bg-islamic-900 py-8 overflow-hidden">

      {/* Gold dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(201,162,39,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Header */}
      <div className="relative container-tight text-center mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300">
          <span className="mr-1.5 opacity-70">◆</span>Pearls of Wisdom
        </p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-cream font-sans">
          Wisdom from the Quran &amp; Sunnah
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-3 group">
        {/* edge fades */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-islamic-900 to-transparent z-10 pointer-events-none" />
        <div aria-hidden className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-islamic-900 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-3 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {ROW1.map((p, i) => (
            <PearlCard key={i} arabic={p.arabic} text={p.text} source={p.source} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative group">
        <div aria-hidden className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-islamic-900 to-transparent z-10 pointer-events-none" />
        <div aria-hidden className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-islamic-900 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-3 animate-marquee-reverse group-hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {ROW2.map((p, i) => (
            <PearlCard key={i} arabic={p.arabic} text={p.text} source={p.source} gold />
          ))}
        </div>
      </div>

    </section>
  );
}
