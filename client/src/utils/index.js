
export let scrollToBottomChat=()=>{
    let chat=document.getElementById("content-chat")
    let scrollPosY=chat?.scrollHeight
    chat.scroll({top:scrollPosY,behavior:"auto"})
}