import React from 'react'
import type { CartItem } from 'types'

export default function Cart({ cartItems }: { cartItems: CartItem[] }) {
    return (
        <div className='box-content max-w-sm border-4 bg-slate-200 rounded-xl shadow-2xl flex-col'>
            <div className='box-content  text-black bg-white/10 rounded-full p-5 h-1/5'>
                <div className='content-center text-center'>
                    <h1>Cart Items</h1>
                </div>
                {cartItems.length > 0 ? cartItems.map((item, index) => (
                    <div className="flex space-x-5 text-black" key={index}>
                        <div>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <p>{item.quantity}</p>
                        </div>

                    </div>
                )) : <h1 className='text-white p-2 rounded-full'>Empty Cart</h1>}
            </div>
        </div>
    )
}
