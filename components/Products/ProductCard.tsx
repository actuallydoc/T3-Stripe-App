import React from 'react'
import Image from 'next/image';
// import { useRouter } from 'next/router';
import type { CartItem } from 'types';
import ProductAddButton from './ProductAddButton';
export default function ProductCard({ item }: { item: CartItem }) {
    // const router = useRouter();
    const handleProductClick = () => {
        console.log(item)
        // TODO Add id to the product and use it to get the product from the backend
        // router.push(`/product/${item.name}`).catch(err => console.log(err))

    }
    return (
        <div className='box-content bg-white hover:translate-x-1 shadow-xl duration-300 w-64 h-64 p-6 rounded-xl cursor-pointer novo-section'>
            <div onClick={handleProductClick}>
                <div className='rounded-xl justify-center content-center text-center'>
                    <Image src={item.image} alt={item.name} width={200} height={200} />
                </div>
                <div className='text-center content-center justify-center'>
                    {item.name}
                </div>
                <div className='flex-grow'></div>
                <div className='mt-auto'>
                </div>
            </div>

            <div className=''>
                <ProductAddButton product={item} />
            </div>
        </div>

    )
}
