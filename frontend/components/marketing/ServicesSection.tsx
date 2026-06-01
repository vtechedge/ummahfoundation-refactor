import Link from "next/link";
import {
  Moon, Heart, BookOpen, Users, Star, HandHeart, Phone, ArrowRight, Clock
} from "lucide-react";
import { communityServices, contact, type CommunityService } from "@/lib/mock-data";
import { SectionHeader } from "@/components/shared/Section";

const ICON_MAP: Record<CommunityService["icon"], React.ReactNode> = {
  heart:           <Heart className="h-7 w-7" />,
  "book-open":     <BookOpen className="h-7 w-7" />,
  users:           <Users className="h-7 w-7" />,
  star:            <Star className="h-7 w-7" />,
  moon:            <Moon className="h-7 w-7" />,
  "hands-helping": <HandHeart className="h-7 w-7" />,
};

type CardTheme = {
  stripe: string;
  iconBg: string;
  iconColor: string;
  dark?: boolean;
};

const THEMES: Record<string, CardTheme> = {
  s1: { stripe: "#C9A227", iconBg: "#FDF8EC", iconColor: "#B8870F" },
  s2: { stripe: "#1E7A3A", iconBg: "rgba(255,255,255,0.12)", iconColor: "#C9A227", dark: true },
  s3: { stripe: "#1E7A3A", iconBg: "#E8F5EE", iconColor: "#1E7A3A" },
  s4: { stripe: "#0891B2", iconBg: "#EFF8FB", iconColor: "#0891B2" },
  s5: { stripe: "#C9A227", iconBg: "#FDF8EC", iconColor: "#B8870F" },
  s6: { stripe: "#1E7A3A", iconBg: "#E8F5EE", iconColor: "#1E7A3A" },
};

function ServiceCard({ s }: { s: CommunityService }) {
  const theme = THEMES[s.id];
  const isFuneral = s.id === "s2";

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      style={{
        backgroundColor: theme.dark ? "#0D3C1D" : "#ffffff",
        border: theme.dark ? "none" : "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Icon + optional badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: theme.iconBg, color: theme.iconColor }}
          >
            {ICON_MAP[s.icon]}
          </div>
          {isFuneral && (
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{ backgroundColor: "rgba(201,162,39,0.18)" }}>
              <Clock className="h-3.5 w-3.5 text-gold-300" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-gold-300">24 hrs</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-xl leading-snug mb-2 ${theme.dark ? "text-white" : "text-ink"}`}>
          {s.title}
        </h3>

        {/* Description */}
        <p className={`text-[15px] leading-relaxed flex-1 mb-6 ${theme.dark ? "text-white/65" : "text-muted"}`}>
          {s.description}
        </p>

        {/* CTA */}
        {isFuneral ? (
          <a
            href={contact.masjidPhoneHref}
            className="inline-flex items-center gap-2 text-[15px] font-bold text-gold-300 hover:text-gold-200 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call {contact.masjidPhone}
          </a>
        ) : (
          <Link
            href={s.ctaHref}
            className="inline-flex items-center gap-1.5 text-[15px] font-bold text-islamic-600 hover:text-islamic-800 transition-colors group-hover:gap-2.5"
          >
            {s.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function ServicesSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 lg:py-20 bg-cream border-t border-gray-200"
    >
      <div className="container-tight">

        {showHeader && (
          <SectionHeader
            label="Available to the community"
            title="How We Serve You"
            action={
              <a
                href={contact.masjidPhoneHref}
                className="flex items-center gap-2 text-base font-bold text-islamic-700 hover:text-islamic-800 transition-colors"
              >
                <Phone className="h-5 w-5" />
                {contact.masjidPhone}
              </a>
            }
          />
        )}

        {/* Card grid — all 6 services, uniform cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {communityServices.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-sm text-muted/70 text-center">
          All services are available to the community &middot;{" "}
          <a href={`mailto:${contact.email}`} className="text-islamic-600 hover:underline">
            {contact.email}
          </a>{" "}
          &middot;{" "}
          <a href={contact.masjidPhoneHref} className="text-islamic-600 hover:underline">
            {contact.masjidPhone}
          </a>
        </p>

      </div>
    </section>
  );
}
