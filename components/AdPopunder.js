import { useEffect } from 'react'

export default function AdPopunder() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://pl29373823.profitablecpmratenetwork.com/de/4b/6c/de4b6c007b52589d664b5fe825cba77c.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
