'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"




export default function ResetCode() {
    const router = useRouter()
    const resetCodeSchema = z.object({
        resetCode: z.string().nonempty('Code is required'),

    })
    const resetCodeForm = useForm<z.infer<typeof resetCodeSchema>>({
        defaultValues: {
            resetCode: "",

        },
        resolver: zodResolver(resetCodeSchema)
    })

    async function handleResetCode(values: z.infer<typeof resetCodeSchema>) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);

        if (data.status == 'Success') {
            router.push("/resetPassword")
        } else {
            toast.error(data.message)
        }

    }
    return (
        <>
            <div className='w-[50%] h-screen mx-auto my-8 mb-10 rounded-4xl'>
                <h1 className='w-[70%] mx-auto text-center font-bold text-4xl p-5 text-slate-600'>Verify Code  </h1>
                <Form {...resetCodeForm}>
                    <form className='p-10 shadow-2xl  space-y-6 ' onSubmit={resetCodeForm.handleSubmit(handleResetCode)}>
                        <FormField
                            control={resetCodeForm.control}
                            name="resetCode"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel >Check your Email  </FormLabel>
                                    <FormControl>
                                        <InputOTP {...field} className='w-full text-center' maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='bg-yellow-400 hover:bg-yellow-500 text-center rounded-4xl text-gray-700 cursor-pointer  w-1/4 mx-auto py-5'> Verify Code</Button>
                    </form>
                </Form>
            </div>

        </>
    )
}
