import "@/styles/globals.css"
import "@/styles/bar.scss"
import "@/styles/widget.scss"
import "@/styles/dashboard.scss"

import type { AppProps } from "next/app"
import Layout from "./components/layouts/layout"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
