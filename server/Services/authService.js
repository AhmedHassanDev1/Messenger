import {body,validationResult} from "express-validator"
import { User } from "../models/index.js";
import {hashing,compareHashing} from "../utils/hashing.js"
import {genJwt} from "../utils/jwt.js"
import asyncHandler from "express-async-handler"
export let validatorErrorHanling=(req,res,next)=>{
    let errors=validationResult(req)

   if (errors.errors.length) {
      return res.status(400).json({message:errors.array()[0].msg}) 
    }
   return next();
}



export let Signup=[
  body("name").trim().notEmpty().withMessage("usename is required"),
  body("email").trim().isEmail().withMessage("email is not valid").
  custom(async email=>{
    let Exist=await User.exists({email})
    if(Exist) throw new Error("email is already exist")
  }),
  body("password").trim().notEmpty().withMessage("password is required").
  isLength({min:8}).withMessage("Password must be at least 8 characters"),
  validatorErrorHanling,
 asyncHandler( async(req,res)=>{
    
      let {name,email,password}=req.body
      
      let hash=await hashing(password)
      let user=new User({name,password:hash,email})
      await user.save()
      let {image}=user
      res.status(200).json({name,email,image}) 
     
  } )
]


export let Login=[
  body("email").trim().isEmail().withMessage("email is not valid").
  custom(async email=>{
    let Exist=await User.exists({email})
    if(!Exist) throw new Error("email is not exist")
  }),
  validatorErrorHanling,
  asyncHandler(async(req,res)=>{
    let {email,password}=req.body

    let {_id,name,image,password:hash}=await User.findOne({email})
    let passwordValid=await compareHashing(password,hash)
    if (!passwordValid) throw new Error("password is not valid") 
    image=image||null
    let jwt= genJwt({_id,name,email})
   
    res.cookie("access-token",jwt,{maxAge:(1000*60*60*24*30),httpOnly:false})
    res.json({_id,name,email,image})
      
  })
]

export let LoginByEmail=[
  body("email").trim().isEmail().withMessage("email is not valid"),
  validatorErrorHanling,
  asyncHandler(async(req,res,next)=>{
    let {name,email,image} =req.body 
   
    let user=await User.findOneAndUpdate({email},{$set:{name,image,email}},{upsert:true})
    let token= genJwt({_id:user._id,name,email})
    res.status(400).json({_id:user._id,name,email,image,token})  
  })
]


export let LogOut=async(req,res,next)=>
   asyncHandler(async(req,res,next)=>{
  
      
  })
