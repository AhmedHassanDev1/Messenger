"use client"
import Image from "next/image"
import { Current_conversation } from "@/app/chat/layout"
import { useReactiveVar } from "@apollo/client"

export let selectConversation=(info)=>{
        Current_conversation({
          _id:info._id,
          name:info?.name,
          image:info?.image,
          IsOnline:info?.IsOnline,
          Receiver_id:null
        })
      }
function conversationCard({info}) {
  let image=info.image || '/profile-default-image.webp'
  let conversation=useReactiveVar(Current_conversation)
  
  return (
    <div 
     
      onClick={()=>selectConversation(info)}
      className={`flex gap-2 w-full p-2 hover:bg-zinc-100 rounded-md cursor-pointer 
                 ${conversation?._id===info?._id&&'shadow-md bg-zinc-200'}`}>
       <div className=" w-16 h-16  relative rounded-full">
           <Image  src={image} alt="user-image" fill className="rounded-full" />
           <span className={` w-2 h-2 absolute bottom-4 right-3 translate-x-1/2 rounded-full 
                              ${info?.IsOnline?' bg-green-600':' bg-orange-600'}`}></span>
       </div>
       <div className=" py-2">
           <p className=" text-lg font-semibold">{info?.name}</p>
       </div>
    </div>
  )
}

export default conversationCard