"use client"
import { BottomBarItems } from "@/constants"
import Link from "next/link"
import classNames from "classnames"
import { usePathname } from "next/navigation"
function bottomBar() {
  let pathName=usePathname()  
  return (
    <div className=" grid grid-cols-3 p-1 border-solid border-t-2 border-t-zinc-200  lg:hidden">
         {BottomBarItems.map(el=>{
         return <Link
                  key={el.title}
                  href={el.href}
                  className={classNames({" relative p-2 flex justify-center rounded-md text-xl cursor-pointer":true},
                            {"bg-gray-200 opacity-100":el.href===pathName},
                            {" opacity-65":el.href!==pathName})}>
                    <el.icon/>
                </Link>
       })}
    </div>
  )
}

export default bottomBar