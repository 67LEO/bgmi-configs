import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="monetag" content="b7f978c49a859491c0454ec86fd5246a" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
