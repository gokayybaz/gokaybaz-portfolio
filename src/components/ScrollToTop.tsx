import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const targetId = location.hash.slice(1)
    const target = targetId ? document.getElementById(targetId) : null
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [location.hash, location.key])

  return null
}
