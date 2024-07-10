"use client"
import { FaImage } from "react-icons/fa6";
function addImageBtn({media,setMedia}) {
  let handleChange=(e)=>{
     setMedia([...media,e.target.files[0]])
  }
  return (
    <div onChange={handleChange} className="icon-2 ">
       <label htmlFor="files" className=" cursor-pointer"> <FaImage /></label>
       <input id="files" type="file" accept="image/* vidoe/* " className="hidden pointer-events-none" />
    </div>
  )
}

export default addImageBtn