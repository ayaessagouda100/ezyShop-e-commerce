'use client'
import { CountContext } from '@/app/CountProvider'
import { creditPayment, cashPayment } from '@/app/OrderActions/OrderActions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"



const paymentSchema = z.object({
  details: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string()
    .regex(/^01[0-2,5]\d{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().min(2, "City name must be at least 2 characters"),
})

export default function CheckoutSession() {
  const {getCart} = useContext(CountContext)
  const router = useRouter()
  const { cartId }: { cartId: string } = useParams()
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    defaultValues: {
      details: "",
      phone: "",
      city: ""
    },
    resolver: zodResolver(paymentSchema)
  })

  async function handleCreditPayment(values: { details: string, phone: string, city: string }) {
    const data = await creditPayment(cartId, values)
    await getCart()
    if (!data?.session?.url) {
  console.error("Session not found:", data);
  return;
}
    window.location.href = data.session.url
  }

  async function handleCashPayment(values: { details: string, phone: string, city: string }) {
    const data = await cashPayment(cartId, values)
    toast.success('Order Placed')
    await getCart()
    router.push('/allorders')

  }

  return (
    <div className='h-screen'>
      <div className='w-[50%] mx-auto my-8 mb-10 '>
        <h1 className='mx-auto text-center font-bold text-4xl p-7 text-slate-600'>Checkout Payment </h1>
        <Form {...paymentForm}>
          <form className='p-10 shadow-2xl rounded-4xl space-y-4'>
            <FormField
              control={paymentForm.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address details :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paymentForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={paymentForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between gap-4 mt-7'>
              <Button 
                type="button"
                className='w-1/2 bg-yellow-400 cursor-pointer' 
                onClick={paymentForm.handleSubmit(handleCreditPayment)}
              > 
                Debit/Credit Card
              </Button>
              <Button 
                type="button"
                className='w-1/2 bg-yellow-400 cursor-pointer'
                onClick={paymentForm.handleSubmit(handleCashPayment)}
              > 
                Cash on Delivery (COD)
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}