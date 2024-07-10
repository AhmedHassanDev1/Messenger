import ReplayMessageBtn from "./replayMessageBtn"
import DeleteMessageBtn from "./deleteMessageBtn"
import ForWordMessageBtn from "./forWordMessageBtn"
function messageBtns({message_id,sender_id}) {
  return (
    <div className='flex  flex-row-reverse '>
       <DeleteMessageBtn sender_id={sender_id} message_id={message_id}/>
       <ReplayMessageBtn message_id={message_id}/>
       <ForWordMessageBtn message_id={message_id}/>
    </div>
  )
}

export default messageBtns