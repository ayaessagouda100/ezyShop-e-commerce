"use server";

import { getUserToken } from "@/getUserToken";
import { Order } from "@/types/Orders.type";

export async function creditPayment(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }
}
export async function cashPayment(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }
}

export async function getUserOrders() {
  const token = await getUserToken();
  if (token) {
    const decodedToken = JSON.parse(atob((token as string).split(".")[1]));
    const userId = decodedToken.id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`,
      {
        headers: {
          token: token as string,
        },
      }
    );
    const data = await response.json();
    return data as Order[];
  }
}
