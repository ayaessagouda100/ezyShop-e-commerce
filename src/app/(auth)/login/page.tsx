'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { CountContext } from '@/app/CountProvider'


export default function Login() {
  const {getCart}= useContext(CountContext)
  const [isLoading , setIsLoading] = useState(false)
  const router = useRouter()
  const loginSchema = z.object({
    email: z.string().email('email invalid').nonempty('Email is required'),
    password: z.string().nonempty('Password is required').regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),

  })
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function handleLogin(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    const data = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (data?.ok) {
      toast.success('Login Success')
      await getCart()
      setIsLoading(false)
      router.push("/")
    } else {
      toast.error(data?.error || "Login failed")
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className='w-[50%] mx-auto h-screen my-8 mb-10 '>
        <h1 className='w-[50%] mx-auto text-center font-bold text-4xl p-5 text-slate-600'> Login Now </h1>
        <Form {...loginForm}>
          <form className='p-10 shadow-2xl  rounded-4xl space-y-4 ' onSubmit={loginForm.handleSubmit(handleLogin)}>
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
            {isLoading ? <Button disabled className='bg-yellow-400 hover:bg-yellow-500 text-center rounded-4xl text-gray-700 cursor-pointer  w-full mx-auto py-5'><i className="fa-solid fa-spinner fa-spin"></i> Login Now</Button> : <Button className='bg-yellow-400 hover:bg-yellow-500 text-center rounded-4xl text-gray-700 cursor-pointer  w-full mx-auto py-5'> Login Now</Button>}
            <div className='flex justify-between'>
              <div className='flex gap-2'><p> Do not have an account </p><Link href={'/register'} className='text-blue-600 underline'>  Register </Link></div>
              <Link href={'/forgetPassword'} className='text-blue-600 underline'>  Forget Password? </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
