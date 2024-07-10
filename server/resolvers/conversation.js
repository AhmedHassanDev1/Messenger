import {Conversation,User,Message} from "../models/index.js"
import { redis } from "../models/index.js"


export let conversationQuery={
 async conversations(_,{limit,offset},{user_id}){

      let conversations=await Conversation.find({members:{$in:[user_id]}})
                                        .sort({updatedAt:-1})
                                        .skip(offset)     
                                        .limit(limit)
                            
    
    return conversations
 }
} 

export let conversationType={
     async IsOnline({members,type},_,{user_id}){
       if (type==='conversation') {
            let userId=members.filter(el=>String(el)!==user_id)
        
            let isOnline=await redis.hGet('onlineUsers',String(userId[0]))
            return  !!isOnline 
        }
     },
    async members_count({members}){
         return members?.length
    } ,
    async name({name,members,type},_,{user_id}){
        if (type==='conversation') {
            let userId=members.filter(el=>String(el)!==user_id)
            if (type==='conversation') {
                let user=await User.findOne({_id:userId[0]})
                return user.name
            }else if (type==='grpup') {
                return name 
            }
           
        }
    }, 
    async image({members,type},_,{user_id}){
        if (type==='conversation') {
            let userId=members.filter(el=>String(el)!==user_id)
            if (type==='conversation') {
                let user=await User.findOne({_id:userId[0]})
                return user.image
           }
        }
    }, 
    async members({_id,type},_,{user_id}){
        let users=await Conversation.findOne({_id}).populate("members").limit(3)
        if (type=='group') {
            return users.members.filter(el=>String(el._id)!==user_id)
        }
        return null
    }, 
    async last_message({_id}){
        let message=await Message.findOne({conversation_id:_id})
        return message
    }
 } 
 
