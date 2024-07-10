"use client"
import { useRef,useTransition,useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { searchResultes } from "@/app/chat/layout";
import { searchQuery } from "@/graphql/queries";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";

function searchBar({}) {
  

  let inputRef=useRef()
  let [focus,setFocus]=useState(false)
  let [ispending,startTransition]=useTransition()
 

 
  let [search,{data,loading}]=useLazyQuery(searchQuery,{
    onCompleted:(data)=>{
        searchResultes({searching:true,loading:false,resultes:data?.search||[]})
    }
  })

  let cancelSearch=()=>{
      inputRef.current.value=""
      searchResultes({searching:false})
  }

  let handleFocus=()=>{
    setFocus(true)
    searchResultes({searching:true})
  }

  let handleBlur=()=>{
    setFocus(false)
    searchResultes({searching:false})
  }
  
  let handleSearch=(e)=>{

    let value=e.target.value?.trim()
    let variables={
        value
    } 
   searchResultes({value,loading:true,...searchResultes()})
   startTransition(()=>{
     search({variables})
     
   })  
  }
  
  return (
   <div className=" relative max-w-full w-full flex flex-col gap-3 my-2 ">
      <div className="">
          <h1 className=" font-bold text-xl ">Chats</h1>
      </div>
      <div className=" relative max-w-full flex gap-2 items-center">
        {  focus?<FaArrowLeftLong className="icon" onClick={handleBlur}/>:null}
         <div className="flex-1 flex items-center gap-1  bg-zinc-100 rounded-full p-1">
            <IoMdSearch className=" text-2xl text-gray-400" />
            <input 
             onChange={handleSearch}
             onFocus={handleFocus}
            
             type="text" className=" w-full min-w-20 bg-inherit" />
         </div>
      </div>
   </div>
  )
}

export default searchBar