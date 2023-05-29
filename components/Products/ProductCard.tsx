import React from 'react'
import type Stripe from 'stripe';
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function ProductCard({ item, handleAddToCart }: { item: Stripe.Product, handleAddToCart: (default_price: string) => void }) {
    const router = useRouter();
    const handleProductClick = async () => {
        await router.push(`/products/${item.id}`)

    }

    return (
        <div className='bg-white max-w-3xl h-auto  rounded-xl '>
            <div>
                {item.active ? (
                    <div key={item.id} className='pb-5'>
                        <div onClick={() => {
                            handleProductClick().then((r) => console.log(r)).catch((e) => console.log(e));
                        }}>                    <div key={item.id}
                            className='flex flex-col items-center justify-center p-4'>
                                <div>
                                    {item.images[0] ? (
                                        <Image src={item.images[0]} className='w-auto h-auto' alt="product-image" width={80} height={80} />
                                    ) : null
                                    }
                                </div >
                                <div>
                                    <h1 className='text-xl font-bold text-gray-900'>{item.name}</h1>
                                </div>
                                <div className='max-h-24'>
                                    <h1 className='text-sm font-semibold text-gray-900'>{item.description}</h1>
                                </div>
                            </div >

                        </div >
                        <div className='ml-3 mt-5'>
                            <button onClick={() => {
                                handleAddToCart(item.default_price as string);
                            }} className='mt-4 bg-sky-700 text-white px-3 py-2  rounded-full hover:bg-sky-500'>Add to cart</button>
                        </div>
                    </div >
                ) : (
                    <div key={item.id} className='flex-col'>
                        <div key={item.id} className='flex flex-col items-center justify-center  bg-white rounded-lg shadow-lg'>
                            <div>
                                {item.images[0] ? (
                                    <Image src={item.images[0]} className='h-auto w-16' alt="product-image" width={100} height={100} />
                                ) : null}
                            </div>
                            <div>
                                <h1 className='text-xl font-bold text-gray-900'>{item.name}</h1>
                            </div>
                            <div>
                                <h1 className='text-sm font-semibold text-gray-900'>{item.description}</h1>
                            </div>

                        </div>
                        <div className=''>
                            <div className='mr-auto pl-3'>
                                <button className='mt-4 bg-sky-700 text-white px-3 py-2 rounded-full disabled opacity-60'>Out of stock</button>
                            </div>
                            <div className='mr-5'>
                                <button
                                    className='mt-4 bg-sky-700 text-white px-3 py-2 rounded-full disabled opacity-60'>Out of stock</button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        </div >
    )
}
