import Logo from "@/components/logo"

function layout({children}) {
  return (
    <section className='w-full min-h-screen bg-gradient-to-tr from-pink-500 to-blue-700 flex justify-center items-center '>
        <div className=' w-full max-w-sm bg-white shadow-3xl rounded-md px-2 py-4'>
           <header className="flex flex-col gap-2 items-center"> 
               <Logo w={40} h={40}/>
               <h1 className=" text-gray-500 font-light text-2xl">messenger</h1>
           </header>
            
           <div className='flex flex-col items-center gap-2  '>
              {children}
           </div>
        </div>
    </section>
  )
}

export default layout