const { gql } = require("@apollo/client");

export let add_message=gql`
        mutation add_message($message:add_message){
            add_message(message:$message){
                 _id
                 __typename
                 type
                 sender_id
                 conversation_id
                 text_content
                 createdAt
                 Status
                 media{
                    url
                    type
                 }
            }
        }

`