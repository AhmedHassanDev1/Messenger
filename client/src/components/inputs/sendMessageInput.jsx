"use client"
import userSendMessage from "@/hooks/useSendMessage";
import { scrollToBottomChat } from "@/utils"
import { useRef, useState } from "react";

import { FaFaceGrinBeam } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

import { IoSend } from "react-icons/io5";
import { useReactiveVar } from "@apollo/client";
import { Current_conversation } from "@/app/chat/layout";
import { useSession } from "next-auth/react";

import AddImageBtn from "../buttons/addImageBtn";
import AddStickerBtn from "../buttons/addStickerBtn" 
import AddGifBtn from "../buttons/addGif" 
import MediaList from "../buttons/mediaList";
import VoiceRecordingBar from "./VoiceRecordingBar";

import { VoiceRecord } from '../buttons/VoiceRecordingBtn'

function sendMessageInput() {
  let {data}=useSession()
  let conversation=useReactiveVar(Current_conversation)
  let {Recording} =useReactiveVar(VoiceRecord)
  let [value,setValue]=useState('')
  let [media,setMedia]=useState([])
  let send=userSendMessage(data?.user?._id)
  
  let input=useRef()
  let sendMessage=()=>{
   


   if (media?.length) {
      let images=media?.filter(el=>el?.type.startsWith('image'))
      let videos=media?.filter(el=>el?.type.startsWith('video'))

      if (images?.length) {
        let message={
          conversation_id:conversation?._id,
          text_content:null,
          media:images,
          Receiver_id:conversation?.Receiver_id
        }
        
        send(message) 
      } else if(videos?.length){
          let message
          videos.forEach(el => {
            message={
              conversation_id:conversation?._id,
              text_content:null,
              media:[el],
           Receiver_id:conversation?.Receiver_id

            }
            send(message) 
          });
       
      }
  
   }

    if (value?.length) {
      let message={
        conversation_id:conversation?._id,
        text_content:value,
        Receiver_id:conversation?.Receiver_id
      }
      send(message) 
      input.current.value=''
      setValue('')
    }
    VoiceRecord({Recording:false})
    setMedia([])
    setTimeout(scrollToBottomChat,10)
  }
  return (
     <div className=" w-full flex gap-1 items-center">
   {Recording? <VoiceRecordingBar/>:
      <>
       <MediaList media={media} setMedia={setMedia}/>
        <div className={`add-media-container ${value?.length&&'hidden'}`}>
            <AddImageBtn setMedia={setMedia} media={media}/>
            <AddStickerBtn/>
            <AddGifBtn/>
          </div>
   
        
     
        <div className="send-message-wrapper">
         <input 
            onChange={e=>setValue(e.target.value.trim())}
            ref={input}
            autoComplete="off"
            type="text"
            name="send-message" 
            className="send-message-input" 
            translate="no"
            placeholder="Aa" 
            />
          <FaFaceGrinBeam className="icon-2" />
         </div> 
      </>}
        
        
          <div className="">
              {value.length||media.length||Recording?<IoSend className="icon-2" onClick={sendMessage} />:<AiFillLike className="icon-2" />}
          </div>
     </div>
  )
}

export default sendMessageInput