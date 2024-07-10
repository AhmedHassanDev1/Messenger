import mongoose,{Schema} from "mongoose"


let Media=new Schema({
    public_id:String,
    width:Number,
    height:Number,
    url:String,
    format:String,
    type:String
})

let message=new Schema({
    sender_id:{type:mongoose.Types.ObjectId,ref:"users"},
    text_content:String,
    type:String,
    conversation_id:{type:mongoose.Types.ObjectId,ref:"conversation"},
    replay:{type:mongoose.Types.ObjectId,ref:"message"},
    media:[{type:Media}], 
    deletes:[{type:mongoose.Types.ObjectId,ref:"users"}],
    hiddens:[{type:mongoose.Types.ObjectId,ref:"users"}],
   
},{timestamps: true})

let Message=mongoose.model("message",message)

export default Message