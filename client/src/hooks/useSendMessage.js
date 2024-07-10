import { useMutation , useReactiveVar} from "@apollo/client"
import { add_message } from "@/graphql/mutations"
import { gql } from "@apollo/client"
import { socket } from "@/app/chat/layout"
import { scrollToBottomChat } from "@/utils"

export let checkTypeMessage=(message)=>{
   console.log(message.media);
   if (message?.text_content?.length)  return 'text'
   if(message?.media?.length){
      if(message.media[0]?.type.startsWith('image')) return 'image'
      if(message.media[0]?.type.startsWith('video')) return 'video'
      if(message.media[0]?.type.startsWith('audio')) return 'audio'
   }
   return null
} 

export let Create_temporary_media=(media)=>{
  if(!media)return null
  
  let mediaUrls=media.map(el=>{
   let url=  URL.createObjectURL(el)
 
   return {
     type:el.type.split('/')[0],
     url,
     
   }
  } )
   
  return mediaUrls
}

export let Create_temporary_message=(message,sender_id)=>{
 
   return {
      _id: Date.now(),
      conversation_id:message?.conversation_id || Date.now(),
      sender_id:sender_id,
      text_content:message?.text_content,
      createdAt:Date(),
      type:checkTypeMessage(message),
      __typename:'Message',
      Status:'not-send',
      media:Create_temporary_media(message?.media)
   }
   
}

export default function userSendMessage(sender_id){
    let Socket=useReactiveVar(socket)
    let [addMessage]=useMutation(add_message,{
      onCompleted(data){
        Socket.emit('send-message',data?.add_message)
        
      },
      update(cache,{data: { add_message }}) {
         cache.modify({
          fields: {
            messages(existingTodos = []) {
              const newMessageRef = cache.writeFragment({
                data: add_message,
                fragment: gql`
                  fragment addFragment on Message {
                    _id
                    text_content
                    conversation_id
                    __typename
                    conversation_id
                    createdAt
                    Status
                  }
                `
              });
              return existingTodos.concat(newMessageRef);
            }
          }
        });
      }
    });
     
  return (message)=>{
    
    addMessage({
        variables:{message},
        optimisticResponse:{
          add_message:{
             ...Create_temporary_message(message,sender_id)
          }
        } 
    })
    
  }  
}  