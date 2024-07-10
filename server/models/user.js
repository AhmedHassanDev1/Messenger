import mongoose,{Schema} from "mongoose"

let user=new Schema({
    name:{type:String,required:true},
    password:String,
    email:{type:String,required:true,unique:true},
    image:String,
    Last_seen:{type:Date,default: Date()}
},{timestamps: true})

let User=mongoose.model("user",user)

export default User