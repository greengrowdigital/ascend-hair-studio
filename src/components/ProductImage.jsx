import { useState } from 'react'

/* Product shot with a graceful fallback. If the PNG ever 404s (e.g. a path is
   swapped before the asset is uploaded), an inline SVG tin renders instead so
   the layout never breaks. The real shots are transparent, so they float on
   any background. */
export default function ProductImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  eager = false,
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          className={`h-full w-full object-contain ${imgClassName}`}
        />
      ) : (
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label={alt}
          className={`h-full w-full ${imgClassName}`}
        >
          <defs>
            <linearGradient id="tin-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e7e9ec" />
              <stop offset="0.5" stopColor="#b9bdc4" />
              <stop offset="1" stopColor="#d3d6db" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="118" rx="72" ry="20" fill="#000" opacity="0.12" />
          <rect x="30" y="70" width="140" height="46" rx="16" fill="url(#tin-metal)" />
          <ellipse cx="100" cy="70" rx="70" ry="22" fill="#14151a" />
          <ellipse cx="100" cy="68" rx="70" ry="22" fill="none" stroke="url(#tin-metal)" strokeWidth="3" />
          <text
            x="100"
            y="72"
            textAnchor="middle"
            fontFamily="Michroma, sans-serif"
            fontSize="11"
            letterSpacing="3"
            fill="#e7e9ec"
          >
            ASCEND
          </text>
        </svg>
      )}
    </div>
  )
}
