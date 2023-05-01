import "@/styles/globals.css"
import "@/styles/bar.scss"
import "@/styles/widget.scss"
import "@/styles/dashboard.scss"
import "@/styles/auth.scss"
import "@/styles/CourseAndLesson.scss"

import { ApolloProvider } from "@apollo/client"
import type { AppProps } from "next/app"
import Layout from "@/components/layouts/layout"
import client from "@/graphql/client"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
