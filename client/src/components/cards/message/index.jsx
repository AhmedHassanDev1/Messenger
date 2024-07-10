"use client"
import classNames from "classnames";
import { useSession } from "next-auth/react";
import TextContent from "./text_content";
import Media from "./media";
import MessageBtns from "@/components/buttons/messageBtns";
function index({info}) {
  
  let {data}=useSession()
  let sender_message=info?.sender_id===data?.user?._id
  let deleted=info.Status==='deleted'
  let classesNames=classNames({'message group/message':true},
                              {'message-sent':sender_message},
                              {'received-message':!sender_message}, ) 
  return (
    <div className={classesNames}>
        {info?.Status=='send'&& 
        <div className="group-hover/message:opacity-100 opacity-0 group-hover/message:pointer-events-auto pointer-events-none   items-center flex">
          <MessageBtns sender_id={info?.sender_id} message_id={info?._id}/>
        </div>
      }
       <div className="max-w-fit flex items-end flex-col ">
         {!deleted?
            <>
             {info.media&&<Media type={info?.type} media={info?.media}/>}
             <TextContent  content={info?.text_content} />
             <p className="text-sm text-zinc-500">{info?.Status==='not-send'&&'sending'}</p>
             
            </>:
            <p className=" border-2 border-zinc-200 border-solid rounded-full p-2 text-ms font-semibold">You unsent a message</p>
         }
      
       </div>
   </div> 
  )
}

export default index