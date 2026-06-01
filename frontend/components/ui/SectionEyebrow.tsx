"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  diamondClassName?: string;
  underlineWidth?: string; // e.g. "w-[70px]"
  isMotion?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export function SectionEyebrow({
  children,
  className,
  diamondClassName = "text-gold-400 mr-2",
  underlineWidth = "w-[70px]",
  isMotion = false,
  motionProps,
  ...props
}: SectionEyebrowProps) {
  const content = (
    <p className="mb-2">
      <span className={cn("inline-block", diamondClassName)}>◆</span>
      <span className="relative inline-block pb-3">
        {children}
        <span
          className={cn(
            "absolute left-0 bottom-0 h-[3px] bg-gold-400",
            underlineWidth
          )}
        />
      </span>
    </p>
  );

  if (isMotion) {
    return (
      <motion.div
        className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", className)}
        {...motionProps}
        {...(props as any)}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div
      className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", className)}
      {...props}
    >
      {content}
    </div>
  );
}
