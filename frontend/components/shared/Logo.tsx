import Image from "next/image";
import { cn } from "@/lib/utils";

// Intrinsic dimensions of public/logo-ufd.png (roughly 3:2 landscape).
const NATURAL_W = 580;
const NATURAL_H = 380;

type Props = {
  /** "badge" = logo inside a rounded white tile (works on dark bg).
   *  "plain" = raw logo, no background. */
  variant?: "badge" | "plain";
  /** Display height in px; width scales automatically to preserve aspect. */
  size?: number;
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "badge",
  size = 48,
  className,
  priority = false,
}: Props) {
  const displayW = Math.round((size * NATURAL_W) / NATURAL_H);

  // `mix-blend-multiply` makes the PNG's opaque white background
  // disappear on light containers (navbar/glass). Pure white multiplies to a
  // no-op, so only the colored artwork remains visible. For the badge variant
  // we keep a solid white tile so the logo reads on dark backgrounds like the
  // footer — so we skip the blend there.
  const baseImg = (blend: boolean) => (
    <Image
      src="/logo-ufd.png"
      alt="Ummah Foundation of Durham"
      width={NATURAL_W}
      height={NATURAL_H}
      className={cn(
        "object-contain",
        blend && "mix-blend-multiply",
        variant === "plain" && className
      )}
      style={{ height: size, width: displayW }}
      priority={priority}
    />
  );

  if (variant === "plain") return baseImg(true);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-islamic-100 px-3 py-2",
        className
      )}
    >
      {baseImg(false)}
    </span>
  );
}
