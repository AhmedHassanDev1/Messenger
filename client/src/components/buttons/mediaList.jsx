"use client"
import { FaCirclePlus } from "react-icons/fa6";
import VoiceRecordingBtn from "./VoiceRecordingBtn";
import AddImageBtn from "./addImageBtn";
import AddStickerBtn from "./addStickerBtn"
import { useState } from "react";
function mediaList({setMedia,media}) {
   let [openList,setOpenList]=useState(false) 

  return (
    <div className=" relative">
        <div className={`space-y-3 absolute -left-2 -top-full -translate-y-full bg-white p-2 shadow-xl drop-shadow-lg ${openList?' block':'hidden'} `  }>
          <div className="flex gap-1 items-center cursor-pointer">
            <VoiceRecordingBtn  setMedia={setMedia} media={media}/>
            <p className=" whitespace-nowrap text-sm font-semibold ">send Voice Record</p>
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <AddImageBtn setMedia={setMedia} media={media}/>
            <p className="whitespace-nowrap text-sm  font-semibold ">add files</p>
          </div>
          <div className="flex gap-1 items-center cursor-pointer">
            <AddStickerBtn  setMedia={setMedia} media={media}/>
            <p className="whitespace-nowrap text-sm  font-semibold  ">add stickers</p>
          </div>
          <div className=" w-4 h-4 absolute bg-white bottom-0 left-2 translate-y-1/2 rounded-sm rotate-45  "></div>
        </div>
      <FaCirclePlus onClick={()=>setOpenList(!openList)} className="icon-2" />
    </div>
  )
}

export default mediaList