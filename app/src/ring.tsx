export function ScoreRing({ score }: { score: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />   {/* Orange */}
          <stop offset="100%" stopColor="#FACC15" /> {/* Yellow */}
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#2d2d2d"
        strokeWidth="8"
      />

      {/* Progress circle */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="url(#sg)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (score / 100) * c}
        transform="rotate(-90 50 50)"
        className="transition-all duration-700"
      />
    </svg>
  );
}