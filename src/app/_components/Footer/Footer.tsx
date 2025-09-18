import Link from 'next/link'
import React from 'react'
import PageFooter from '../PageFooter/PageFooter'

export default function Footer() {
  return (
      <>
      <PageFooter/>
      <footer className=" w-full bg-slate-800 text-yellow-400 text-center shadow-sm mx-auto p-5 ">
        <span>Made by <Link href="https://www.linkedin.com/in/aya-essa-02647633b/" className="text-red-400">AYA ESSA. </Link></span>
        
            <i className='fab fa-facebook m-2'></i>
            <i className='fab fa-twitter  m-2'></i>
            <i className='fab fa-instagram  m-2'></i>
            <i className='fab fa-tiktok  m-2'></i>
            <i className='fab fa-linkedin  m-2'></i>
      </footer>
    </>
  )
}
