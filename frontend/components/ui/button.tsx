import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-islamic-500 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-islamic-500 text-white hover:bg-islamic-600 hover:-translate-y-0.5 shadow-soft",
        gold:
          "bg-gold-400 text-islamic-900 hover:bg-gold-300 hover:-translate-y-0.5 shadow-soft font-semibold",
        ghost:
          "bg-white/80 text-islamic-700 border border-islamic-100 hover:bg-white hover:border-islamic-200",
        outline:
          "bg-transparent text-islamic-600 border border-islamic-200 hover:bg-islamic-50",
        subtle:
          "bg-islamic-50 text-islamic-700 hover:bg-islamic-100",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "px-8 text-base py-3.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
