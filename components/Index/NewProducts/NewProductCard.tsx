import Image from 'next/image'
import React from 'react'
import type Stripe from 'stripe'
import ProductAddButton from 'components/Products/ProductAddButton'
import type CustomProduct from 'types'
// import ProductAddButton from 'components/Products/ProductAddButton'


//!TEMP PROP ITEM TYPE
export default function NewProductCard({ item }: { item: Stripe.Product }) {
    return (
        <div className='box-content bg-white w-64 h-64 p-6 rounded-xl cursor-pointer hover:shadow-2xl duration-300 novo-section'>
            <div className='rounded-xl justify-center content-center text-center'>
                <Image src={item.images[0] as string} alt={item.name} width={200} height={200} />
            </div>
            <div className='text-center content-center justify-center'>
                {item.name}
            </div>
            <div className='flex-grow'></div>
            <div className='mt-auto'>

            </div>
            <div className=''>
                <ProductAddButton product={item as CustomProduct} />
            </div>
        </div>

    )
}
