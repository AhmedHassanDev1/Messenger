import {Conversation,User,Message} from "../models/index.js"
import { UploadImage } from "../utils/uploads.js"

export let messageType={
     async Status(message,_,{user_id}){
     
      let sender_id=message?.sender_id
      let convertDeletes=message.deletes.map(el=>String(el))
      if (convertDeletes.includes(String(user_id))||convertDeletes.includes(String(sender_id))) {
       
        return 'deleted'
      }else{
        return 'send'
      }
     }
}

export let messageQuery={
    async messages(_,{conversation_id,offset,limit}){
    
     if (conversation_id) {
       let Messeges=await Message.find({conversation_id})
       .sort({createAt:1}) 
       .skip(offset) 
       .limit(limit)
      return Messeges
     }
     return []
    }
   
}

export let messageMutation={
  async add_message(_,{message:{conversation_id,text_content,Receiver_id,media=[]}},{user_id}){
    if(!conversation_id){
      let conversationExists=await Conversation.findOne({$and:[{members:{$all:[user_id,Receiver_id]}},{members:{$size:2}}]})
        if (conversationExists) {
          conversation_id=conversationExists?._id
        } else{
          let conversation=await Conversation.insertMany([{members:[user_id,Receiver_id],type:'conversation'}])
           conversation_id=conversation[0]?._id
        } 
    }
    let mediaInfo=[]
    let fileInfo={}
    if(media?.length){
      for (let i = 0; i < media.length; i++) {
        fileInfo= await UploadImage(media[i])
         mediaInfo.push(fileInfo) 
      }
    } 
    
    let type ='';
    if (text_content) {
        type='text'
    }else if(mediaInfo.length) {
         type=mediaInfo[0].type 
    }

    let messageContent={sender_id:user_id,conversation_id,text_content,type,media:mediaInfo}
    if (conversation_id) {
      let messages = await Message.insertMany([messageContent]) 
      
      return messages[0]
     }

  },
  async delete_message(){},

}








