export function HadithSignature() {
  return (
    <section className="relative overflow-hidden bg-[#041d15] text-cream py-24 sm:py-32 lg:py-40 border-t border-white/5">
      {/* Atmospheric gradient + pattern + gold radial */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041d15] via-islamic-900 to-[#041d15]" />
        <div className="absolute inset-0 pattern-islamic opacity-[0.07]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full bg-gold-400/[0.07] blur-[120px]" />
      </div>

      <div className="container-tight relative">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold-300/70 mb-2">
          <span className="text-gold-300/50 mr-3">◆</span>
          Hadith · Sahih Muslim · 533
        </div>

        {/* Huge Arabic calligraphy — the signature moment */}
        <div
          dir="rtl"
          className="mt-12 font-arabic text-gold-200/90 leading-[1.55] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
        >
          مَنْ بَنَىٰ مَسْجِدًۭا للَّهِ
          <br />
          بَنَى ٱللَّهُ لَهُ بَيْتًۭا فِى ٱلْجَنَّةِ
        </div>

        {/* English translation — display italic */}
        <blockquote className="mt-16 lg:mt-20 max-w-4xl">
          <p className="font-sans font-bold text-[1.75rem] sm:text-[2.5rem] lg:text-[3.25rem] leading-[1.22] tracking-[-0.02em] text-cream">
            Whoever builds a masjid for Allah,
            <br />
            <span className="text-white/60">
              Allah will build for him a house in Paradise.
            </span>
          </p>
        </blockquote>

        <div className="mt-14 pt-8 border-t border-white/10 text-[12px] uppercase tracking-[0.28em] text-white/40">
          — The Prophet Muhammad{" "}
          <span className="font-arabic text-gold-300 normal-case tracking-normal text-base">
            ﷺ
          </span>
        </div>
      </div>
    </section>
  );
}
