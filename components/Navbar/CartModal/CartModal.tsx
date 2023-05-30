import Image from 'next/image';
import React, { useEffect } from 'react'
import type Stripe from 'stripe';

export default function CartModal({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [cart, setCart] = React.useState<Stripe.Product[]>([] as Stripe.Product[])
    useEffect(() => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            setCart(JSON.parse(data) as Stripe.Product[])
        }
    }, []);
    const FakeData = [
        {
            id: "1",
            name: "Krmilnik 1",
            price: 100,
            quantity: 1,
            total: 100
        },
        {
            id: "2",
            name: "Krmilnik 2",
            price: 200,
            quantity: 2,
            total: 400
        },
    ]
    const handleRemoveItem = (item
        : Stripe.Product) => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            const cart = JSON.parse(data) as Stripe.Product[]
            const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
            localStorage.setItem('storeCart', JSON.stringify(newCart))
            setCart(newCart)
        }
    }

    return (

        <div className=" bg-gray-100">
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <div className='pb-5'>
                                <button onClick={() => setShowModal(false)} className="text-3xl font-bold text-gray-500 hover:text-gray-400">&times;</button>
                            </div>
                            {/*Table header  */}
                            <div>

                                <table className="w-full text-md bg-white text-black shadow-md rounded mb-4">
                                    <tbody>
                                        <tr className="border-b">
                                            <th className="text-left p-3 px-5">Product</th>
                                            <th className="text-left p-3 px-5">Price</th>
                                            <th className="text-left p-3 px-5">Quantity</th>
                                            <th className="text-left p-3 px-5">Total</th>
                                            <th></th>
                                        </tr>
                                        {/*Table body */}

                                        {FakeData.map((item, index) => {
                                            return (
                                                <tr className="border-b text-black hover:bg-orange-100 bg-gray-100" key={index}>
                                                    <td className="p-3 px-5">
                                                        <div className="flex align-items-center">
                                                            {/* <Image className="rounded-full w-10 h-10 object-cover" src={item.images[0]} alt="" /> */}
                                                            <div className="ml-3">
                                                                <div className="">{item.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <div className="">{item.default_price}</div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <div className="">{item.quantity}</div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <div className="">{item.price * item.quantity}</div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <button onClick={handleRemoveItem} className="text-red-400 hover:text-red-600 hover:font-medium">
                                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                                <path
                                                                    d="M19 9H5v2h14V9zM5 15h14v-2H5v2z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>
                            <div>
                                <div className="flex justify-between border-t border-gray-300 pt-10">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Total
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
