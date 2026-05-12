import { cn } from "@/lib/utils";

type Variant = "green" | "gold" | "neutral" | "soft" | "destructive";

export function Badge({
  children,
  variant = "green",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    green: "bg-islamic-500 text-white",
    gold: "bg-gold-400 text-islamic-900",
    neutral: "bg-islamic-50 text-islamic-700",
    soft: "bg-white/80 text-islamic-700 border border-islamic-100",
    destructive: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
