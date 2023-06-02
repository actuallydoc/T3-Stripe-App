import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { shoppingCartSlice } from 'stores/shoppingCartStore'
import Stripe from 'stripe'
import type CustomProduct from 'types'

export default function ProductAddButton({ product }: { product: Stripe.Product }) {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }
    const resetQuantity = () => {
        setQuantity(1)
    }
    const handleAddToCart = (item: CustomProduct) => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            //Check if the item is already in the cart
            const cart = JSON.parse(data) as CustomProduct[]
            const itemInCart = cart.find((cartItem) => cartItem.default_price === item.default_price)
            if (itemInCart) {
                //Increase the quantity of the item in the cart
                itemInCart.quantity += quantity
                console.log(itemInCart)
                localStorage.setItem('storeCart', JSON.stringify(cart))
                dispatch(shoppingCartSlice.actions.addToCart(itemInCart))
                return toast.success("Increase the quantity of the item in the cart");
            } else {
                //Add the item to the cart
                item.quantity = quantity
                cart.push(item)
                localStorage.setItem('storeCart', JSON.stringify(cart))
                dispatch(shoppingCartSlice.actions.addToCart(item))
                return toast.success("Item added to cart");
            }

        } else {
        }
    }

    return (
        <div className='flex space-x-5'>
            <div>
                <button onClick={() => {
                    handleAddToCart(product)
                    resetQuantity()
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Dodaj v košarico
                </button>
            </div>
            <div className="box-content pb-3">
                <input min={1} onChange={handleQuantityChange} className="w-16 text-center content-center h-10 border-2 border-gray-200 rounded-md" type="number" value={quantity} />
            </div>

        </div>
    )
}
