import { Button } from '@/components/ui/button'
import React from 'react'

export default function PageFooter() {
    return (
        <div>
            <footer >
                <div className=" bg-gray-100 px-4 pb-10 pt-5"  >
                    <div className='px-20 py-5'>
                        <h3 className='font-semibold text-gray-700'>Get the <i className="fa-solid fa-cart-shopping text-yellow-400"></i> EzyShop App</h3>
                        <p className='text-gray-500 py-2'>We will send you a link, open it in your phone to download the app. </p>
                    </div>

                    <div className="flex justify-center mb-10 gap-4 ">
                        <input
                            type="email"
                            placeholder="Email .."
                            className="w-1/2 px-4  border rounded-md focus:outline-none"
                        />
                        <Button className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded-r-md">
                            Share App Link
                        </Button>
                    </div>

                    <hr className="my-6 text-gray-300 " />

                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 md:mx-20">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <span className="font-semibold text-lg">Payment Partners</span>
                            <i className="fa-brands fa-amazon-pay fa-xl"></i>
                            <img alt="mastercard" loading="lazy" width="41" height="26"  src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-mastercard.svg"></img>
                            <img alt="visa" loading="lazy" width="41" height="26"  src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-visa.svg"></img>
                            <img alt="tabby" loading="lazy" width="41" height="26" src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/tabby_v2.svg"></img>
                            <img alt="tamara" loading="lazy" width="41" height="26" src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/tamara-en.svg"></img>
                            <i className="fa-brands fa-apple-pay fa-2xl"></i>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="font-semibold">Get deliveries with <span className='text-yellow-400'>EzyShop</span></span>
                            <Button className='flex bg-gray-900 cursor-pointer'><i className="fa-brands fa-apple text-white"></i>
                                <span className='text-white'>App Store</span></Button>
                            <Button className='flex bg-gray-900 cursor-pointer'><i className="fa-brands fa-google-play text-white"></i>
                                <span className='text-white'>Google Play</span></Button>

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
