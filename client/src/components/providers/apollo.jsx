"use client"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { useCookies } from 'next-client-cookies'; 
import cachOptions from "../../options/caching"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

export let client
export let cache=new InMemoryCache(cachOptions)

function apollo({children}) {
  const cookies = useCookies();
  const token=cookies.get("access-token")
   
   client=new ApolloClient({
    link:createUploadLink({
       uri:process.env.NEXT_PUBLIC_API_URL,
       headers:{
        "access-token":token,
        'Apollo-Require-Preflight':'true'
      },
      }), 
   
    cache
  })
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export default apollo
