"use client"
import ListSelectMedia from "./listSelectMedia"
import SendMessageInput from "@/components/inputs/sendMessageInput";

function bottomBar() {
 

  
  return (
    <div className='bottom-bar-chat'>
       <ListSelectMedia/>
       <SendMessageInput/>
     
    </div>
  )
}

export default bottomBar