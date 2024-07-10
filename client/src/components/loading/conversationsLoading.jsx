""

function conversationsLoading() {
  return (
    <>
       {Array(5).fill(null).map(_=>{
         return <div className="conversationsLoading"></div>
       })}
    </>
  )
}

export default conversationsLoading