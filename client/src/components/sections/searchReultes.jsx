"use client"
import { searchResultes } from "@/app/chat/layout"
import { useReactiveVar } from "@apollo/client"
import classNames from "classnames"
import Loading from "../loading/loading"
import UserCard from "../cards/searchResultes/userCard"
function searchReultes() {
  let {searching,resultes,loading}=useReactiveVar(searchResultes)
  let users=resultes?.filter(el=>el.type=='user')
  let conversations=resultes?.filter(el=>el.type=='conversation')
  let groups=resultes?.filter(el=>el.type=='group')

  return (
    <div
     className={classNames(
                   {"absolute bottom-0 top-24 flex-col gap-2   inset-x-0 bg-white ":true},
                   {"hidden":!searching},
                   {"flex":searching})}>
       {loading?
        <div className="w-full flex  justify-center ">
           <Loading w={28} h={28}/>
        </div>:
          <>
           {users?.length?
              <div className="space-y-2">
                <h1 className=" text-lg font-semibold ">More People</h1>
                 {users.map(el=> <UserCard info={el}/>)}
              </div> :
                null}  

            
            {conversations?.length? <div className="">
             <h1 className=" text-lg font-semibold ">conversations</h1>
           
              {conversations.map(el=> <UserCard info={el}/>)}
            </div> :null}   
            
            
            {groups?.length? <div className=""></div> :null}   

        
          </>}
    </div>
  )
}

export default searchReultes