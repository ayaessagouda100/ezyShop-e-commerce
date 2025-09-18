'use server'
import { getUserToken } from "@/getUserToken"
import { CartData } from './../../types/cart.types';

export async function getCartData(){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        headers: {
            token : token as string
        }
    })
    const data : CartData = await response.json()
    
    
    return data
}
export async function addProductToCart(id:string){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/`,{
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
export async function deleteItem(id : string ){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:'DELETE',
        headers:{
            token : token as string
        }
    })
    const data = await response.json()
    return data
}
export async function clearCart(){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
        method:'DELETE',
        headers:{
            token : token as string
        }
    })
    const data = await response.json()
    return data
}
export async function updateCartQty(id:string , count : number){
    const token = await getUserToken()
    if(!token){
        throw new Error('Token Invalid')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
        method:'PUT',
        body: JSON.stringify({
        count : count
    }),
    headers:{
        token : token as string ,
        'content-type' : 'application/json'
    }}
    )
    const data = await response.json()
    return data
}
