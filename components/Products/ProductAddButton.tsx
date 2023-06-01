import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { shoppingCartSlice } from 'stores/shoppingCartStore'
import type CustomProduct from 'types'

export default function ProductAddButton({ product }: { product: CustomProduct }) {
    const dispatch = useDispatch()
    const handleAddToCart = (item: CustomProduct) => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            //Check if the item is already in the cart
            const cart = JSON.parse(data) as CustomProduct[]
            const itemInCart = cart.find((cartItem) => cartItem.default_price === item.default_price)
            if (itemInCart) {
                //Increase the quantity of the item in the cart
                itemInCart.quantity += 1
                localStorage.setItem('storeCart', JSON.stringify(cart))
                dispatch(shoppingCartSlice.actions.addToCart(itemInCart))
                return toast.success("Increase the quantity of the item in the cart");
            } else {
                //Add the item to the cart
                item.quantity = 1
                cart.push(item)
                localStorage.setItem('storeCart', JSON.stringify(cart))
                dispatch(shoppingCartSlice.actions.addToCart(item))
                return toast.success("Item added to cart");
            }

        } else {
        }
    }

    return (
        <div>
            <button onClick={() => handleAddToCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Dodaj v košarico
            </button>
        </div>
    )
}
