import {hash,compare,genSalt} from "bcrypt"

export let hashing=async(password)=>{
  let salt=await genSalt()
  let Hash=await hash(password,salt)
  return Hash 
}

export let compareHashing=async (password,hash)=>{
    let valid=await compare(password,hash)
    return valid
}