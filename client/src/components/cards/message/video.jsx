'use client'
import { useRef , useState } from "react"
function video({video}) {
  let videoRef=useRef() 
  return (
    <video ref={videoRef} width={350}  className="aspect-video bg-gray-50 shadow-md rounded-lg" controls autoplay  loop preload="none">
      <source src={`${video[0].url}`}  type="video/mp4" />
      <source src={`${video[0].url}`}  type="video/ogg" />
    </video>
  )
}

export default video