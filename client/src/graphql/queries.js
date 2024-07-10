const { gql } = require("@apollo/client");

export let searchQuery=gql`
        query search($value:String){
            search(value:$value){
                _id
                name
                image
                type
                conversation_id
            }
        }

`


export let conversationsQuery=gql`
       query conversations($limit:Int,$offset:Int){
        conversations(limit:$limit,offset:$offset){
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
         }
      }

`

export let messageQuery=gql`
   query messages($conversation_id:ID,$limit:Int,$offset:Int){
        messages(conversation_id:$conversation_id,limit:$limit,offset:$offset){
            _id
            sender_id
            conversation_id
            text_content
            createdAt
            type
            Status
            media{
                url
                type
            }
       }
   }

`