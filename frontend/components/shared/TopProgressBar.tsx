"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TopProgressBar() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Start
    setWidth(0);
    setOpacity(1);

    const t1 = setTimeout(() => setWidth(75), 10);
    const t2 = setTimeout(() => setWidth(95), 300);
    const t3 = setTimeout(() => setWidth(100), 500);
    // Fade out after bar reaches 100%
    const t4 = setTimeout(() => setOpacity(0), 650);
    // Reset width silently after fade
    const t5 = setTimeout(() => setWidth(0), 900);

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[9999] h-[2px] pointer-events-none"
      style={{
        width: `${width}%`,
        opacity,
        backgroundColor: "#C9A227",
        transition:
          width === 0
            ? "none"
            : width === 100
            ? "width 150ms ease-out"
            : "width 400ms cubic-bezier(0.1, 0.4, 0.2, 1)",
        transitionProperty: "width, opacity",
        transitionDuration: opacity === 0 ? "300ms" : undefined,
      }}
    />
  );
}
