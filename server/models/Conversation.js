import mongoose,{Schema} from "mongoose"

let conversation=new Schema({
    name:String,
    members:[{type:mongoose.Types.ObjectId,ref:"user"}],
    type:{type:String},

},{timestamps: true})

let Conversation=mongoose.model("conversation",conversation)

export default Conversation