"use client"
import Image from "next/image"

function notChatSelect() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center row-start-2">
        <Image src={'/chat.png'}  width={250} height={250}  alt="not select chat"/>
        <h1 className=" text-2xl font-extrabold ">
            no select chat
        </h1>
    </div>
  )
}

export default notChatSelect