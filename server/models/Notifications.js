import mongoose,{Schema} from "mongoose"


let notifications=new Schema({
    conversation_id:String,
    count:Number,
},{timestamps: true})


let Notifications=mongoose.model("Notification",notifications)

export default Notifications