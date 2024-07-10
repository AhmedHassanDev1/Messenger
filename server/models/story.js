import mongoose,{Schema} from "mongoose"

let story=new Schema({
   user_id:{type:mongoose.Types.ObjectId,ref:"users"},
   url:String,
   views:[{type:mongoose.Types.ObjectId,ref:"users"}],
   status:String,
},{timestamps: true})

let Story=mongoose.model("story",story)

export default Story