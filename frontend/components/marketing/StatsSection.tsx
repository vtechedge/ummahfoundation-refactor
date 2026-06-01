"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { campaigns } from "@/lib/mock-data";

type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  {
    value: 13,
    suffix: "+",
    label: "Years Serving Durham",
    sub: "Est. 2013 · Oshawa, Ontario",
  },
  {
    value: campaigns[0].donors,
    suffix: "+",
    label: "Community Donors",
    sub: "Masjid Al-Ummah campaign",
  },
  {
    value: 3.5,
    prefix: "$",
    suffix: "M",
    label: "Raised Toward the Masjid",
    sub: "Including $1.8M land purchase",
  },
  {
    value: 4,
    suffix: "",
    label: "Active Programs",
    sub: "Hifz · Aalim · Maktab · Camp",
  },
];

function Counter({ value, prefix = "", suffix }: {
  value: number;
  prefix?: string;
  suffix: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted = Number.isInteger(value)
    ? Math.round(display).toLocaleString()
    : display.toFixed(1);

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #135027 0%, #1E7A3A 50%, #196631 100%)",
      }}
    >
      {/* Dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,162,39,0.18) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Top + bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-400 opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400 opacity-50" />

      <div className="relative container-tight py-14 sm:py-16">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-[11px] font-bold uppercase tracking-widest text-gold-300/70 mb-10"
        >
          <span className="text-gold-400 mr-1.5">◆</span>
          Community impact · by the numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p
                className="font-bold tabular-nums text-white leading-none"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
              >
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>

              <div
                className="mx-auto my-3 h-px w-8"
                style={{ backgroundColor: "rgba(201,162,39,0.55)" }}
              />

              <p className="text-sm font-bold text-white leading-snug">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-white/50 leading-relaxed">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
