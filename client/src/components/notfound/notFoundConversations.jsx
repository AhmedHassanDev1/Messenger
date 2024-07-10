"use client"
import Image from "next/image";
function notFoundConversations() {
  return (
    <div className="w-full h-full flex flex-col  items-center">
    <div className=" relative w-4/5  aspect-square ">
       <Image src={"/messenger_conversation.png"} alt="conversation_image" fill objectFit="cover"/>
    </div>  
       <h1 className=" font-bold text-xl">No Messages</h1>
       <h6 className="  font-medium text-gray-500">New messages will appear here.</h6>
 </div>
  )
}

export default notFoundConversations