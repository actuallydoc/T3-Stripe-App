import React from 'react'
import { api } from '@/utils/api'
import Image from 'next/image';
import type Stripe from 'stripe';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import type CustomProduct from 'types';
export default function HomePage() {
    const { data: prodcutData } = api.products.getAll.useQuery();
    const handleAddToCart = (item: CustomProduct) => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            //Check if the item is already in the cart
            const cart = JSON.parse(data) as CustomProduct[]
            const itemInCart = cart.find((cartItem) => cartItem.default_price === item.default_price)
            if (itemInCart) {
                console.log("Item already in cart")
                //Increase the quantity of the item in the cart
                itemInCart.quantity += 1
                localStorage.setItem('storeCart', JSON.stringify(cart))
                return toast.success("Increase the quantity of the item in the cart");
            } else {
                //Add the item to the cart
                item.quantity = 1
                cart.push(item)
                localStorage.setItem('storeCart', JSON.stringify(cart))
                return toast.success("Item added to cart");
            }

        } else {
            console.log("Cart is empty")
        }
    }

    const router = useRouter();
    return (
        <div>
            <div className="grid gap-6 sm:grid-cols-1   md:grid-cols-3 lg:grid-cols-4">
                {prodcutData?.products?.map((product) => (
                    <div key={product.id}
                        className="bg-white box-content w-64 h-max-[64px] shadow-md rounded-md flex flex-col hover:scale-105 duration-300 cursor-pointer">
                        <div>
                            <div onClick={() => {
                                router.push(`/products/${product.id}`).catch((error) => {
                                    console.log(error)
                                })
                            }}>
                                <div>
                                    <Image className="w-full h-32 object-cover" src={product.images[0] as string} alt={product.name} width={200} height={200} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                </div>
                                <div>
                                    <p className="text-sm">{product.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">10$</p>
                                </div>

                            </div>
                        </div>
                        <div className="flex-grow"></div> {/* This div will push the buttons to the bottom */}
                        <div className="flex space-x-5 mt-3">
                            <div className='flex'>
                                <div>
                                    <button onClick={() => handleAddToCart(product as CustomProduct)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Dodaj v košarico
                                    </button>
                                </div>
                                <div>
                                    <div className="box-content pb-3">
                                        <input className="w-16 text-center content-center h-10 border-2 border-gray-200 rounded-md" type="number" defaultValue={1} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
