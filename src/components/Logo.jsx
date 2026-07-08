/* ASCEND emblem — a rising "A" apex enclosed in a double ring,
   echoing the client's circular wordmark logo. */
export default function Logo({ size = 34, showWord = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.1" opacity="0.9" />
        <circle cx="24" cy="24" r="17.5" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
        <path
          d="M14.5 33 L24 15 L33.5 33"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="square"
        />
        <path d="M19 27 H29" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
      </svg>
      {showWord && (
        <span
          className="font-display text-[0.95rem] tracking-[0.42em] leading-none translate-y-[1px]"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          ASCEND
        </span>
      )}
    </span>
  )
}
