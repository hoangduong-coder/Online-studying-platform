import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("new-user-token")

  return {
    headers: {
      ...headers,
      authorization: token ? token : null,
    },
  }
})

const HttpLink = createHttpLink({
  uri: "https://hd-online-studying-platform-api.onrender.com/",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(HttpLink),
})

export default client
