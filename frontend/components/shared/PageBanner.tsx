import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageBanner({
  label,
  title,
  description,
  breadcrumb,
}: {
  label: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <div
      className="relative overflow-hidden animate-banner-gradient"
      style={{
        background: "linear-gradient(-45deg, #135027, #1E7A3A, #8B1A20, #A5851C, #196631, #135027)",
        backgroundSize: "400% 400%",
      }}
    >
      {/* Islamic geometric dot grid — subtle overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,162,39,0.22) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Diagonal light sweep — animates across */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none animate-banner-sweep"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
          width: "60%",
        }}
      />

      {/* Large Arabic watermark — far right, very low opacity */}
      <div
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        style={{
          fontFamily: "Noto Naskh Arabic, serif",
          fontSize: "5rem",
          color: "rgba(255,255,255,0.06)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "0.05em",
        }}
        dir="rtl"
      >
        بِسْمِ ٱللَّهِ
      </div>

      {/* Gold top + bottom accent lines */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, #C9A227 30%, #C9A227 70%, transparent 100%)", opacity: 0.7 }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, #C9A227 30%, #C9A227 70%, transparent 100%)", opacity: 0.5 }}
      />

      <div className="relative container-tight py-5 sm:py-6">
        <div className="flex items-center gap-6">

          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-1.5 flex items-center gap-1 text-[11px] text-white/45">
                <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                {breadcrumb.map((crumb) => (
                  <span key={crumb.href} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    <Link href={crumb.href} className="hover:text-white/70 transition-colors">
                      {crumb.label}
                    </Link>
                  </span>
                ))}
              </nav>
            )}

            {/* Eyebrow + title inline */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300 flex-shrink-0 drop-shadow-sm">
                <span className="text-gold-400 mr-1.5">◆</span>
                {label}
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-sm">
                {title}
              </h1>
            </div>

            {/* Description */}
            {description && (
              <p className="mt-1 text-sm text-white/60 leading-relaxed line-clamp-1">
                {description}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
