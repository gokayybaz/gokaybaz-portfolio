import { useEffect, useRef } from 'react'

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = canvas.width = rect.width
      h = canvas.height = rect.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = window.innerWidth < 640 ? 24 : 60
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        ctx.fillStyle = 'rgba(74, 222, 128, 0.5)'
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2)
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.14 * (1 - d / 120)})`
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true" />
}
