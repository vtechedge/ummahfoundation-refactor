// Phase 5 — Credibility reinforcement.
// Placed between AboutSection and Footer: the final trust signal before the user leaves.
// Does NOT repeat the donation ask. Reinforces legitimacy only.

import { ShieldCheck, Receipt, Users, Clock } from "lucide-react";
import { CHARITY_BN, campaigns, impactStats } from "@/lib/mock-data";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: "Registered Canadian Charity",
    sub: `BN: ${CHARITY_BN}`,
  },
  {
    icon: Receipt,
    label: "CRA-Approved Tax Receipts",
    sub: "Issued for all donations",
  },
  {
    icon: Clock,
    label: "Serving Durham Region",
    sub: "Since 2011 · 14+ years",
  },
  {
    icon: Users,
    label: "Community-Supported",
    sub: `${campaigns[0].donors}+ donors to date`,
  },
] as const;

export function TrustBar() {
  return (
    <div className="bg-islamic-50 border-t border-b border-islamic-100">
      <div className="container-tight py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="flex-shrink-0 h-8 w-8 bg-islamic-600 text-white rounded flex items-center justify-center">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink leading-snug">{label}</p>
                <p className="text-sm text-muted mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
