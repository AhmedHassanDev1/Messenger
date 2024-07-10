"use client"
import {chatRoute,SignUpRoute} from "@/constants/router"
import { signIn } from "next-auth/react"
import { useForm  } from 'react-hook-form'
import { LogIn } from '@/utils/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import cls from 'classnames'
import Link from "next/link"


function page() {

  let {  register, handleSubmit, formState: { errors }}=useForm() 

  let router=useRouter()
  
  let [formError,setFormError]=useState("")
  let [loading,setLoading]=useState(false)

  let Email=register("email",{required:{value:true,message:"email is require"}})
  let password=register("password",{required:{value:true,message:"email is require"}})
  let submit=async(data)=>{
       try {
          setLoading(true)

          let {email,password}=data   
          let {_id,name,image}=await LogIn(email,password)
     
          let sign=await signIn("credentials",
          {name,email,_id,image,redirect:true,callbackUrl:`http://localhost:3000/${chatRoute}`}) 
        
      
       } catch (error) {
         setFormError(error?.message)
       }finally{
         setLoading(false)
       }
  }

  return (
    <>
        <h3 className=' text-gray-500 '>signin messenger</h3>
        <form className='form' onSubmit={handleSubmit(submit)} >
              {/* email input */}

            <div className="space-y-3">
              <input
                  type="text"
                  placeholder='enter your email'
                  className='input-form' 
                  {...Email}
                  />
                <span className="input-error">{errors?.email?.message}</span>  
            </div>
    {/*  password input */}

    <div className="space-y-3">
              <input
                  type="text"
                  placeholder='enter password'
                  className='input-form' 
                  {...password}
                  />
                <span className="input-error">{errors?.password?.message}</span>  
            </div>
         {/* form error */}
         <div className="input-error pl-2 bg-red-300 border-solid border-l-4 border-l-red-900 text-sm font-bold ">{formError}</div>    
         <button
          disabled={loading}
          type="submit"
          className={cls({'submit' :true},{" opacity-75":loading})}
         >
          {loading?"loading...":"Login"}
          </button>
    <Link href={SignUpRoute} className=" text-center text-sky-500">create new account</Link>
        </form>
   </>
  )
}

export default page