import {
  HandCoins,
  Flame,
  Users,
  Repeat,
  ArrowUpRight,
  Clock3,
  HeartHandshake,
} from "lucide-react";
import { Topbar } from "@/components/admin/Topbar";
import { StatCard } from "@/components/admin/StatCard";
import {
  adminStats,
  donationChart,
  recentDonations,
  campaigns,
  prayerTimes,
  events,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  return (
    <>
      <Topbar
        title="Welcome back, Aameen"
        subtitle="Here's what's happening at the foundation today."
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            label="Total donations"
            value={formatCurrency(adminStats.totalDonations)}
            delta={{ value: `${adminStats.donationsChangePct}%`, positive: true }}
            icon={<HandCoins className="h-4 w-4" />}
            sparkline={donationChart.map((d) => d.value)}
          />
          <StatCard
            label="Active campaigns"
            value={String(adminStats.activeCampaigns)}
            delta={{ value: "1 new", positive: true }}
            icon={<Flame className="h-4 w-4" />}
            accent="gold"
          />
          <StatCard
            label="New registrations"
            value={String(adminStats.newRegistrations)}
            delta={{ value: `+${adminStats.newRegistrationsChange}`, positive: true }}
            icon={<Users className="h-4 w-4" />}
            sparkline={[18, 21, 19, 24, 32, 36, 42]}
          />
          <StatCard
            label="Monthly recurring"
            value={formatCurrency(adminStats.monthlyRecurring)}
            delta={{ value: "4.2%", positive: true }}
            icon={<Repeat className="h-4 w-4" />}
            accent="gold"
            sparkline={[22, 24, 27, 30, 33, 36, 38]}
          />
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          {/* Donation chart card */}
          <div className="xl:col-span-2 rounded-2xl bg-white border border-islamic-50 shadow-card p-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted">
                  Donations over time
                </div>
                <div className="mt-1 font-sans font-bold text-2xl text-ink">
                  {formatCurrency(
                    donationChart.reduce((a, b) => a + b.value, 0) * 100
                  )}
                </div>
                <div className="mt-0.5 text-xs text-islamic-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> Steady growth — last 7 months
                </div>
              </div>
              <div className="flex gap-1 p-1 bg-islamic-50/70 rounded-full text-xs">
                {["Week", "Month", "Year"].map((l, i) => (
                  <button
                    key={l}
                    className={`px-3 py-1.5 rounded-full font-medium ${
                      i === 1 ? "bg-white text-ink shadow-soft" : "text-muted"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <DonationsChart />
            </div>
          </div>

          {/* Prayer times preview */}
          <div className="rounded-2xl bg-white border border-islamic-50 shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted">Today</div>
                <div className="mt-1 font-sans font-semibold text-lg text-ink">Prayer Times</div>
              </div>
              <Badge variant="neutral">
                <Clock3 className="h-3 w-3" /> 19 Apr 2026
              </Badge>
            </div>
            <ul className="mt-4 divide-y divide-islamic-50">
              {prayerTimes
                .filter((p) => p.name !== "Jummah")
                .map((p, i) => (
                  <li
                    key={p.name}
                    className={`flex items-center justify-between py-2.5 ${
                      i === 3 ? "text-islamic-700 font-semibold" : ""
                    }`}
                  >
                    <span className="text-sm">{p.name}</span>
                    <span className="font-mono text-sm">{p.jamat ?? p.begins}</span>
                  </li>
                ))}
            </ul>
            <button className="mt-4 w-full rounded-xl bg-islamic-50 hover:bg-islamic-100 py-2.5 text-sm font-medium text-islamic-700 transition">
              Edit today&apos;s times →
            </button>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          {/* Active campaigns progress */}
          <div className="xl:col-span-2 rounded-2xl bg-white border border-islamic-50 shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted">
                  Live campaigns
                </div>
                <div className="mt-1 font-sans font-semibold text-lg text-ink">Progress toward goal</div>
              </div>
              <button className="text-xs text-islamic-600 font-semibold hover:text-islamic-700">
                Manage →
              </button>
            </div>
            <div className="mt-5 space-y-5">
              {campaigns.map((c) => {
                const pct = Math.round((c.raisedAmount / c.goalAmount) * 100);
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-islamic-50 flex items-center justify-center text-islamic-600">
                          <HeartHandshake className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-ink">{c.title}</div>
                          <div className="text-xs text-muted">
                            {formatCurrency(c.raisedAmount)} / {formatCurrency(c.goalAmount)}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gold-600">{pct}%</span>
                    </div>
                    <div className="mt-2.5">
                      <Progress value={pct} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="rounded-2xl bg-white border border-islamic-50 shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted">Coming up</div>
                <div className="mt-1 font-sans font-semibold text-lg text-ink">Events this week</div>
              </div>
              <button className="text-xs text-islamic-600 font-semibold hover:text-islamic-700">
                All →
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {events.slice(0, 3).map((e) => {
                const d = new Date(e.date);
                return (
                  <li
                    key={e.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-islamic-50 hover:bg-islamic-50/50 transition"
                  >
                    <div className="flex flex-col items-center justify-center w-12 shrink-0 rounded-lg bg-islamic-50 py-2">
                      <span className="text-[10px] uppercase tracking-wider text-islamic-600 font-semibold">
                        {d.toLocaleDateString("en", { month: "short" })}
                      </span>
                      <span className="font-sans font-bold text-lg leading-none text-islamic-700">
                        {d.getDate()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-ink truncate">
                        {e.title}
                      </div>
                      <div className="text-xs text-muted">
                        {e.time} · {e.location}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Recent donations table */}
        <div className="rounded-2xl bg-white border border-islamic-50 shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted">Activity</div>
              <div className="mt-1 font-sans font-semibold text-lg text-ink">Recent donations</div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-islamic-100 px-4 py-1.5 text-xs text-ink/75 hover:bg-islamic-50">
                Export CSV
              </button>
              <button className="rounded-full bg-islamic-500 text-white px-4 py-1.5 text-xs hover:bg-islamic-600">
                View all
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-islamic-50/50 text-left">
                <tr>
                  <Th>Donor</Th>
                  <Th>Campaign</Th>
                  <Th>Method</Th>
                  <Th>Date</Th>
                  <Th align="right">Amount</Th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((d) => (
                  <tr key={d.id} className="border-t border-islamic-50">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-islamic-100 text-islamic-700 flex items-center justify-center font-semibold text-xs">
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
                      <Badge
                        variant={d.method === "Stripe" ? "neutral" : "soft"}
                      >
                        {d.method}
                      </Badge>
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
        </div>
      </div>
    </>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-3 text-xs uppercase tracking-wider font-semibold text-muted ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function DonationsChart() {
  const w = 600;
  const h = 180;
  const pad = 20;
  const max = Math.max(...donationChart.map((d) => d.value));
  const step = (w - pad * 2) / (donationChart.length - 1);

  const points = donationChart
    .map((d, i) => {
      const x = pad + i * step;
      const y = h - pad - ((d.value / max) * (h - pad * 2));
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44">
      <defs>
        <linearGradient id="donationArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1E7A3A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1E7A3A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad}
          x2={w - pad}
          y1={pad + t * (h - pad * 2)}
          y2={pad + t * (h - pad * 2)}
          stroke="#E5E7EB"
          strokeDasharray="3 3"
        />
      ))}
      <polygon
        fill="url(#donationArea)"
        points={`${pad},${h - pad} ${points} ${w - pad},${h - pad}`}
      />
      <polyline
        fill="none"
        stroke="#1E7A3A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {donationChart.map((d, i) => {
        const x = pad + i * step;
        const y = h - pad - ((d.value / max) * (h - pad * 2));
        return (
          <g key={d.month}>
            <circle cx={x} cy={y} r="4" fill="white" stroke="#1E7A3A" strokeWidth="2" />
            <text
              x={x}
              y={h - 4}
              textAnchor="middle"
              className="fill-muted text-[10px]"
              style={{ fontFamily: "inherit" }}
            >
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
