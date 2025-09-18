'use client'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button';
import { addProductToCart } from '@/app/CartActions/CartActions';
import toast from 'react-hot-toast';
import { CountContext } from '@/app/CountProvider';


export default function ButtonBtn({ id }: { id: string }) {
  const {getCart} = useContext(CountContext)
  async function addToCart(id: string) {
  try{
    const data = await addProductToCart(id)
  if(data.status == 'success'){
    await getCart()
    toast.success(data.message)
  }else{
    toast.error("Failed added to Cart")
  }
  }catch(err){
    toast.error("can't add to cart without login")
  }
  }
  return (
    <>
      <Button onClick={() => {addToCart(id) }} className='bg-yellow-500 hover:bg-yellow-400 rounded px-3 py-2 w-full text-white cursor-pointer'>+ Add to cart</Button>
    </>
  )
}
