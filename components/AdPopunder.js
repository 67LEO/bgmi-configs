import { useEffect } from 'react'

export default function AdPopunder() {
  useEffect(() => {
    const scripts = [
      'https://pl29373823.profitablecpmratenetwork.com/de/4b/6c/de4b6c007b52589d664b5fe825cba77c.js',
      'https://pl29373888.profitablecpmratenetwork.com/cc/87/41/cc874143100f3b00c319bf6c137e1ad3.js'
    ]
    scripts.forEach(src => {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      document.body.appendChild(s)
    })

    // Smartlink popunder
    setTimeout(() => {
      window.open(
        'https://www.profitablecpmratenetwork.com/p8fyvzea6j?key=eb2013329dfcb22abffd12d47fd3a610',
        '_blank'
      )
    }, 3000)
  }, [])

  return null
}
