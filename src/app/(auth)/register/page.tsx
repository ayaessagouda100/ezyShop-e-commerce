'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { register } from '@/types/register.types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'




export default function Register() {
  const router = useRouter()
  const registerSchema = z.object({
    name: z.string().nonempty('Name is required').min(3, 'Name must be 3 letters at least').max(10, 'Name must be less than 10 letters'),
    email: z.string().email('email invalid').nonempty('Email is required'),
    password: z.string().nonempty('Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    rePassword: z.string().nonempty('confirm your password'),
    phone: z.string().nonempty('phone is required').regex(/^(\+2)?01[0125][0-9]{8}$/, 'enter valid phone')

  }).refine((obj) => {
    return obj.password == obj.rePassword
  }, {
    path: ['rePassword'],
    error: 'confirm password not match'
  })
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(registerSchema)
  })

  async function handleRegister(values: z.infer<typeof registerSchema>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.message == 'success') {
      toast.success(data.message)
      router.push("/login")
    } else {
   toast.error(data.message)
    }

  }
  return (
    <>
      <div className='w-[50%] mx-auto min-h-screen my-8 mb-10 pb-10'>
        <h1 className='w-[50%] mx-auto text-center font-bold text-4xl p-5 text-slate-600'> Create Account </h1>
        <Form {...registerForm}>
          <form className='p-10 shadow-2xl  rounded-4xl space-y-4' onSubmit={registerForm.handleSubmit(handleRegister)}>
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem >
                  <FormLabel > Enter your Name: </FormLabel>
                  <FormControl>
                    <Input  {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem >
                  <FormLabel > Enter your Email: </FormLabel>
                  <FormControl>
                    <Input  {...field} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem >
                  <FormLabel > Enter your Password: </FormLabel>
                  <FormControl>
                    <Input  {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem >
                  <FormLabel > Confirm your Password: </FormLabel>
                  <FormControl>
                    <Input  {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem >
                  <FormLabel > Phone:  </FormLabel>
                  <FormControl>
                    <Input  {...field} type='tel' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='bg-yellow-400 hover:bg-yellow-500 text-center rounded-4xl text-gray-700 cursor-pointer w-full mx-auto py-5'> Create your EzyShop account </Button>
          <div className='flex gap-2'><p> Already have account </p><Link href={'/login'} className='text-blue-600 underline'>  Sign-in </Link></div>
          </form>
        </Form>
      </div>

    </>
  )
}
