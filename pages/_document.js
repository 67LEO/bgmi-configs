import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="corner-logo">
          <img src="https://res.cloudinary.com/dm2hjn5wp/image/upload/q_auto/f_auto/v1778225949/WhatsApp_Image_2026-05-08_at_13.08.27_gvmasr.jpg" alt="Syco Configs" />
        </div>
        <div id="preloader" className="preloader">
          <div className="preloader-inner">
            <div className="preloader-text">SYCO CONFIGS</div>
            <div className="preloader-bar"><div className="preloader-fill" /></div>
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
