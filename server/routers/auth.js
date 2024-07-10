import express from "express"
import { Signup ,Login , LoginByEmail , LogOut} from "../Services/authService.js"

let Router=express.Router()



Router.post("/signup",Signup)

Router.post("/loginByEmail",LoginByEmail)

Router.post("/login",Login)

Router.delete("/logout",LogOut)

export default Router