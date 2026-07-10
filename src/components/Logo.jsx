/* ASCEND wordmark — recreated from the brand logotype: a wide, geometric,
   all-caps face (Michroma) with generous tracking. Colour is inherited
   (currentColor); pass a text-size class via `className`. */
export default function Logo({ className = '' }) {
  return (
    <span
      className={`font-display uppercase leading-none tracking-[0.3em] ${className}`}
      style={{ fontFeatureSettings: '"tnum"' }}
    >
      Ascend
    </span>
  )
}
