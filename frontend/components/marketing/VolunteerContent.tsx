"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { volunteerRoles } from "@/lib/mock-data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VolunteerContent() {
  return (
    <div className="relative container-tight">

      {/* Header row */}
      <motion.div
        className="flex flex-wrap items-end justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300">
            <span className="mr-1.5 opacity-70">◆</span>Get involved
          </p>
          <h2 className="mt-0.5 text-2xl sm:text-3xl font-bold text-cream font-sans">
            Volunteer with Ummah Foundation
          </h2>
          <p className="mt-1 text-[15px] text-white/65 max-w-xs">
            Your time is sadaqah. We have a role for every skill.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className={cn(buttonVariants({ variant: "gold", size: "sm" }))}>
            Get Involved <ArrowUpRight className="ms-1.5 h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-white/25 text-cream hover:bg-white/10 hover:text-cream"
            )}
          >
            Ask a question
          </Link>
        </div>
      </motion.div>

      {/* Role cards — staggered entrance */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {volunteerRoles.map((r, i) => (
          <motion.li
            key={r.title}
            className="rounded overflow-hidden border border-white/10 bg-white/5 group cursor-default"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{
              borderColor: "rgba(201,162,39,0.4)",
              backgroundColor: "rgba(255,255,255,0.09)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="relative h-28 w-full overflow-hidden">
              <Image
                src={r.image}
                alt={r.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Gradient from image bottom into card body */}
              <div className="absolute inset-0 bg-gradient-to-t from-islamic-900/70 via-islamic-900/20 to-transparent" />
            </div>
            <div className="p-3">
              <motion.h3
                className="font-sans font-semibold text-[15px] text-cream mb-1"
                whileHover={{ color: "#C9A227" }}
                transition={{ duration: 0.2 }}
              >
                {r.title}
              </motion.h3>
              <p className="text-sm leading-relaxed text-white/50">{r.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
