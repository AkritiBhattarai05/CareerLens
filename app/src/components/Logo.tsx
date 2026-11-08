// CareerLens logo mark: a resume with a magnifying lens.
// variant="dark"  -> for dark backgrounds (navbar, footer)
// variant="light" -> for light backgrounds (cream pages)

type LogoMarkProps = {
  size?: number;
  variant?: "dark" | "light";
  className?: string;
};

export function LogoMark({
  size = 36,
  variant = "dark",
  className = "",
}: LogoMarkProps) {
  const isDark = variant === "dark";

  const doc = isDark ? "#F5EEDD" : "#16587B"; // resume page
  const lines = isDark ? "#16587B" : "#84B3CE"; // text lines on the page
  const lensFill = isDark ? "#16587B" : "#F5EEDD"; // inside of the lens
  const check = isDark ? "#F5EEDD" : "#16587B"; // check mark
  const accent = "#eab044"; // lens ring and handle

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="CareerLens logo"
    >
      <rect x="10" y="6" width="32" height="44" rx="6" fill={doc} />
      <line
        x1="18"
        y1="18"
        x2="34"
        y2="18"
        stroke={lines}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={isDark ? 0.5 : 1}
      />
      <line
        x1="18"
        y1="26"
        x2="30"
        y2="26"
        stroke={lines}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={isDark ? 0.5 : 1}
      />
      <circle
        cx="42"
        cy="42"
        r="12"
        fill={lensFill}
        stroke={accent}
        strokeWidth="5"
      />
      <line
        x1="51"
        y1="51"
        x2="58"
        y2="58"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <polyline
        points="36,42 40,46 48,37"
        fill="none"
        stroke={check}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LogoMark;