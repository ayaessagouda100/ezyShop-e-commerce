'use client'
import { clearCart, deleteItem, getCartData, updateCartQty } from '@/app/CartActions/CartActions'
import { CountContext } from '@/app/CountProvider'
import { Button } from '@/components/ui/button'
import { cart, CartData } from '@/types/cart.types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Cart() {
  const { getCart } = useContext(CountContext)
  const [currentId, setCurrentId] = useState<string>()
  const [countDisabled, setCountDisabled] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [countLoading, setCountLoading] = useState(false)
  const [cart, setCart] = useState<cart>()
  useEffect(() => { cartData() }, [])
  async function cartData() {
    setCartLoading(true)
    const data: CartData = await getCartData()
    setCart(data.data)
    setCartLoading(false)
  }
  async function deleteItemFun(id: string) {
    const data = await deleteItem(id)
    if (data.status == 'success') {
      toast.success("product deleted")
      await getCart()
      setCart(data.data)
      setCartLoading(false)
    }
  }
  async function clearCartFun() {
    const data = await clearCart()
    if (data.message == 'success') {
      toast.success("Cart Cleared")
      await getCart()
      await cartData()
      setCartLoading(false)
    }
  }
  async function updateQty(id: string, count: number) {
    setCurrentId(id)
    setCountDisabled(true)
    setCountLoading(true)
    const data = await updateCartQty(id, count)
    if (data.status == 'success') {
      await getCart()
      setCart(data.data)
      setCountLoading(false)
      setCountDisabled(false)
    }
  }
  return (
    <div className='min-h-screen py-5 pb-10 w-[95%] mx-auto'>
      {cart?.totalCartPrice != 0 && <h2 className='font-semibold text-4xl text-slate-700 p-10'>Shopping Cart</h2>}
      {cartLoading ? <div className="flex justify-center items-center h-screen"><span className="loader"></span></div> :
        <>
          {cart?.totalCartPrice != 0 ?
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-5">
                <div className='flex flex-col sm:flex-row justify-between gap-4 px-4'>
                  <Link href={'/checkoutSession/' + cart?._id} className='flex-1 sm:flex-none'>
                    <Button className='text-white w-full sm:w-auto px-6 py-4 bg-yellow-500 cursor-pointer font-bold'>
                      Proceed to Buy <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
                    </Button>
                  </Link>
                  <Button onClick={() => clearCartFun()} className='text-white w-full sm:w-1/4 bg-red-500 py-4 cursor-pointer font-bold'>
                    Remove all items <i className="fa-solid fa-trash-can"></i>
                  </Button>
                </div>
                <div className="overflow-x-auto mt-5">
                  <table className="min-w-[600px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      {cart?.products?.map((item) => {
                        return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="p-4">
                            <Image src={item.product.imageCover} width={100} height={100} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.product.title}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Button disabled={countDisabled} onClick={() => { updateQty(item.product._id, item.count - 1) }} className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700" type="button">
                                {item.count == 1 ? <i className='fa-solid fa-trash'></i> :
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                  </svg>}
                              </Button>
                              <div>
                                {countLoading && currentId == item.product._id ? <i className='fa-solid fa-spinner fa-spin'></i> : <span>{item.count}</span>}
                              </div>
                              <Button disabled={countDisabled} onClick={() => { updateQty(item.product._id, item.count + 1) }} className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700" type="button">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                              </Button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.price} EGP
                          </td>
                          <td className="px-6 py-4">
                            <Button disabled={countDisabled} onClick={() => { deleteItemFun(item.product._id) }} className="font-medium text-red-600 cursor-pointer dark:text-red-500 hover:underline">
                              Remove <i className="fa-solid fa-trash-can"></i>
                            </Button>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
                <div className='flex bg-gray-50 justify-between'>
                  <h3 className="text-lg ms-4 sm:ms-28 font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-400 p-3">Total Price</h3>
                  <h3 className="text-lg me-4 sm:me-28 font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-400 p-3">EGP {cart?.totalCartPrice}</h3>
                </div>
              </div>
            </> :
            <>
              <Image src='/images/empty-cart.png' alt="empty cart" width={200} height={200} className="w-1/2 sm:w-1/4 mx-auto object-cover" />
              <p className='text-4xl text-center text-slate-700 p-3'>Your Shopping Cart Is <span className='text-yellow-500 font-semibold'>Empty!</span></p>
              <div className='flex items-center justify-center py-5'>
                <Link className='bg-red-500 py-4 px-7 text-white hover:bg-red-400 cursor-pointer rounded-4xl' href='/'>
                  Continue Shopping <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </div>
            </>}
        </>}
    </div>
  )
}