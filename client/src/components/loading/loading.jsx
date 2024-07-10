"use client"

function loading({w,h}) {
  return (
    <div style={{width:`${w}px`,height:`${h}px`}} 
         className="relative bg-white border-solid border-4  border-y-blue-600 border-x-blue-300  animate-spin rounded-full ">
       
    </div>
  )
}

export default loading