import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-xl border-b border-islamic-50">
      <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-ink">{title}</h1>
          {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              placeholder="Search…"
              className="h-10 w-72 rounded-full bg-white border border-islamic-50 pl-10 pr-4 text-sm focus:outline-none focus:border-islamic-200"
            />
          </div>
          <button className="relative h-10 w-10 rounded-full bg-white border border-islamic-50 flex items-center justify-center hover:bg-islamic-50">
            <Bell className="h-4 w-4 text-ink/70" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold-400 ring-2 ring-white" />
          </button>
          <Button variant="primary" size="sm" className="h-10">
            <Plus className="h-4 w-4" /> Quick add
          </Button>
        </div>
      </div>
    </header>
  );
}
