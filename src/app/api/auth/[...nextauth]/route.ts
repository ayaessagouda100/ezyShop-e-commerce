import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const nextOptions: NextAuthOptions = {
    pages:{
        signIn: '/login'
    },
    providers:[
        Credentials({
            name:'credentials',
            credentials:{
                email:{},
                password:{},
            },
            authorize: async (credentials)=>{
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{
                    method:'POST',
                    body:JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers:{
                        'content-type' : 'application/json'
                    }
                });
                const data = await response.json();
                
            if(data.message == 'success'){
                const decodedToken:{id: string} = jwtDecode(data.token)
                return {
                    id: decodedToken.id,
                    user: data.user,
                    token: data.token,
                }
            }else{
                throw new Error(data.message)
            }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user}) {
            
            if(user){
                token.token = user.token
            token.user = user.user
            }
        return token
    },
    async session({ session,  token }) {
        session.user = token.user
    return session
    }
    },
    
}


const handler = NextAuth(nextOptions)

export { handler as GET, handler as POST }