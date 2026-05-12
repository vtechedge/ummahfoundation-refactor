import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0..100
  className?: string;
  barClassName?: string;
};

export function Progress({ value, className, barClassName }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-islamic-50",
        className
      )}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-islamic-500 via-islamic-400 to-gold-400 transition-[width] duration-700 ease-out",
          barClassName
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
