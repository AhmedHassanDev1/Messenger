'use client'
import { MdDeleteForever } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { socket as io } from "@/app/chat/layout";
import { useReactiveVar } from "@apollo/client";
import { deleteMessage } from "@/utils/cach_crud";
import { useSession } from "next-auth/react";

function deleteMessageBtn({message_id,sender_id}) {

   let {data}=useSession()
   let socket= useReactiveVar(io)
   let [remove,setRemove]=useState(false)
   let [DeletionType,setDeletionType]=useState(data?.user?._id==sender_id?'everyone':'for me')
    let close=()=>{
        setRemove(false)
    }
 
    let Delete=()=>{
       socket.emit('delete-message',DeletionType,message_id)
       deleteMessage(message_id)
       setRemove(false)
    }
    return (
    <div  className=" text-gray-400 text-xl p-2 hover:bg-slate-100 rounded-full">
        <MdDeleteForever onClick={()=>setRemove(true)} />
        {remove&&
            <div onClick={close} 
                 className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-[#ffffffae] z-50">
                 <div onClick={e=>e.stopPropagation()}
                      className=" w-full max-w-xl p-4 bg-white shadow-lg rounded-xl space-y-5">
                      <div className="flex items-center gap-2">
                          <p className="flex-1 text-center font-extrabold text-black">Who do you want to remove this message for?</p>
                          <div className="text-gray-400 text-xl p-2 hover:bg-slate-100 rounded-full">
                          <MdClose onClick={close} />
                          </div>
                      </div>
                      <div className="">
                        
                             <div className={`flex gap-2 items-start ${data?.user?._id!==sender_id?'opacity-50':'opacity-100 '}`}>
                             <input 
                                onClick={()=>setDeletionType('everyone')} 
                                  id="Unsend-for-everyone"
                                  name='delete'
                                  type="radio"
                                  value='everyone'
                                  checked={DeletionType=='everyone'&&data.user._id==sender_id}
                                  disabled={data.user._id!==sender_id}
                                  />
                             <div className=" text-sm text-black">
                                 <label 
                                   htmlFor="Unsend-for-everyone"
                                   className=" font-extrabold">Unsend for everyone</label>
                                 <p className="">This message will be unsent for everyone in the chat. Others may have already seen or forwarded it. Unsent messages can still be included in reports.</p>
                             </div>
                          </div>
                     
                         <div className=" flex gap-2 items-start">
                            <input
                              onClick={()=>setDeletionType('for me')}
                               id="Remove-for-you"
                               name='delete' 
                               type="radio"
                               checked={DeletionType=='for me'&&!data.user._id!==sender_id}
                                />
                            <div className=" text-sm text-black">
                                <label 
                                 htmlFor="Remove-for-you"
                                 className=" font-extrabold">Remove for you</label>
                                <p className="">This message will be removed for you. Others in the chat will still be able to see it.</p>
                            </div>
                         </div>
                      </div>
                      <div className=" w-full grid grid-cols-2 gap-2 text-white">
                       <button 
                            className="bg-gray-400 rounded-2xl p-2 " 
                            onClick={close}>cancel</button>
                       <button 
                          className="bg-rose-600 rounded-2xl p-2"
                          onClick={Delete}
                          >Delete</button>
                      </div>
                </div>
            </div> 
            
        }
    </div>
  )
}

export default deleteMessageBtn