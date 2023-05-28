import React from 'react'
import Stripe from 'stripe'
import { CartItem } from 'types'

export default function Cart({ cartItems }: { cartItems: Stripe.Product[] }) {
    return (
        <div>
            <div className='box-content w-1/5 text-white bg-white/10 rounded-full p-5 h-1/5'>
                <div className='content-center text-center'>
                    <h1>Cart Items</h1>
                </div>

                {cartItems.length > 0 ? cartItems.map((item) => (
                    <div className="flex space-x-5 text-white" key={item.id}>
                        <div>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <p>{item.quantity as string | undefined}</p>
                        </div>

                    </div>
                )) : <h1 className='text-white p-2 rounded-full'>Empty Cart</h1>}
            </div>
        </div>
    )
}
