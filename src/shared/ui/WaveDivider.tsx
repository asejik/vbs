interface WaveDividerProps {
  fillTop?: string
  fillBottom?: string
  flip?: boolean
}

/**
 * SVG wave section divider for smooth visual transitions between sections.
 */
export function WaveDivider({
  fillTop = '#FFFDF7',
  fillBottom = '#FFFFFF',
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="wave-divider"
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="80" fill={fillTop} />
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,20 1440,40 L1440,80 L0,80 Z"
          fill={fillBottom}
        />
      </svg>
    </div>
  )
}
