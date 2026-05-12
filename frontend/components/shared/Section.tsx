import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16 lg:py-20", className)}
    >
      <div className="container-tight">{children}</div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  dark = false,
  action,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  action?: React.ReactNode;
}) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "mb-8 flex flex-col",
        isLeft
          ? "items-start border-l-4 border-gold-400 pl-4"
          : "items-center text-center mx-auto max-w-2xl"
      )}
    >
      {/* Row: eyebrow + optional action (for left-aligned only) */}
      {(label || action) && (
        <div className={cn("w-full flex items-center", isLeft ? "justify-between" : "justify-center")}>
          {label && (
            <p
              className={cn(
                "text-[11px] font-bold uppercase tracking-widest",
                dark ? "text-gold-300/70" : "text-islamic-600"
              )}
            >
              <span className="text-gold-400 mr-1.5">◆</span>
              {label}
            </p>
          )}
          {isLeft && action && (
            <div className="flex-shrink-0">{action}</div>
          )}
        </div>
      )}

      <h2
        className={cn(
          "mt-1 text-3xl sm:text-4xl font-bold leading-tight text-balance",
          dark ? "text-white" : "text-maroon-500"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-2 text-base leading-relaxed text-balance",
            dark ? "text-white/65" : "text-muted"
          )}
        >
          {description}
        </p>
      )}

      {/* Center-aligned action sits below the heading */}
      {!isLeft && action && <div className="mt-4">{action}</div>}
    </div>
  );
}
