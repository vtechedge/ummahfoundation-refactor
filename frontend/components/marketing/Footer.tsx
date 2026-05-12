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
    <footer style={{ backgroundColor: "#0A2E1E" }} className="text-white/80">

      {/* ── Main 4-column body ── */}
      <div className="container-tight pt-8 sm:pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">

          {/* Col 1 — Identity */}
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-3">
              <p className="text-white font-bold text-sm leading-snug">Ummah Foundation</p>
              <p className="text-white/60 text-xs mt-0.5">of Durham Region</p>
            </div>
            <p className="text-xs text-white/55 leading-relaxed max-w-[220px]">{contact.tagline}</p>
            <p className="mt-3 text-xs text-white/40">Est. 2011 · Oshawa, Ontario</p>
            <div className="mt-4">
              <Link
                href="/donate"
                className="block w-full text-center bg-gold-400 hover:bg-gold-300 text-islamic-900 text-xs font-bold py-1.5 rounded transition-colors"
              >
                Donate Now
              </Link>
              <p className="mt-1.5 text-[10px] text-center text-white/40">
                E-Transfer:{" "}
                <a href={`mailto:${contact.etransfer}`} className="text-white/60 hover:text-white transition-colors">
                  {contact.etransfer}
                </a>
              </p>
            </div>
          </div>

          {/* Col 2 — Contact Details + Social (social icons added in future) */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">Contact Us</h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://maps.google.com/?cid=16305318455083149182"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/65 hover:text-white transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-gold-300/60" />
                <span>{contact.address.line1}<br />{contact.address.line2}</span>
              </a>
              <a href={contact.masjidPhoneHref} className="flex items-center gap-2 text-white/65 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-gold-300/60" />
                {contact.masjidPhone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-white/65 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-gold-300/60" />
                {contact.email}
              </a>
              <div className="flex items-center gap-2 text-white/40">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Open daily · call for hours</span>
              </div>
            </div>

            {/* Social media placeholder — icons added in future */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-[11px] text-white/30 uppercase tracking-widest font-bold">Follow Us</p>
              <p className="text-[11px] text-white/25 mt-1 italic">Social links coming soon</p>
            </div>
          </div>

          {/* Col 3 — Newsletter */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Newsletter</h4>
            <p className="text-xs text-white/45 leading-relaxed mb-3">
              Stay updated with Friday khutbahs, events, and campaign news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-white/10 border border-white/15 rounded px-2.5 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-islamic-600 hover:bg-islamic-500 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          {/* Col 4 — Mini Prayer Times (critical for mobile) */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Prayer Times Today
            </h4>
            <table className="w-full text-xs border-collapse">
              <tbody>
                {FOOTER_PRAYERS.map((p) => (
                  <tr key={p.name} className={p.isJummah ? "border-t border-white/15" : ""}>
                    <td className={`py-1 font-medium ${p.isJummah ? "text-gold-300" : "text-white/75"}`}>
                      {p.isJummah ? "Jumu’ah" : p.name}
                      {p.isJummah && (
                        <span className="ml-1 text-white/40 text-[10px]">Fri</span>
                      )}
                    </td>
                    <td className={`py-1 text-right tabular-nums font-semibold ${p.isJummah ? "text-gold-300" : "text-white"}`}>
                      {p.time}
                    </td>
                    <td className="py-1 ps-2 text-right text-[10px] text-white/30">
                      {p.isJummah ? "Iqamah" : "Jamat"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              href="/prayer-times"
              className="mt-2 block text-[11px] text-gold-300/70 hover:text-gold-300 transition-colors"
            >
              Full schedule with Adhan times →
            </Link>
          </div>

        </div>
      </div>

      {/* ── Navigate bar ── compact vertical list in 2 columns */}
      <div style={{ borderTopColor: "rgba(255,255,255,0.08)" }} className="border-t">
        <div className="container-tight py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">Navigate</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {[...QUICK_LINKS, ...GIVE_LINKS].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[11px] text-white/45 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-footer ── */}
      <div style={{ borderTopColor: "rgba(255,255,255,0.06)" }} className="border-t">
        <div className="container-tight py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/30">
            <span>© 2026 {contact.name}</span>
            <span>BN: {CHARITY_BN}</span>
            <span>Registered Canadian Charity</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/30">
            <Link href="/admin" className="hover:text-white/60 transition-colors">Admin</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
