import React from 'react'
import Image from 'next/image'
import { Current_conversation } from '@/app/chat/layout'
function userCard({info}) {
   let image=info?.url||'/profile-default-image.webp' 
   console.log(info);
   let handleSelect=()=>{
     Current_conversation({
      _id:info?.conversation_id,
      name:info?.name,
      image:info?.image,
      Receiver_id:info?._id
     })
   }
  return (
    <div onClick={handleSelect} className=' flex gap-2 bg-white hover:bg-gray-100 hover:shadow-lg cursor-pointer p-3 rounded-md'>
      <div className=" relative w-12 h-12 flex gap-2 rounded-full  overflow-hidden">
        <Image src={image} fill  />
      </div>
      <h3 className=" mt-2">{info?.name}</h3>
    </div>
  )
}

export default userCard