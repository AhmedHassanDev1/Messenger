
import { userQuery,userMutation } from "./user.js"
import { messageType ,messageQuery , messageMutation } from "./message.js"
import { conversationType , conversationQuery } from "./conversation.js"
import {searchQuery,searchType} from "./search.js"
import  GraphQLUpload  from 'graphql-upload/GraphQLUpload.mjs'
let resolvers={
  Upload:GraphQLUpload,
  
  Message:messageType,
  Conversation:conversationType,
  searchResultes:searchType,
  Query:{
    ...userQuery,
    ...messageQuery,
    ...conversationQuery,
    ...searchQuery
  },

  Mutation:{
    ...userMutation,
    ...messageMutation
  }
}

export default resolvers