import { client ,cache } from "@/components/providers/apollo"
import { gql } from "@apollo/client"
import { messageQuery , conversationsQuery } from "@/graphql/queries"
import { GetMessagesvariables } from "@/components/sections/chat/content"

export let getMessages=()=>{
        let messages=client.readQuery({
            query:messageQuery,
            variables:GetMessagesvariables
        })
  
        return messages?.messages
}

export let deleteMessage=(message_id)=>{
    cache.modify({
        id: `Message:${message_id}`,
        fields: {
          Status() {
            return 'deleted'
          },
        },
        /* broadcast: false // Include this to prevent automatic query refresh */
      });
}

export let addMessage=(newMessage)=>{
  let messages=getMessages()
  let data={
    messages:[...messages,newMessage]
  }
  client.writeQuery({
    query:messageQuery,
    data,
    variables:GetMessagesvariables
  })
}

// export let updateMessage={
//     update(cache,{data: { add_message }}) {
//         cache.modify({
//          fields: {
//            messages(existingTodos = []) {
//              const newMessageRef = cache.writeFragment({
//                data: add_message,
//                fragment: gql`
//                  fragment addFragment on Message {
//                    _id
//                    text_content
//                    conversation_id
//                    __typename
//                    conversation_id
//                    createdAt
//                    Status
//                  }
//                `
//              });
//              return existingTodos.concat(newMessageRef);
//            }
//          }
//        });
//      }
// }

export let getConversation=(id)=>{
    const Conversation = client.readFragment({
        id: `Conversation:${id}`, 
        fragment: gql`
          fragment getConversation on Conversation {
            _id
                image
                name
                IsOnline
                type
                members_count
                members {
                    _id
                    image
                }
                last_message{
                    text_content
                    media{
                        type
                    }
                }
          }`,
      });

      return Conversation
}

export let getConversations=()=>{
    let Conversations=client.readQuery({
        query:conversationsQuery,
        variables:{
            limit:30,
            offset:0,
        },
    })

    return Conversations?.conversations || []
}

export let removeConversation=(id)=>{

}

export let addConversation=()=>{}

export let Online=()=>{}

export let offline=()=>{} 