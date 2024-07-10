import SessionProvider from "./session"
import ApolloProvider from "./apollo"
import { CookiesProvider } from 'next-client-cookies/server';
export default function index({children}) {
  return (
  <CookiesProvider>
    <SessionProvider>
      <ApolloProvider>
         {children}
      </ApolloProvider>
    </SessionProvider>
  </CookiesProvider>
  )
}
