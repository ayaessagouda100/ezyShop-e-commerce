'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
    const cookie = await cookies()
    const encryptedToken = cookie.get('next-auth.session-token')?.value
    const data =  await decode({token: encryptedToken , secret : process.env.NEXTAUTH_SECRET!})
    return data?.token 
}