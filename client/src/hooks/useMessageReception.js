"use client"
import { useReactiveVar } from "@apollo/client"
import { Current_conversation } from "@/app/chat/layout"
import { addMessage } from "@/utils/cach_crud"
import { scrollToBottomChat } from "@/utils"
function useMessageReception() {
    let conversation=useReactiveVar(Current_conversation)
    return (message)=>{
          if(conversation?._id===message.conversation_id){
            addMessage(message)
            setTimeout(scrollToBottomChat,10)
          }
          

    }
}

export default useMessageReception


