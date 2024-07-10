
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export function middleware(req){
  let cookie=cookies()
  let token=cookie.get("access-token")
    if (!token) {
        return NextResponse.redirect(new URL("/",req.url))
     }
}



export const config = {
    matcher: '/chat',
  }