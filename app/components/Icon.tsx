interface IconProps {
  name: string;
  className?: string;
}

/**
 * Renders a local SVG icon from /public/icons/ using CSS mask so it inherits
 * the current text color via `currentColor`.
 *
 * Size: control with w-* h-* classes (default w-4 h-4).
 * Color: inherited from parent text color, or override with text-* class.
 */
export default function Icon({ name, className = 'w-4 h-4' }: IconProps) {
  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      style={{
        backgroundColor: 'currentColor',
        maskImage: `url('/icons/${name}.svg')`,
        WebkitMaskImage: `url('/icons/${name}.svg')`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      aria-hidden="true"
    />
  );
}
