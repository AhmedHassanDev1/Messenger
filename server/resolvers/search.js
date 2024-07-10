

import { User,Conversation } from "../models/index.js"

export let searchQuery={
   async search(_,{value},{user_id}){
     
     let resultes=await User.find({$text:{$search:value},_id:{$ne:user_id}},{ score: { $meta: "textScore" } }) 
     .sort({ score: { $meta: "textScore" }})
     .limit(30)  
    
     return resultes 
   }
}


export let searchType={
   async type({_id},{},{user_id}){
     let isConversation=await Conversation.findOne({members:{$all:[_id,user_id]}})
      
     if (isConversation) {
      return isConversation.type
    }
    return 'user'
   },
 async conversation_id({_id},{},{user_id}){
  let conversation=await Conversation.findOne({members:{$all:[_id,user_id]}})
  if (conversation) {
     return conversation._id
  }
  return null
 }  
}