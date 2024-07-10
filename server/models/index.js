import mongoose from "mongoose";
import { MONGODB_URL , DATABASE_NAME_MONGODB as dbName } from "../exports.js";
import User from "./user.js" 
import Message from "./message.js" 
import Conversation from "./Conversation.js" 
import Story from "./story.js";
import Notifications from "./Notifications.js"

import { createClient } from 'redis';
import { REDIS_URL } from "../exports.js";


const client = createClient({url:REDIS_URL})

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

mongoose.connect(MONGODB_URL,{dbName})
.then(()=>
{
        console.log("mongodb is connecting ...")
        
})
.catch(err=>console.log(err))

export {User,
        Message,
        Conversation,
        Story,
        Notifications,
        
        client as redis}