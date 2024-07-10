"use client"
import TopBar from "./topBar"
import BottomBar from "./bottomBar"
import Content from "./content"
import { Current_conversation } from "@/app/chat/layout"
import { useReactiveVar } from "@apollo/client"
import NotChatSelect from "@/components/notfound/notChatSelect" 
function index() {
  let coversation=useReactiveVar(Current_conversation)
  return (
    <section className="chat">
         {coversation?
          <>
           <TopBar/>
           <Content/>
           <BottomBar/>
          </>:
          <NotChatSelect/>}
    </section>
  )
}

export default index