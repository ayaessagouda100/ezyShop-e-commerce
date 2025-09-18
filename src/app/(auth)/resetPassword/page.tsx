'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [btn, setBtn] = useState<boolean>(true)
  const router = useRouter()
  const resetPasswordSchema = z.object({
    email: z.string().email('email invalid').nonempty('Email is required'),
    newPassword: z.string().nonempty('New Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),

  })
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema)
  })

  async function handleResetPassword(values: z.infer<typeof resetPasswordSchema>) {
    setBtn(false)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json'
      }
    })
    const data = await response.json()
    setBtn(true)
    console.log(data);

    if (data.token) {
      router.push("/login")
    } else {
      toast.error(data.message)
    }

  }
  return (
    <>
      <div className='w-[50%] mx-auto h-screen my-8 mb-10 rounded-4xl'>
        <h1 className='w-[70%] mx-auto text-center font-bold text-4xl p-5 text-slate-600'> Set a new password </h1>
        <Form {...resetPasswordForm}>
          <form className='p-10 shadow-2xl  space-y-4 ' onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}>
            <FormField
              control={resetPasswordForm.control}
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
              control={resetPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem >
                  <FormLabel > Enter your new Password: </FormLabel>
                  <FormControl>
                    <Input  {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              btn ? <Button className='bg-yellow-400 hover:bg-yellow-500 text-center rounded-4xl text-gray-700 cursor-pointer  w-full mx-auto py-5'> Update Password</Button> :
                <Button className='bg-yellow-400 hover:bg-yellow-500 text-center rounded-4xl text-gray-700 cursor-pointer  w-full mx-auto py-5'><i className="fa-solid fa-spinner fa-spin"></i> Update Password</Button>
            }
          </form>
        </Form>
      </div>

    </>
  )
}
