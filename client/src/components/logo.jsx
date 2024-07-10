"use client"
import Image from "next/image"
function logo({w,h}) {
  return (
    <>
     <Image src={"/logo.png"} width={w} height={h} objectFit="cover" alt="logo" />
    </>
  )
}

export default logo