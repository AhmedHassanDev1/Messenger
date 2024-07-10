"use client"
import { asideBarItems } from "@/constants"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import Link from "next/link"
function asideBar() {
  let pathName=usePathname()  
  return (
    <aside className="aside-bar">
       {asideBarItems.map(el=>{
         return <Link
                  key={el.title}
                  href={el.href}
                  className={classNames({" relative p-2 rounded-md text-xl cursor-pointer":true},
                            {"bg-gray-200 opacity-100":el.href===pathName},
                            {" opacity-65":el.href!==pathName})}>
                    <el.icon/>
                </Link>
       })}
    </aside>
  )
}

export default asideBar