import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SmartImage } from "@/components/shared/SmartImage";
import { campaigns, recentDonations } from "@/lib/mock-data";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { Plus, MoreHorizontal, TrendingUp, Users, Calendar, Search, Filter } from "lucide-react";

export default function AdminDonations() {
  return (
    <>
      <Topbar
        title="Donations"
        subtitle="Manage active campaigns and review every contribution."
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Header actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                placeholder="Search campaigns or donors…"
                className="h-10 w-80 rounded-full bg-white border border-islamic-50 pl-10 pr-4 text-sm focus:outline-none focus:border-islamic-200"
              />
            </div>
            <Button variant="ghost" size="sm" className="h-10">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          <Button variant="primary" size="sm" className="h-10">
            <Plus className="h-4 w-4" /> New campaign
          </Button>
        </div>

        {/* Campaign cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {campaigns.map((c) => {
            const pct = Math.round((c.raisedAmount / c.goalAmount) * 100);
            return (
              <div
                key={c.id}
                className="rounded-2xl bg-white border border-islamic-50 shadow-card overflow-hidden group"
              >
                <div className="relative h-40">
                  <SmartImage src={c.image} alt={c.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-islamic-900/70 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="green">Active</Badge>
                    <Badge variant="soft">{c.daysLeft}d left</Badge>
                  </div>
                  <button
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-ink/70 hover:bg-white"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-sans font-semibold text-lg text-ink line-clamp-1">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2">{c.tagline}</p>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted">Raised</div>
                      <div className="font-sans font-bold text-xl text-islamic-700">
                        {formatCurrency(c.raisedAmount)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wider text-muted">Goal</div>
                      <div className="font-medium text-ink/80 text-sm">
                        {formatCurrency(c.goalAmount)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Progress value={pct} className="h-2" />
                    <div className="mt-2 flex items-center justify-between text-xs text-muted">
                      <span>
                        {formatNumber(c.soldUnits)} of {formatNumber(c.targetUnits)} {c.unitLabel.toLowerCase()}
                      </span>
                      <span className="font-semibold text-gold-600">{pct}%</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <MiniStat icon={<Users className="h-3.5 w-3.5" />} label="Donors" value={formatNumber(c.donors)} />
                    <MiniStat icon={<TrendingUp className="h-3.5 w-3.5" />} label="Today" value="$1,240" />
                    <MiniStat icon={<Calendar className="h-3.5 w-3.5" />} label="Ends" value={`${c.daysLeft}d`} />
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button variant="subtle" size="sm" className="flex-1 h-9">
                      Edit
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1 h-9">
                      View details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Donations table */}
        <div className="rounded-2xl bg-white border border-islamic-50 shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted">Activity</div>
              <div className="mt-1 font-sans font-semibold text-lg text-ink">All donations</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral">Today · 8</Badge>
              <Badge variant="neutral">This week · 42</Badge>
              <Button variant="ghost" size="sm" className="h-9">
                Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-islamic-50/50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Donor</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Campaign</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Method</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Status</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted">Date</th>
                  <th className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((d) => (
                  <tr key={d.id} className="border-t border-islamic-50 hover:bg-islamic-50/40 transition">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-full bg-islamic-100 text-islamic-700 flex items-center justify-center font-semibold text-xs">
                          {d.donor[0]}
                        </div>
                        <div>
                          <div className="font-medium text-ink">{d.donor}</div>
                          <div className="text-xs text-muted">{d.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-ink/80">{d.campaign}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant={d.method === "Stripe" ? "neutral" : "soft"}>
                        {d.method}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-islamic-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-islamic-500" />
                        Succeeded
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-muted">{formatDate(d.date)}</td>
                    <td className="px-6 py-3.5 text-right font-semibold text-islamic-700">
                      {formatCurrency(d.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-islamic-50 text-xs text-muted">
            <span>Showing 6 of 214 donations</span>
            <div className="flex gap-1">
              <button className="h-8 px-3 rounded-lg hover:bg-islamic-50">Previous</button>
              <button className="h-8 px-3 rounded-lg bg-islamic-500 text-white">1</button>
              <button className="h-8 px-3 rounded-lg hover:bg-islamic-50">2</button>
              <button className="h-8 px-3 rounded-lg hover:bg-islamic-50">3</button>
              <button className="h-8 px-3 rounded-lg hover:bg-islamic-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-islamic-50/70 px-2 py-2">
      <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted">
        {icon} {label}
      </div>
      <div className="mt-0.5 font-sans text-sm text-ink">{value}</div>
    </div>
  );
}
