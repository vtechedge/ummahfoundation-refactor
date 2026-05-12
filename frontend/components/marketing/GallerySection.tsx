// Phase 5 — Proof of activity.
// NOT an aesthetic grid. Real events, real community, real masjid.
// Visual proof = trust multiplier. Captions are evidence, not decoration.

import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/mock-data";

export function GallerySection() {
  return (
    <section className="bg-white py-10 sm:py-12 border-t border-gray-100">
      <div className="container-tight">

        {/* ── Section header ── */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-islamic-600"><span className="text-gold-400 mr-1.5">◆</span>
              Our community
            </p>
            <h2 className="mt-0.5 text-2xl sm:text-3xl font-bold text-ink font-sans">
              Community in Action
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex-shrink-0 text-[15px] text-islamic-600 font-semibold hover:text-islamic-700 transition-colors mt-1"
          >
            View all photos →
          </Link>
        </div>

        {/* ── Dense 3-col grid: evidence first, aesthetics second ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {galleryImages.map((img, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden rounded bg-gray-100 group ${
                // Make first image larger — it's the masjid itself
                i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[280px]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 50vw, 33vw"}
                loading={i < 3 ? "eager" : "lazy"}
              />
              {/* Caption overlay — evidence, not decoration */}
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-semibold">{img.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-4 text-sm text-center text-muted">
          Real events, real people, real community — Masjid Al-Ummah, Oshawa ON
        </p>

      </div>
    </section>
  );
}
