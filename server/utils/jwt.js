import JWT from "jsonwebtoken";

import { JWT_SECRET } from "../exports.js";

export let genJwt=(user)=>{
    let jwt=JWT.sign(user,JWT_SECRET,{expiresIn:"30day"})
    
    return jwt
}

export let verifyToken=(token)=>{
  let jwt=JWT.verify(token,JWT_SECRET)
   return jwt
 }