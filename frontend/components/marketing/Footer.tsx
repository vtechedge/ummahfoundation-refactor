// Phase 5 — Final trust checkpoint.
// 4 columns: Identity · Quick Links · Contact · Today's Prayer Times
// Mini prayer table is the most-used mobile feature — prayer times at any scroll depth.

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contact, prayerTimes, CHARITY_BN } from "@/lib/mock-data";

const QUICK_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Prayer Times",  href: "/prayer-times" },
  { label: "Programs",      href: "/programs" },
  { label: "Services",      href: "/services" },
  { label: "Events",        href: "/events" },
  { label: "Donate",        href: "/donate" },
  { label: "About",         href: "/about" },
  { label: "Contact",       href: "/contact" },
];

const GIVE_LINKS = [
  { label: "Buy a Musalla",  href: "/donate" },
  { label: "Monthly Pledge", href: "/donate" },
  { label: "Zakat",          href: "/donate" },
  { label: "Sadaqah",        href: "/donate" },
];

const FOOTER_PRAYERS = prayerTimes
  .filter((p) => p.name !== "Sunrise")
  .map((p) => ({
    name: p.name,
    time: p.jamat ?? p.begins,
    isJummah: p.name === "Jummah",
  }));

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#4E0C17" }} className="text-white/95">

      {/* ── Main 4-column body ── */}
      <div className="container-tight pt-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">

          {/* Col 1 — Identity */}
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-4">
              <p className="text-white font-extrabold text-base leading-snug">Ummah Foundation</p>
              <p className="text-white/80 text-xs font-semibold mt-0.5">of Durham Region</p>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-[220px]">{contact.tagline}</p>
            <p className="mt-3 text-xs text-white/50">Est. 2011 · Oshawa, Ontario</p>
            <div className="mt-5">
              <Link
                href="/donate"
                className="block w-full text-center bg-gold-400 hover:bg-gold-300 text-islamic-950 text-xs font-extrabold py-2 rounded transition-colors shadow-md"
              >
                Donate Now
              </Link>
              <p className="mt-2 text-[10px] text-center text-white/50">
                E-Transfer:{" "}
                <a href={`mailto:${contact.etransfer}`} className="text-white hover:text-gold-300 transition-colors underline font-medium">
                  {contact.etransfer}
                </a>
              </p>
            </div>
          </div>

          {/* Col 2 — Contact Details */}
          <div className="col-span-1">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-300 mb-4">Contact Us</h4>
            <div className="space-y-3 text-xs font-medium">
              <a
                href="https://maps.google.com/?cid=16305318455083149182"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/90 hover:text-gold-300 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-gold-300" />
                <span>{contact.address.line1}<br />{contact.address.line2}</span>
              </a>
              <a href={contact.masjidPhoneHref} className="flex items-center gap-2 text-white/90 hover:text-gold-300 transition-colors">
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-gold-300" />
                {contact.masjidPhone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-white/90 hover:text-gold-300 transition-colors">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-gold-300" />
                {contact.email}
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Open daily · call for hours</span>
              </div>
            </div>

            {/* Social media placeholder */}
            <div className="mt-5 pt-3 border-t border-white/10">
              <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold">Follow Us</p>
              <p className="text-[10px] text-white/40 mt-1 italic">Social links coming soon</p>
            </div>
          </div>

          {/* Col 3 — Newsletter */}
          <div className="col-span-1">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-300 mb-3">Newsletter</h4>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Stay updated with Friday khutbahs, events, and campaign news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/15 border border-white/20 rounded px-2.5 py-2 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-gold-400 hover:bg-gold-300 text-islamic-950 text-xs font-extrabold px-3 py-2 rounded transition-colors shadow-sm"
              >
                Join
              </button>
            </form>
          </div>

          {/* Col 4 — Mini Prayer Times */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-300 mb-3">
              Prayer Times Today
            </h4>
            <table className="w-full text-xs border-collapse">
              <tbody>
                {FOOTER_PRAYERS.map((p) => (
                  <tr key={p.name} className={p.isJummah ? "border-t border-white/20" : ""}>
                    <td className={`py-1.5 font-semibold ${p.isJummah ? "text-gold-300" : "text-white/90"}`}>
                      {p.isJummah ? "Jumu’ah" : p.name}
                      {p.isJummah && (
                        <span className="ml-1 text-white/60 text-[10px]">Fri</span>
                      )}
                    </td>
                    <td className={`py-1.5 text-right tabular-nums font-bold ${p.isJummah ? "text-gold-300" : "text-white"}`}>
                      {p.time}
                    </td>
                    <td className="py-1.5 ps-2 text-right text-[10px] text-white/50 font-medium">
                      {p.isJummah ? "Iqamah" : "Jamat"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              href="/prayer-times"
              className="mt-3 block text-[11px] text-gold-300 hover:text-white transition-colors underline decoration-gold-300/30"
            >
              Full schedule with Adhan times →
            </Link>
          </div>

        </div>
      </div>

      {/* ── Navigate bar ── */}
      <div style={{ borderTopColor: "rgba(255,255,255,0.12)" }} className="border-t">
        <div className="container-tight py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">Navigate</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              {[...QUICK_LINKS, ...GIVE_LINKS].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[11px] font-semibold text-white/80 hover:text-gold-300 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-footer ── */}
      <div style={{ borderTopColor: "rgba(255,255,255,0.08)" }} className="border-t">
        <div className="container-tight py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/50 font-medium">
            <span>© 2026 {contact.name}</span>
            <span>BN: {CHARITY_BN}</span>
            <span>Registered Canadian Charity</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/50 font-semibold">
            <Link href="/admin" className="hover:text-gold-300 transition-colors">Admin</Link>
            <Link href="#" className="hover:text-gold-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gold-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
