'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { getUserOrders } from '@/app/OrderActions/OrderActions'
import Image from 'next/image'
import { Order } from '@/types/Orders.type';


export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders()
  }, [])
  async function getOrders() {
    try {
      setLoading(true)
      const data = await getUserOrders()
      if (data) {
        setOrders(data)
      } else {
        toast.error('error')
      }
    } catch (error) {
      toast.error('error loading data')
    } finally {
      setLoading(false)
    }
  }

  const getPaymentMethodText = (method: string) => {
    return method === 'card' ? 'Debit/Credit Card' : 'Cash'
  }
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto px-4 py-8 min-h-screen">
      {orders.length === 0 ? (
        <div className="flex justify-center items-center flex-col py-12">
          <Image src='../images/orders.svg' alt='empty orders' className='w-1/3' width={100} height={100} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
          <p className="text-gray-500">We could not find any items that matched your search in the given time period</p>
        </div>
      ) : (
        <div className="space-y-6 pb-10">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-600 ">Orders</h1>
          {orders.map((order) => (
            <Card key={order._id} className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start text-yellow-600 ">
                  <div>
                    <CardTitle className="text-xl ">
                      Order Number #{order.id}
                    </CardTitle>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-semibold ">
                      {order.totalOrderPrice} EGP
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 w-[90%] mx-auto border-t border-gray-400">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      Created at:  {new Date(order.createdAt).toLocaleDateString()}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">City: {order.shippingAddress.city}</p>
                      <p className="font-medium">Address: {order.shippingAddress.details}</p>
                      <p className="text-sm">Phone: {order.shippingAddress.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      Payment
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">{getPaymentMethodText(order.paymentMethodType)}</p>
                      <div className="space-y-1 text-sm">
                        {order.shippingPrice > 0 && (
                          <div className="flex justify-between">
                            <span> Shipping </span>
                            <span>{order.shippingPrice} EGP</span>
                          </div>
                        )}
                        <div className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{order.totalOrderPrice} EGP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <i className="h-5 w-5 text-yellow-500 fa-solid fa-box-open"></i>
                    Items ({order.cartItems.length})
                  </h3>
                  <div className="grid gap-4">
                    {order.cartItems.map((item) => (
                      <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <Image
                          width={100}
                          height={100}
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{item.product.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.product.category.name}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-sm bg-white px-2 py-1 rounded">
                                QTY {item.count}
                              </span>
                            </div>
                            <div className="text-lg font-semibold text-yellow-600">
                              {item.price} EGP
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}