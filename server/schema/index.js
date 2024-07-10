import { gql } from "apollo-server";

let schema=gql`
# scalars ----------------------------------------------------
 
scalar Upload

# enum ----------------------------------------------------
enum searchResultesTypes{
    user
    conversation
    group
}

# inputs ----------------------------------------------------

input add_message{
  media:[Upload]
  conversation_id:ID  
  text_content:String
  Receiver_id:ID
}


# Types -----------------------------------------------------

type User{
  _id:ID! 
  name:String
  image:String
  
}

type searchResultes{
  _id:ID!
  conversation_id:ID 
  name:String
  image:String
  type:searchResultesTypes
}

type Conversation{
  _id:ID! 
  name:String
  image:String
  IsOnline:Boolean
  type:String
  members:[User]
  members_count:Int
  last_message:Message
}

type Message{
  _id:ID!
  sender_id:ID!  
  conversation_id:ID!  
  text_content:String
  media:[Media!]  
  createdAt:String
  Status:String
  type:String
}  

type Media{
    url:String
    format:String
    type:String 
}

# Query ----------------------------------------------------

type Query{
    messages(conversation_id:ID,limit:Int=50,offset:Int=0):[Message]
    conversations(limit:Int=25,offset:Int=0):[Conversation]
    conversation(conversation_id:ID!):Conversation
    search(value:String):[searchResultes]

 } 

# Mutation ----------------------------------------------------
type Mutation{
    add_message(message:add_message):Message
    delete_message(message_id:ID):String
    hide_message(message_id:ID):String
    create_group(members:[ID!]!):Conversation
    delete_group(members:[ID!]!):Conversation
    edite_user(name:String,image:String):String
}

`
export default schema