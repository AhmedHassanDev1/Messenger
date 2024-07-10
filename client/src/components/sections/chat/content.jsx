'use client'
import Loading from "@/components/loading/loading";
import  Message from "../../cards/message/index"
import { useQuery, useReactiveVar } from "@apollo/client";
import { messageQuery } from "@/graphql/queries";
import { Current_conversation } from "@/app/chat/layout";
import { scrollToBottomChat } from "@/utils"
import { useState } from "react";
import UserInfo from "@/components/userInfo";
export let GetMessagesvariables 

function content() {
  let [MoreResutles,setMoreResutles]=useState(true)
  let limit=30
  let {_id}=useReactiveVar(Current_conversation)
  GetMessagesvariables={
    conversation_id:_id,
    limit,
    offset:0,
  }
  let {data,fetchMore}=useQuery(messageQuery,{
    variables:GetMessagesvariables,
   fetchPolicy:'network-only',
   nextFetchPolicy:'cache-only',
   onCompleted(data){
    
    if(data.messages.length<limit){
       setMoreResutles(false)  
    }  
    scrollToBottomChat()
   }
}) 

let handleScroll=async(e)=>{
  if (e.target?.scrollTop<100&&MoreResutles) {
    console.log(e.target?.scrollTop);

     let resultes=await fetchMore({variables:{offset:data?.messages?.length}})
     console.log(resultes);
      if(resultes.messages?.length<limit){
        setMoreResutles(false)
      }    
  }
  
}
  return (
    <div id='content-chat' className="content-chat" onScroll={handleScroll}>
      {!MoreResutles&&<UserInfo/>}
      {data?.messages.map(message=> <Message info={message}/> )}   
    </div>
  )
}

export default content