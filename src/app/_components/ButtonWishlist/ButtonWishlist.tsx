'use client'
import { addProductToWishlist } from '@/app/wishlistActions/wishlistActions'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function ButtonWishlist({ id }: { id: string }) {
  const [isActive , setIsActive]= useState(false)
    async function addToWishlist(id: string) {
  try{
    const data = await addProductToWishlist(id)
  if(data.status == 'success'){
    setIsActive(true)
    toast.success(data.message)
  }else{
    toast.error("Failed added to Cart")
  }
  }catch(err){
    toast.error("can't add to cart without login")
  }
  }
  return (
    <div>
      <Button onClick={()=>{addToWishlist(id)}} className='text-red-400 absolute top-5 right-5 text-lg cursor-pointer'>
      {isActive?<i className="fa-solid fa-heart"></i>:<i className="fa-regular fa-heart"></i>}
      </Button>
    </div>
  )
}
