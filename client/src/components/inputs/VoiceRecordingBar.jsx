'use client'
import { useReactiveVar } from '@apollo/client'

import { IoCloseSharp } from "react-icons/io5";
import { VoiceRecord } from '../buttons/VoiceRecordingBtn';


function VoiceRecordingBar() {
 

   

  
  return (
    <>
        <div className=" bg-sky-500 rounded-full p-1 text-white cursor-pointer">
            <IoCloseSharp  />
        </div>
        <div className="flex-1 bg-sky-500 h-7 rounded-full  overflow-hidden ">
          <div className="h-full bg-[#ffffff59] animate-[fullWidth_60s_linear] ">
          </div>  
        </div>
    </>
  )
}

export default VoiceRecordingBar