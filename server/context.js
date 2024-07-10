import { verifyToken } from "./utils/jwt.js"
let context=({req})=>{
 
  let token=req.headers["access-token"]
  
  if(token?.length){
  
    try {
      let {_id,name}= verifyToken(token)
      let user={user_id:_id,name}
      return user
      
   } catch (error) {
      throw new Error("token is invalid ")
   }
  }else{
    throw new Error("token is not found")
  }
}

export default context