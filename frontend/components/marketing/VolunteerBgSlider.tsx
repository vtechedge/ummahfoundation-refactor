"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BG_IMAGES = [
  "https://alrayanislamiccentre.org/storage/galleries/oEn2glkoegkclFXxXtFqhFXqhDGhhN0BfnPl1dvx.jpg",
  "https://alrayanislamiccentre.org/storage/galleries/tLeRzjBVpgFMaNm0kIPkma5U6kuQwvnn8eQSMoSX.jpg",
  "https://alrayanislamiccentre.org/storage/galleries/xYDhNuLLxHteQCyBzh64pu4wMAPlRIUvgtURxNQL.jpg",
  "https://alrayanislamiccentre.org/storage/galleries/oryLUfCelz0Ic224TnEaSC42rSUSW1g0LXRUqEaz.jpg",
  "https://alrayanislamiccentre.org/storage/galleries/f6Vv6m4FH9QMNQ8M0vCQyTb6AjIX88Urr4waDa4e.jpg",
  "https://alrayanislamiccentre.org/storage/galleries/v0z8bWeygisEHx5mRz2Q2NWeklalQVv38zqrpjUH.jpg",
];

export function VolunteerBgSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover object-center scale-110"
            style={{ filter: "blur(7px)", opacity: 0.18 }}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}
