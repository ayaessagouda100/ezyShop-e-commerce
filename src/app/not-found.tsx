import React from 'react'
import img from '../../public/images/2682856.jpg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'



export default function NotFound() {
  return (

    <div className='w-2xl mx-auto h-screen'>
      <Image src='/images/404.jpg' alt='404 not found' width={1000} height={1000} className='w-full' />
      <p className='text-center font-bold text-2xl py-5 text-gray-500'>
        <span className=' text-yellow-500 text-4xl'>Opps, </span>

        Page Not Found...   </p>
      <Button className='text-center mx-auto bg-yellow-400 text-white'> Back to Home</Button>

    </div>

  )
}
