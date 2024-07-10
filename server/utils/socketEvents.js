import { redis } from "../models/index.js";

import {Conversation,User,Message} from "../models/index.js" 

export let connection=async(user_id,socket_id)=>{
  await redis.hSet("onlineUsers",user_id,socket_id)
}

export let disconnect=(user_id)=>{
   redis.hDel("onlineUsers",user_id)
   User.updateOne({_id:user_id},{$set:{Last_seen:Date()}})
}


export let sendMessage=async(io,message)=>{
  let conversation_id=message?.conversation_id
  
  let conversation=await Conversation.findById(conversation_id)
  let Members=conversation?.members.filter(el=>String(el)!==message.sender_id) 
  
  Members.forEach(async(el) => {
    let socket_id=await redis.hGet("onlineUsers",String(el))
  
    if (socket_id) return io.to(socket_id).emit('message-reception',message)
  });
}


export let deleteMessage=async(io,user_id,DeletionType,message_id)=>{
   let message=await Message.findById(message_id)
   let conversation=await Conversation.findById(message.conversation_id)
   let members= conversation.members
  if (DeletionType=='for me'){
     await Message.updateOne({_id:message_id},{$set:{deletes:[user_id]}})  
  } else if(DeletionType=='everyone'){
     await Message.updateOne({_id:message_id},{$set:{deletes:members}})   
     members.forEach(async(el)=>{
       let socket_id=await redis.hGet('onlineUsers',String(el))
       io.to(socket_id).emit('Receive-deleted-message',message_id)
     })
   }
  
}


export let typeing=async(id)=>{
    
}