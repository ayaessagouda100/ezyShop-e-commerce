'use client'
import { CountContext } from "@/app/CountProvider"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

export default function Navbar() {
  const { items } = useContext(CountContext)
  const { data, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  function logOut() {
    signOut({
      callbackUrl: '/'
    })
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className='shadow-lg bg-slate-800 text-amber-50'>
      <div className="container w-full mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className='text-2xl flex items-center'>
            <i className="fa-solid fa-cart-shopping text-yellow-400 m-1"></i>
            <Link href="/">EzyShop</Link>
          </div>
          <button
            className="lg:hidden text-yellow-400 hover:text-yellow-500 text-xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <div className="hidden lg:flex flex-row justify-between items-center w-full ml-8">
            <div className='left'>
              <ul className='flex gap-6 items-center'>
                <li><Link href="/" className='hover:bg-yellow-400 rounded px-3 py-2'>Home</Link></li>
                <li><Link href="/products" className='hover:bg-yellow-400 rounded px-3 py-2'>Products</Link></li>
                <li><Link href="/brands" className='hover:bg-yellow-400 rounded px-3 py-2'>Brands</Link></li>
                <li><Link href="/cart" className='text-yellow-400 rounded px-3 py-2 relative'> 
                  <i className="fa-solid fa-cart-shopping"></i> 
                  <span className='absolute -top-1 -right-1 text-sm font-sans text-yellow-400  rounded-full w-5 h-5 flex items-center justify-center'>{items}</span>
                </Link></li>
                <li><Link href="/wishlist" className='text-red-400 rounded px-3 py-2'> 
                  <i className="fa-solid fa-heart"></i>
                </Link></li>
              </ul>
            </div>
            <div>
              {status == 'authenticated' ? (
                <div className="flex items-center justify-between gap-3">
                  <p> Hello, {data?.user.name || 'guest,'}</p>
                  <li className="list-none"><Link href="/allorders" className=' px-1 py-2'>Orders</Link></li>
                  <Button onClick={logOut} className='text-yellow-400 p-2 hover:text-yellow-500 cursor-pointer'>
                    Signout<i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/register" className='text-yellow-400 p-2 hover:text-yellow-500 cursor-pointer mr-2'>Register</Link>
                  <Link href="/login" className='text-yellow-400 p-2 hover:text-yellow-500 cursor-pointer'>Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="pt-4 pb-2">
            <ul className='flex flex-col gap-2 items-center mb-4'>
              <li><Link href="/" className='hover:bg-yellow-400 rounded px-3 py-2 block' onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/products" className='hover:bg-yellow-400 rounded px-3 py-2 block' onClick={() => setIsMenuOpen(false)}>Products</Link></li>
              <li><Link href="/brands" className='hover:bg-yellow-400 rounded px-3 py-2 block' onClick={() => setIsMenuOpen(false)}>Brands</Link></li>
              <li><Link href="/cart" className='text-yellow-400 rounded px-3 py-2 relative inline-block' onClick={() => setIsMenuOpen(false)}> 
                <i className="fa-solid fa-cart-shopping"></i> 
                <span className='absolute -top-1 -right-1 text-sm font-sans bg-yellow-400 text-slate-800 rounded-full w-5 h-5 flex items-center justify-center'>{items}</span>
              </Link></li>
              <li><Link href="/wishlist" className='text-red-400 rounded px-3 py-2 block' onClick={() => setIsMenuOpen(false)}> 
                <i className="fa-solid fa-heart"></i>
              </Link></li>
            </ul>
            <div className="flex flex-col items-center gap-2">
              {status == 'authenticated' ? (
                <>
                  <p className="text-center"> Hello, {data?.user.name || 'guest,'}</p>
                  <Link href="/allorders" className='px-3 py-2 block' onClick={() => setIsMenuOpen(false)}>Orders</Link>
                  <Button onClick={() => { logOut(); setIsMenuOpen(false); }} className='text-yellow-400 p-2 hover:text-yellow-500 cursor-pointer'>
                    Signout<i className="fa-solid fa-arrow-right-from-bracket ml-1"></i>
                  </Button>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link href="/register" className='text-yellow-400 p-2 hover:text-yellow-500 cursor-pointer' onClick={() => setIsMenuOpen(false)}>Register</Link>
                  <Link href="/login" className='text-yellow-400 p-2 hover:text-yellow-500 cursor-pointer' onClick={() => setIsMenuOpen(false)}>Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}