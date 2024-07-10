import NextAuth from "next-auth"

import credentialsProvider from "next-auth/providers/credentials"

export const AuthOptions={
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    } ,
    
   
    providers:[
     
        credentialsProvider({
          name:"credentials",
        async authorize(credentials, req) {
            let {_id,name,email,image}=credentials
            let user={_id,name,email,image}
            
             if (user) {
               return user 
             }else{
              return null
             }
            
          }   
        })
    ] ,

    
    callbacks:{
   
     async jwt({user,token}){

          if (user) {
              token._id=user._id
              return token
            } 
            return token
     },
     async session({token,session}){
      if (token) {
          session.user._id=token._id
          return session 
      }  
      return session 

     }
   } 
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }