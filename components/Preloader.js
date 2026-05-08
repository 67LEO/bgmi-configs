import { useEffect } from 'react'

export default function Preloader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById('preloader')
      if (el) {
        el.style.opacity = '0'
        setTimeout(() => el.style.display = 'none', 500)
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return null
}
