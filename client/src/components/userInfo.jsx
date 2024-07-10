"use client"
import Image from "next/image";
import { useReactiveVar } from "@apollo/client";
import { Current_conversation } from "@/app/chat/layout";
export default function userInfo() {
   let conversation=useReactiveVar(Current_conversation) 

    let image=conversation?.url||'/profile-default-image.webp' 
  return (
    <div className='w-full flex gap-1 flex-col items-center p-6 '>
      <div className=" relative w-20 h-20  rounded-full  overflow-hidden">
        <Image src={image} fill  />
      </div>
      <h3 className=" text-lg font-semibold mt-2">{conversation?.name}</h3>
    </div>
  )
}
