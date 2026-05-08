import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="preloader" className="preloader">
          <div className="preloader-inner">
            <div className="preloader-logo">🎯</div>
            <div className="preloader-text">BGMI CONFIGS</div>
            <div className="preloader-bar"><div className="preloader-fill" /></div>
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
