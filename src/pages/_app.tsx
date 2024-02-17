import Layout from '@/components/Layout/_layout'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp