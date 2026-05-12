export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      {/* PageBanner skeleton */}
      <div className="h-[62px] bg-islamic-700 relative overflow-hidden">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      {/* Content skeleton */}
      <div className="container-tight py-12 sm:py-16 space-y-6">
        {/* Title block */}
        <div className="space-y-3">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-7 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 max-w-full rounded bg-gray-100" />
        </div>

        {/* Content rows */}
        <div className="space-y-3 pt-4">
          {[100, 85, 90, 75].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded bg-gray-100"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* Card placeholders */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
