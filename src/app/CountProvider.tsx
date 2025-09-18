'use client'
import { createContext, useEffect, useState } from "react";
import { getUserToken } from '@/getUserToken';
import { getCartData } from "./CartActions/CartActions";
import { CartData } from "@/types/cart.types";

type CountContextType = {
    items: number | null;
    setItems: React.Dispatch<React.SetStateAction<number | null>>;
    getCart: () => Promise<void>;
}
export const CountContext = createContext<CountContextType>({ items: 0, setItems: () => {}, getCart: async () => {} })
export default function CountContextProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<number | null>(null)
    async function getCart() {
        const token = await getUserToken()
        if (token) {
            const data: CartData = await getCartData()
            const sum: number = data.data.products.reduce((total, item) => {
                return total + item.count
            }, 0)
            setItems(sum)
        }
    }
    useEffect(() => {
        getCart()
    }, [])
    return <CountContext.Provider value={{ items, setItems, getCart }}>
        {children}
    </CountContext.Provider>
}