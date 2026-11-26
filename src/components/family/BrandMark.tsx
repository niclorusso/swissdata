/** The SwissData mark (the four operation signs on red), the same drawing in the three sites. */
export function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ flex: "none", display: "block" }}>
      <rect width="32" height="32" rx="5.5" fill="#D82525" />
      <g fill="none" stroke="#fff" strokeWidth="2">
        <path d="M8 4.3v7.4M4.3 8h7.4" />
        <path d="M20.3 8h7.4" />
        <path d="M5.4 21.4l5.2 5.2M10.6 21.4l-5.2 5.2" />
        <path d="M20.3 24h7.4" />
        <circle cx="24" cy="20.7" r="1.2" fill="#fff" stroke="none" />
        <circle cx="24" cy="27.3" r="1.2" fill="#fff" stroke="none" />
      </g>
    </svg>
  );
}

/** "SwissData" with "Data" in red. On the dark footer the two colours are lighter. */
export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="font-bold tracking-[-0.015em]" style={{ color: onDark ? "#fff" : "var(--sdf-ink)" }}>
      Swiss<span style={{ color: onDark ? "#ff6a5c" : "var(--sdf-red)" }}>Data</span>
    </span>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
