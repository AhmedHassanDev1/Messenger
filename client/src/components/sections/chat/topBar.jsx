"use client"
import { useReactiveVar } from "@apollo/client"
import { Current_conversation } from "@/app/chat/layout"
import Image from "next/image"
function topBar() {
  let conversation= useReactiveVar(Current_conversation)
  let image=conversation.image || '/profile-default-image.webp'
  return (
    <div className='top-bar-chat '>
        <div className="flex gap-2">
            <div className=" w-12 h-12 relative rounded-full overflow-hidden ">
              <Image src={image} alt="conversation-image" fill/>
            </div> 
            <div className="flex gap-2 flex-col justify-center">
              <p className=" text-lg font-semibold">{conversation?.name}</p>
            </div>
        </div>
        <div className=""></div>
    </div>
  )
}

export default topBar