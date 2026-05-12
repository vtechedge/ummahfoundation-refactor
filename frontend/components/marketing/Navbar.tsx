"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { contact } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/",              label: "Home" },
  { href: "/prayer-times",  label: "Prayer Times" },
  { href: "/programs",      label: "Programs" },
  { href: "/services",      label: "Services" },
  { href: "/events",        label: "Events" },
  { href: "/donate",        label: "Donate" },
  { href: "/about",         label: "About" },
  { href: "/contact",       label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const check = () => setShadow(window.scrollY > 4);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else       document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-200 overflow-hidden",
        shadow && "shadow-md"
      )}
    >
      {/* Subtle Islamic geometric dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(30,122,58,1) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          opacity: 0.04,
        }}
      />

      {/* Gold shimmer bottom border */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] animate-shimmer pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.5) 40%, rgba(201,162,39,0.85) 50%, rgba(201,162,39,0.5) 60%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="container-tight relative">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" aria-label="Ummah Foundation of Durham" className="flex-shrink-0 flex items-center">
            <Logo variant="plain" size={56} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center flex-1 justify-evenly mx-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center px-4 py-2 text-[15px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap",
                    active
                      ? "bg-islamic-500 text-white shadow-[0_4px_14px_rgba(30,122,58,0.35)]"
                      : "text-ink/70 hover:bg-islamic-500 hover:text-white hover:shadow-[0_4px_14px_rgba(30,122,58,0.35)]"
                  )}
                >
                  {link.label}
                  {/* Active gold underline dot */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Donate button — islamic-500 = logo green */}
          <Link
            href="/donate"
            className="hidden lg:inline-flex items-center bg-islamic-500 hover:bg-islamic-600 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 self-center hover:shadow-[0_4px_18px_rgba(30,122,58,0.45)]"
          >
            Donate Now
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded border border-gray-200 text-ink hover:bg-gray-50 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 border-t border-gray-100 bg-white",
          open ? "max-h-[520px]" : "max-h-0"
        )}
      >
        <nav className="container-tight py-2 flex flex-col" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between py-3.5 text-sm font-medium border-b border-gray-100 transition-colors",
                  active ? "text-islamic-600 font-semibold" : "text-ink hover:text-islamic-600"
                )}
              >
                {link.label}
                <span className={cn("text-lg leading-none", active ? "text-islamic-500" : "text-gray-300")}>›</span>
              </Link>
            );
          })}

          {/* Pinned actions at drawer bottom */}
          <div className="pt-4 pb-3 flex flex-col gap-3">
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="bg-islamic-500 hover:bg-islamic-600 text-white text-sm font-semibold py-3 rounded text-center transition-colors"
            >
              Donate Now
            </Link>
            <a
              href={contact.masjidPhoneHref}
              className="flex items-center justify-center gap-2 text-sm text-islamic-600 border border-islamic-200 rounded py-2.5 hover:bg-islamic-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {contact.masjidPhone}
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
}
