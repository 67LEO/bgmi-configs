import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="monetag" content="b7f978c49a859491c0454ec86fd5246a" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7XYKMQ7D34" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7XYKMQ7D34');
          `
        }} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
