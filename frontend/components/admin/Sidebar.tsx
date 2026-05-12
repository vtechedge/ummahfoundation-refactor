"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clock3,
  HandCoins,
  BookOpen,
  CalendarDays,
  FileText,
  Users,
  Settings,
  LogOut,
  HelpCircle,
  Megaphone,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/prayer-times", label: "Prayer Times", icon: Clock3 },
  { href: "/admin/donations", label: "Donations", icon: HandCoins },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/blog", label: "Blog", icon: FileText, disabled: true },
  { href: "/admin/users", label: "Users", icon: Users, disabled: true },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-islamic-50 min-h-screen sticky top-0">
      <div className="p-6 pb-4 border-b border-islamic-50 flex items-center justify-between">
        <Link href="/" aria-label="UFD home" className="inline-flex items-center">
          <Logo variant="plain" size={52} />
        </Link>
        <span className="rounded-full bg-islamic-50 text-islamic-700 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 font-semibold">
          Admin
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-muted">
          Manage
        </div>
        {items.map(({ href, label, icon: Icon, disabled }) => {
          const active = path === href || (href !== "/admin" && path?.startsWith(href));
          return (
            <Link
              key={href}
              href={disabled ? "#" : href}
              aria-disabled={disabled}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-islamic-500 text-white shadow-soft"
                  : "text-ink/75 hover:bg-islamic-50",
                disabled && "opacity-40 pointer-events-none"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-gold-300" : "text-islamic-500")} />
              <span>{label}</span>
              {disabled && (
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted">
                  soon
                </span>
              )}
            </Link>
          );
        })}

        <div className="mt-6 px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-muted">
          General
        </div>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/75 hover:bg-islamic-50"
        >
          <Settings className="h-4 w-4 text-islamic-500" /> Settings
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/75 hover:bg-islamic-50"
        >
          <HelpCircle className="h-4 w-4 text-islamic-500" /> Help & docs
        </Link>
      </nav>

      <div className="m-3 rounded-2xl bg-gradient-to-br from-islamic-500 to-islamic-700 text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-30" />
        <div className="relative">
          <div className="text-xs uppercase tracking-wider text-gold-300">Need help?</div>
          <div className="mt-1 font-sans text-sm">We&apos;re here Mon–Fri.</div>
          <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-400 text-islamic-900 px-3 py-1.5 text-xs font-semibold">
            Contact support
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-islamic-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-islamic-100 text-islamic-700 flex items-center justify-center font-semibold">
            A
          </div>
          <div className="text-xs leading-tight">
            <div className="font-semibold text-ink">Aameen Bhayat</div>
            <div className="text-muted">Owner</div>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-islamic-50" aria-label="Log out">
          <LogOut className="h-4 w-4 text-muted" />
        </button>
      </div>
    </aside>
  );
}
