import { useEffect, useState } from 'react'

interface SplashProps {
  onDone: () => void
}

const PARTICLES = [
  { x: -72, y: -52 },
  { x: 58, y: -72 },
  { x: 84, y: 18 },
  { x: 52, y: 72 },
  { x: -54, y: 76 },
  { x: -88, y: 12 },
]

export function Splash({ onDone }: SplashProps) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true), 1900)
    const t2 = setTimeout(onDone, 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div className={`splash ${hiding ? 'splash--hide' : ''}`}>
      <div className="splash__inner">
        <div className="splash__halo" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="splash__particle"
            style={
              {
                '--dx': `${p.x}px`,
                '--dy': `${p.y}px`,
                '--delay': `${0.35 + i * 0.08}s`,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="splash__icon-wrap">
          <span className="splash__emoji">🏠</span>
        </div>
        <h1 className="splash__title">Home Bar</h1>
        <p className="splash__sub">いつでも、好きなものを</p>
      </div>
    </div>
  )
}
