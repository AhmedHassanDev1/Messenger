'use client'

function text({content}) {
  return (
   <>
      {content&& <div className="text-content-message">
           <p className=" max-w-[450px]">
            {content}
           </p>
        </div>}
   </>
  )
}

export default text