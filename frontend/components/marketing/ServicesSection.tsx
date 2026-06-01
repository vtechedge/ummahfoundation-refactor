import Link from "next/link";
import {
  Moon, Heart, BookOpen, Users, Star, HandHeart, Phone, ArrowRight, Clock
} from "lucide-react";
import { communityServices, contact, type CommunityService } from "@/lib/mock-data";
import { SectionHeader } from "@/components/shared/Section";

const ICON_MAP: Record<CommunityService["icon"], React.ReactNode> = {
  heart:           <Heart className="h-6 w-6" />,
  "book-open":     <BookOpen className="h-6 w-6" />,
  users:           <Users className="h-6 w-6" />,
  star:            <Star className="h-6 w-6" />,
  moon:            <Moon className="h-6 w-6" />,
  "hands-helping": <HandHeart className="h-6 w-6" />,
};

type CardTheme = {
  stripe: string;
  iconBg: string;
  iconColor: string;
};

const THEMES: Record<string, CardTheme> = {
  s1: { stripe: "#C9A227", iconBg: "#FDF8EC", iconColor: "#B8870F" },
  s2: { stripe: "#1E7A3A", iconBg: "rgba(255,255,255,0.12)", iconColor: "#C9A227" }, // isFuneral
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
      className="group flex gap-4 items-start rounded-xl p-5 transition-all duration-300 ease-out shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
      style={{
        backgroundColor: isFuneral ? "#4E0C17" : "#ffffff",
        border: isFuneral ? "none" : "1px solid #EFECE6",
      }}
    >
      {/* Icon Chip on the Left */}
      <div
        className="h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
        style={{ 
          backgroundColor: isFuneral ? "rgba(255,255,255,0.12)" : theme.iconBg, 
          color: isFuneral ? "#C9A227" : theme.iconColor 
        }}
      >
        {ICON_MAP[s.icon]}
      </div>

      {/* Card Content on the Right */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className={`font-bold text-[17px] font-sans leading-snug ${isFuneral ? "text-white" : "text-ink"}`}>
            {s.title}
          </h3>
          {isFuneral && (
            <div className="flex items-center gap-1 rounded-full px-2.5 py-0.5 flex-shrink-0 animate-pulse"
              style={{ backgroundColor: "rgba(201,162,39,0.18)" }}>
              <Clock className="h-3 w-3 text-gold-300" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300">24 hrs</span>
            </div>
          )}
        </div>

        <p className={`text-sm leading-relaxed mb-4 ${isFuneral ? "text-white/70" : "text-muted"}`}>
          {s.description}
        </p>

        {/* CTA */}
        <div>
          {isFuneral ? (
            <a
              href={contact.masjidPhoneHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-gold-300 hover:text-gold-200 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call {contact.masjidPhone}
            </a>
          ) : (
            <Link
              href={s.ctaHref}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-islamic-600 hover:text-islamic-800 transition-colors group-hover:gap-2.5"
            >
              {s.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
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

        {/* Card grid — all 6 services, 2 columns layout */}
        <div className="grid sm:grid-cols-2 gap-5">
          {communityServices.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>

        {/* Footer note box design */}
        <div 
          className="mt-8 rounded-xl p-4 text-center border border-[#0D3C1D] shadow-[0_4px_20px_rgba(13,60,29,0.05)]"
          style={{ backgroundColor: "#0D3C1D" }}
        >
          <p className="text-sm text-white/80 font-medium font-sans">
            All services are available to the community &middot;{" "}
            <a href={`mailto:${contact.email}`} className="text-gold-300 hover:text-gold-200 hover:underline transition-colors font-semibold">
              {contact.email}
            </a>{" "}
            &middot;{" "}
            <a href={contact.masjidPhoneHref} className="text-gold-300 hover:text-gold-200 hover:underline transition-colors font-semibold">
              {contact.masjidPhone}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
