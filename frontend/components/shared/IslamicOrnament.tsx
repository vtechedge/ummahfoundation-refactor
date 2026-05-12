export function IslamicOrnament({ className = "h-8 w-auto text-gold-400" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 12 L40 12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M80 12 L120 12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <g transform="translate(60 12)" stroke="currentColor" strokeWidth="1.2" fill="none">
        <polygon points="0,-10 2.5,-3 10,-3 4,2 6,10 0,5 -6,10 -4,2 -10,-3 -2.5,-3" />
        <circle cx="0" cy="0" r="2" fill="currentColor" />
      </g>
    </svg>
  );
}

export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-gold-400" fill="currentColor" aria-hidden>
        <polygon points="10,0 12.5,7 20,7 13.5,12 16,20 10,15 4,20 6.5,12 0,7 7.5,7" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
    </div>
  );
}
