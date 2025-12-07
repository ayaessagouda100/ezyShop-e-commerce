'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ForgetPassword() {
  const router = useRouter()
  const forgetPasswordSchema = z.object({
    email: z.string().email('Email invalid').nonempty('Email is required'),
  })

  const forgetPasswordForm = useForm<z.infer<typeof forgetPasswordSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema)
  })

  async function handleForgetPassword(values: z.infer<typeof forgetPasswordSchema>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.statusMsg == 'success') {
      router.push("/resetCode")
    } else {
      toast.error(data.message)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen my-8 px-4">
      <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl p-5 text-slate-600">
        Forget Password
      </h1>
      <Form {...forgetPasswordForm}>
        <form
          className="p-6 sm:p-8 md:p-10 shadow-2xl rounded-xl space-y-6 bg-white"
          onSubmit={forgetPasswordForm.handleSubmit(handleForgetPassword)}
        >
          <FormField
            control={forgetPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your Email:</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-center rounded-xl text-gray-700 cursor-pointer w-full py-3">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  )
}