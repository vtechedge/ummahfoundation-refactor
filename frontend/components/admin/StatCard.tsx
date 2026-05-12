import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  icon,
  accent = "green",
  sparkline,
}: {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon: React.ReactNode;
  accent?: "green" | "gold";
  sparkline?: number[];
}) {
  return (
    <div className="relative rounded-2xl bg-white border border-islamic-50 shadow-card p-5 overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
        <span
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-xl",
            accent === "green"
              ? "bg-islamic-50 text-islamic-600"
              : "bg-gold-50 text-gold-500"
          )}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3 font-sans font-bold text-3xl text-ink">{value}</div>
      {delta && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-medium",
              delta.positive
                ? "bg-islamic-50 text-islamic-700"
                : "bg-red-50 text-red-600"
            )}
          >
            {delta.positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {delta.value}
          </span>
          <span className="text-muted">vs last month</span>
        </div>
      )}
      {sparkline && <Sparkline values={sparkline} accent={accent} />}
    </div>
  );
}

function Sparkline({ values, accent }: { values: number[]; accent: "green" | "gold" }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const w = 120;
  const h = 34;
  const step = w / (values.length - 1);
  const points = values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  const color = accent === "green" ? "#1E7A3A" : "#C9A227";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 w-full h-9"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`grad-${accent}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <polygon
        fill={`url(#grad-${accent})`}
        points={`0,${h} ${points} ${w},${h}`}
      />
    </svg>
  );
}
