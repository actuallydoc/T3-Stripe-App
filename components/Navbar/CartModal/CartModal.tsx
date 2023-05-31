import Image from 'next/image';
import React, { useEffect } from 'react'
import type Stripe from 'stripe';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useStripe } from '@stripe/react-stripe-js';
import { Cart, CartItem } from 'types';
export default function CartModal({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [cart, setCart] = React.useState<Stripe.Product[]>([] as Stripe.Product[])
    const stripePromise = useStripe();
    //NextAuth session context provider
    const { data: sessionData } = useSession();
    const { data: productsData } = api.products.getAll.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    )
    const checkout = api.payment.createCheckout.useMutation();
    useEffect(() => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            setCart(JSON.parse(data) as Stripe.Product[])
        }
        console.log(cart)
    }, []);
    const handleRemoveItem = (e: MouseEvent, item
        : Stripe.Product) => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            const cart = JSON.parse(data) as Stripe.Product[]
            const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
            localStorage.setItem('storeCart', JSON.stringify(newCart))
            setCart(newCart)
        }
    }
    const handleCheckout = async () => {
        // Quantity state is passed to the backend
        // Product id is passed to the backend
        if (Object.keys(cart).length === 0) {
            toast.error("Shopping Cart is empty");
            return;
        }
        toast.success("Redirecting to checkout page");
        const response = await checkout.mutateAsync({
            //Because the product type does not have a quantity property it is added here and the error appears
            products: cart,
            email: sessionData?.user?.email as string,
        });
        const stripe = stripePromise;
        //Redirects the user to the checkout page if the checkout session provider exist's and is not null
        //This is stripe magic
        if (stripe !== null) {
            await stripe.redirectToCheckout({
                sessionId: response.id,
            })
        }
    }
    return (
        <div className=" bg-gray-100">
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-xl">
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
                                            <th className="text-left p-3 px-5">Produkt</th>
                                            <th className="text-left p-3 px-5">Cena za kos</th>
                                            <th className="text-left p-3 px-5">Količina</th>
                                            <th className="text-left p-3 px-5">Cena</th>
                                            <th></th>
                                        </tr>
                                        {/*Table body */}

                                        {cart.map((item, index) => {
                                            return (
                                                <tr className="border-b text-black hover:bg-orange-100 bg-gray-100" key={index}>
                                                    <td className="p-3 px-5">
                                                        <div className="flex align-items-center">
                                                            <Image className="rounded-full w-10 h-10 object-cover" src={item.images[0] as string} alt="" width={60} height={60} />
                                                            <div className="ml-3">
                                                                <div className="">{item.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <div className="">{"Price"}</div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <div className="">{item.name}</div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <div className="">{item.name}</div>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <button onClick={(e) => handleRemoveItem(e, item)} className="text-red-400 hover:text-red-600 hover:font-medium">
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
                                <div>
                                    <button onClick={handleCheckout} className="bg-gray-800 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{ transition: "all .15s ease" }}>
                                        <span className="inline-block mr-2">Checkout</span>
                                        <span className="inline-block">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >


    )
}
