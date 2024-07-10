'use client'
import { FaMicrophone } from "react-icons/fa";
import { makeVar } from "@apollo/client";
import { useRef, useState } from "react";
export let VoiceRecord=makeVar({Recording:false})
function VoiceRecordingBtn({setMedia,media}) {
  let recordedChunks=useRef([])

  let StartRecord=async()=>{
    VoiceRecord({Recording:true})
   let stream=await navigator.mediaDevices.getUserMedia({audio:true})
   let mediaRecorder= new MediaRecorder(stream) 
   
   mediaRecorder.ondataavailable =(e)=> {
      if (e.data.size > 0) {
        recordedChunks.current.push(e.data);
      }
    };
    mediaRecorder.onstop=()=>{
      let audio=new Blob(recordedChunks.current,{type:'audio/wav'})
      setMedia([...media,audio])
    }
     
     mediaRecorder.start()
     VoiceRecord({mediaRecorderRef:mediaRecorder,Recording:true})
  } 

  
  return (
    <div onClick={StartRecord} className="icon-2">
      <FaMicrophone />
    
    </div>
  )
}

export default VoiceRecordingBtn