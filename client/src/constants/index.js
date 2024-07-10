import { BiSolidMessageRounded } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import { MdWebStories } from "react-icons/md";
export let asideBarItems=[
    {
       title:"chats",
       href:"/chat",
       icon:BiSolidMessageRounded
    },
    {
        title:"people",
        href:"/chat/people",
        icon:IoPeopleSharp
     },
     {
        title:"mar",
        href:"/chat/archive",
        icon:FaBoxArchive
     },
     {
      title:"stories",
      href:"/chat/stories",
      icon:MdWebStories
   },
    
]

export let BottomBarItems=[
   {
      title:"chats",
      href:"/chat",
      icon:BiSolidMessageRounded
   },
   {
       title:"people",
       href:"/chat/people",
       icon:IoPeopleSharp
    },
    {
       title:"stories",
       href:"/chat/stories",
       icon:MdWebStories
    },
   
]