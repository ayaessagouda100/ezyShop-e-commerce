'use client'
import ButtonBtn from '@/app/_components/Button/Button'
import { deleteWishlistItem, getWishlistData } from '@/app/wishlistActions/wishlistActions'
import { Button } from '@/components/ui/button'
import { Wishlist, wishlistData } from '@/types/wishlist.types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function WishlistPage() {
  const [loading , setLoading]= useState(false)
  const [wishlist, setWishlist] = useState<wishlistData[]>([])
  useEffect(() => { wishlistData() }, [])
  async function wishlistData() {
    try {
      setLoading(true)
    const data: Wishlist = await getWishlistData()
    setWishlist(data?.data)
    setLoading(false)
    } catch (error) {
      toast.error('error removing item from wishlist')
    }
  }
  async function deleteWishlist(id: string) {
    const data = await deleteWishlistItem(id)
    if (data.status == 'success') {
      toast.success("product removed from Wishlist")
      await wishlistData()
    }
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <span className="loader"></span></div>
    )
  }
  return (
    <>
      
      <div className='min-h-screen w-[95%] mx-auto py-10 pb-20'>
        {wishlist && wishlist.length > 0 ? <> <h2 className='font-semibold text-4xl  text-slate-700 p-10'>Wishlist<i className="fa-solid fa-heart text-red-400"></i></h2> <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {wishlist?.map((item) => {
                return (
                  <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <Image src={item?.imageCover} width={100} height={100} className="w-16 md:w-32 max-w-full max-h-full" alt={item?.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item?.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      £{item?.price}
                    </td>
                    <td className="px-6 py-4">
                      <Button onClick={() => { deleteWishlist(item.id) }} className="font-medium text-red-600 cursor-pointer dark:text-red-500 hover:underline">Remove <i className="fa-solid fa-trash-can"></i> </Button>
                    </td>
                    <td className="px-6 py-4">
                      <ButtonBtn id={item?.id} />
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>
        </div></> : <> 
        <div className='flex gap-4 flex-col mt-10 justify-center items-center '>
        <i className="fa-regular fa-heart text-red-400 text-9xl mb-5"></i>
        <h3 className='text-4xl font-bold text-slate-700'>Wishlist is Empty.</h3>
        <p className='text-2xl mb-7 text-slate-500'>You do not have any Products in your wishlist yet.</p> 
        <Link className='bg-red-500 py-4 px-7 text-white hover:bg-red-400 cursor-pointer rounded-4xl' href='/'> Continue Shopping <i className="fa-solid fa-cart-shopping rounded "></i></Link></div> </>}
      </div>
    </>
  )
}
