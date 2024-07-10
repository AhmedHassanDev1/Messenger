"use client"
import { useForm  } from 'react-hook-form'

import { SignUp } from '@/utils/auth'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { LogInRoute } from '@/constants/router'

import cls from 'classnames'

import { Input_validation_fullname,
         Input_validation_email,
         Input_validation_password
 } from '@/utils/Input_validation'
import Link from 'next/link'

function page() {
  let { getValues , register, handleSubmit, formState: { errors }}=useForm() 

  let router=useRouter()
  
  let [formError,setFormError]=useState("")
  let [loading,setLoading]=useState(false)
  let submit=async(data)=>{
       try {
         
         setLoading(true)
         let user=await SignUp(data)
         router.push("/login")
         setFormError("")
        } catch (error) {
          setFormError(error?.message)
        }finally{
          setLoading(false)

       }
  }
  let Full_name=register("full_name",Input_validation_fullname)
  let Email=register("email",Input_validation_email)
  let password=register("password",Input_validation_password)
  let Confirm_password=register("confirm_password",{
    validate(value){
      return getValues("password")===value || "Passwords do not match"
    }
  })

  return (
    <>
      <h1 className=' text-xl'>create new account</h1>
      <form  
          onSubmit={handleSubmit(submit)}
          className="form">
{/* full name input */}
         <div className="space-y-3">
          <input
              type="text"
              placeholder='full name'
              className='input-form' 
              {...Full_name}
              />
            <span className="input-error">{errors?.full_name?.message}</span>  
         </div>

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
{/* email password */}

<div className="space-y-3">
          <input
              type="text"
              placeholder='enter password'
              className='input-form' 
              {...password}
              />
            <span className="input-error">{errors?.password?.message}</span>  
         </div>

         <div className="space-y-3">
          <input
              type="text"
              placeholder='Confirm password'
              className='input-form' 
              {...Confirm_password}
              />
            <span className="input-error">{errors?.confirm_password?.message}</span>  
         </div>
       {/* form error */}
         <div className="input-error pl-2 bg-red-200 border-solid border-l-4 border-l-red-700">{formError}</div> 
         {/* submit form */}
       <button
          disabled={loading}
          type="submit"
          className={cls({'submit' :true},{" opacity-75":loading})}
         >
          {loading?"loading...":"submit"}
          
       </button>
     <Link href={LogInRoute} className=' text-center text-sky-500'>i have already account </Link>
      </form>
    </>
  )
}

export default page