'use server'

import { getUserToken } from "@/getUserToken"

export async function getWishlistData(){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
        headers: {
            token : token as string
        }
    })
    const data = await response.json()
    console.log(data);
    
    return data
}
export async function addProductToWishlist(id:string){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
        method:'POST',
        body: JSON.stringify({
        productId : id
    }),
    headers:{
        token : token as string ,
        'content-type' : 'application/json'
    }
    }
    )
    const data = await response.json()
    return data
}
export async function deleteWishlistItem(id : string ){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,{
        method:'DELETE',
        headers:{
            token : token as string
        }
    })
    const data = await response.json()
    return data
}