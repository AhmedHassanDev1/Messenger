
let headers={
    'Accept': '/*',
    'Content-Type': 'application/json',
    
}

export let SignUp=async({full_name:name,password,email})=>{

  let res=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/signup`,
  {
    method:"POST",
    headers,
    credentials: 'include',
    body:JSON.stringify({name,password,email})
  })
  let data=await res.json() 
 if (res.ok) {
 
  return  data 
 }else{
   throw new Error(data.message)
 }
}

export let LogIn=async(email,password)=>{
    let res=await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
    {
      method:"POST",
      headers,
      credentials: 'include',
      body:JSON.stringify({password,email})
    })
    let data=await res.json() 
  if (res.ok) return  data 
  else  throw new Error(data.message)
  
}