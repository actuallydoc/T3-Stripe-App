import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { shoppingCartSlice } from 'stores/shoppingCartStore'
import type { CartItem } from 'types'

export default function ProductAddButton({ product }: { product: CartItem }) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }
    const resetQuantity = () => {
        setQuantity(1)
    }
    //!TODO CART IS BROKEN FIX IT ITEM COUNT QUANTITY IS BROKEN WHEN U ADD THE SECOND TIME WITH THE BUTTTON
    const handleAddToCart = (product: CartItem) => {
        const cart = localStorage.getItem('storeCart');
        if (cart) {
            const parsedCart = JSON.parse(cart) as CartItem[]
            const foundItem = parsedCart.find((item: CartItem) => item.name === product.name)
            if (foundItem) {
                foundItem.quantity += quantity
                localStorage.setItem('storeCart', JSON.stringify(parsedCart))
                dispatch(shoppingCartSlice.actions.addToCart({
                    item: foundItem,
                    quantity: quantity
                }))
                toast.success('Izdelek dodan v košarico')
                return
            } else {
                parsedCart.push(product)
                localStorage.setItem('storeCart', JSON.stringify(parsedCart))
                dispatch(shoppingCartSlice.actions.addToCart({
                    item: product,
                    quantity: quantity
                }))
                toast.success('Izdelek dodan v košarico')
                return
            }
        }

        // dispatch(shoppingCartSlice.actions.addToCart(product))

        if (cart) {
            const parsedCart = JSON.parse(cart) as CartItem[]
            parsedCart.push(product)
            localStorage.setItem('storeCart', JSON.stringify(parsedCart))
            toast.success('Izdelek dodan v košarico')
        } else {
            localStorage.setItem('storeCart', JSON.stringify([product]))
            toast.success('Izdelek dodan v košarico')
        }

    }
    return (
        <div className='flex space-x-5'>
            <div className=''>
                <button onClick={() => {
                    handleAddToCart(product)
                    resetQuantity()
                }} className="bg-[#10A293] hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
                    Dodaj v košarico
                </button>
            </div>
            <div className="">
                <input min={1} onChange={handleQuantityChange} className="w-16 text-center content-center h-10 border-2 border-gray-200 rounded-md" type="number" value={quantity} />
            </div>

        </div>
    )
}
