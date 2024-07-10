"use client"

import useMessageReception from "@/hooks/useMessageReception";
import AsideBar from "@/components/asideBar";
import Chat from "@/components/sections/chat/index"
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { makeVar } from '@apollo/client';
import { io } from "socket.io-client"
import { defaultPublicSetting } from "@/options";
import { deleteMessage } from "@/utils/cach_crud";


// create reactive variables
export const socket = makeVar({});
export const Current_conversation=makeVar(null)
export const searchResultes=makeVar({resultes:[],loading:false,searching:false,value:''})
export const PublicSetting=makeVar(defaultPublicSetting)


function page({children}) {
  let messageRecepion=useMessageReception()
  let socketIO
  let {data}=useSession()

 let query={
     user_id:data?.user._id
  }
  socketIO=io(process.env.NEXT_PUBLIC_SOCKET_IO,{query})

  socketIO.on("connect",()=>{
    // share socket io
      socket(socketIO)
      
  })

  socketIO.on('message-reception',(message)=>{
    messageRecepion(message)
  })

  socketIO.on('Receive-deleted-message',(message_id)=>{
    deleteMessage(message_id)
  })


 useEffect(()=>{

      return ()=>{
        socketIO.off()
        socketIO.disconnect()
      }
},[]) 


  return (
    <main className="chat-page">
        <AsideBar/>
        {children}
 
        <Chat/>
    </main>
  )
}

export default page

