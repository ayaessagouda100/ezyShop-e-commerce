import { Button } from '@/components/ui/button'
import React from 'react'

export default function PageFooter() {
    return (
        <footer>
            <div className="bg-gray-100 px-4 pb-10 pt-5">
                {/* Section: App Info */}
                <div className="px-4 md:px-20 py-5 text-center md:text-left">
                    <h3 className="font-semibold text-gray-700 text-lg md:text-xl">
                        Get the <i className="fa-solid fa-cart-shopping text-yellow-400"></i> EzyShop App
                    </h3>
                    <p className="text-gray-500 py-2 text-sm md:text-base">
                        We will send you a link, open it in your phone to download the app.
                    </p>
                </div>

                {/* Section: Email Input */}
                <div className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-4 px-4">
                    <input
                        type="email"
                        placeholder="Email .."
                        className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <Button className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded-md w-full sm:w-auto">
                        Share App Link
                    </Button>
                </div>

                <hr className="my-6 text-gray-300" />

                {/* Section: Partners & Apps */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 md:mx-20 gap-6">
                    {/* Payment Partners */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4">
                        <span className="font-semibold text-lg">Payment Partners</span>
                        <i className="fa-brands fa-amazon-pay fa-xl"></i>
                        <img alt="mastercard" loading="lazy" width="41" height="26"
                            src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-mastercard.svg" />
                        <img alt="visa" loading="lazy" width="41" height="26"
                            src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/card-visa.svg" />
                        <img alt="tabby" loading="lazy" width="41" height="26"
                            src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/tabby_v2.svg" />
                        <img alt="tamara" loading="lazy" width="41" height="26"
                            src="https://f.nooncdn.com/s/app/com/noon/design-system/payment-methods-v2/tamara-en.svg" />
                        <i className="fa-brands fa-apple-pay fa-2xl"></i>
                    </div>

                    {/* App Store & Google Play */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="font-semibold text-center sm:text-left">
                            Get deliveries with <span className="text-yellow-400">EzyShop</span>
                        </span>
                        <Button className="flex items-center gap-2 bg-gray-900 cursor-pointer px-4 py-2">
                            <i className="fa-brands fa-apple text-white"></i>
                            <span className="text-white">App Store</span>
                        </Button>
                        <Button className="flex items-center gap-2 bg-gray-900 cursor-pointer px-4 py-2">
                            <i className="fa-brands fa-google-play text-white"></i>
                            <span className="text-white">Google Play</span>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}