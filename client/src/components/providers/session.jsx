"use client"
import { SessionProvider } from "next-auth/react"
function session({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default session