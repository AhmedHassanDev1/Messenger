"use client"
import SearchBar from "@/components/inputs/searchBar"
import ConversationContainer from "@/components/sections/Conversations/ConversationsContainer"
import BottomBar from "@/components/sections/Conversations/bottomBar"
import SearchReultes from "@/components/sections/searchReultes"
function page() {

  
  return (
    <section className="Conversations">
        <SearchBar/>
        <ConversationContainer/>
        <SearchReultes/>
        <BottomBar/>
    </section>
  )
}

export default page