import {PORT,CLIENT_URL} from "./exports.js"
import express from "express"
import {Server} from "socket.io"
import {redis} from "./models/index.js"
import {connection,
        disconnect,
        sendMessage,
        deleteMessage
        } from "./utils/socketEvents.js"

let app=express()

let corsOptions={
    origin:[CLIENT_URL],
    methods: ["GET", "POST"]
}


let server = app.listen(PORT,()=>{
       redis.del("onlineUsers")
       console.log("server run on",PORT);
})

let io=new Server(server,{cors:corsOptions})
 

 io.on("connection",async(client)=>{
    let {user_id}=client.handshake.query
    let socket_id=client.id
    client.broadcast.emit("online",user_id)
    if(!!user_id && !!socket_id) await connection(user_id,socket_id)
   
    client.on('send-message',async(data)=>{
       sendMessage(io,data)
    })
    
    client.on('delete-message',(DeletionType,message_id)=>{
      deleteMessage(io,user_id,DeletionType,message_id)
    } )   
    client.on("disconnect",()=>{
      disconnect(user_id)
      client.broadcast.emit("offline",user_id)
    })
   })

  export {app}