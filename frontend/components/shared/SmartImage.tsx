"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** optional override for the fallback gradient */
  fallbackClassName?: string;
};

/**
 * Next/Image wrapper that swaps in a themed Islamic-green gradient if the
 * remote image fails to load. Prevents ugly broken-image alt text in the UI.
 * Use wherever you use `<Image fill />`.
 */
export function SmartImage({
  src,
  alt,
  className,
  priority,
  fallbackClassName,
}: Props) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-islamic-700 via-islamic-500 to-islamic-400",
          fallbackClassName
        )}
      >
        <div className="absolute inset-0 pattern-islamic opacity-40" />
        <div className="relative flex flex-col items-center gap-2 text-white/70">
          <ImageIcon className="h-6 w-6" />
          <span className="text-xs font-medium uppercase tracking-wider">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setBroken(true)}
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
  );
}
