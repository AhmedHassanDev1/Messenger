"use client"
import { useState } from "react"
import { conversationsQuery } from "@/graphql/queries"
import { useQuery , NetworkStatus } from "@apollo/client"
import ConversationsLoading from "@/components/loading/conversationsLoading"
import Loading from "@/components/loading/loading"
import ConversationCard from "@/components/cards/conversations/conversationCard"
import NotFoundConversations from "@/components/notfound/notFoundConversations"



function ConversationContainer() {
  let [MoreResutles,setMoreResutles]=useState(true)
  
  let {data,loading,fetchMore,networkStatus}=useQuery(conversationsQuery,{
     variables:{
      limit:50,
      offset:0,
     },
     notifyOnNetworkStatusChange:true,
    
  })
  
  let handleScroll=async(e)=>{
      if ((e.target?.scrollTop)>=(e.target.scrollHeight-e.target?.offsetHeight-100)&&MoreResutles) {
         let resultes=await fetchMore({variables:{offset:data?.conversations?.length}})
            
      }
      
 }
  return (
    <div className="relative flex gap-2 flex-col  items-center overflow-y-auto  " >
       {NetworkStatus.loading==networkStatus&&<ConversationsLoading/>}
        {data?.conversations.map(el=>{
            return <>
                   {el.type==='conversation'&& <ConversationCard info={el} /> }
                   </>
          })}
        {!data?.conversations.length&&!loading&&<NotFoundConversations/>}  
       {NetworkStatus.fetchMore==networkStatus&&<Loading w={35} h={35}/>} 
     </div>
  )
}

export default ConversationContainer