
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express  from 'express';
import cors from "cors"
import {app} from "./Socket.IO.js"

import Auth from "./routers/auth.js"
import resolvers from './resolvers/index.js';
import typeDefs from './schema/index.js';
import context from "./context.js" 
import { CLIENT_URL,NODE_ENV } from './exports.js';
import  graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.mjs'

async function InitServer(){
  let server=new ApolloServer({
    resolvers,
    typeDefs,
    context,
    csrfPrevention:true
  })

  await server.start()
  
 
  app.use(graphqlUploadExpress())
  app.use(cors({origin:[CLIENT_URL], credentials: true}))
  app.use(cookieParser())
  app.use(express.json())
  
  app.use("/auth",Auth)
  server.applyMiddleware({app})
  
  app.use("*",(req,res,next)=>{
      res.status(404).json({message:"this route not found"})
      next()
  })
 
  app.use((err,req,res,next)=>{
     if (NODE_ENV=="dev") {
      return res.status(400).json({stack:err.stack,message:err.message})
     }else{
      return res.status(400).json({message:err.message})
     }
})

 
}

InitServer()

