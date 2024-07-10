"use client"
import Image from "next/image"
import Vidoe from "./video"
function media({type,media}) {
  
  return (
  media.length?<div className="media-container">
         {type==='image'&&
         <div className="image-container">
             {media.map(el=>{
                return  <div className="relative bg-gray-50 min-w-[190px] shadow-md aspect-square  rounded-xl overflow-hidden">
                          <Image src={el?.url} 
                            fill
                            quality={100}
                            placeholder="blur" 
                            blurDataURL={el?.url} 
                            objectFit="cover"
                            priority={false}/>
                        </div>
             })}
         </div>}
      {type==='video'&&<Vidoe video={media} />}
      {type==='audio'&&'Audio'}
    </div>
    :<></>
   
  )
}

export default media