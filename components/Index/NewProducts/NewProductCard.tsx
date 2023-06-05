import Image from 'next/image'
import React from 'react'
import ProductAddButton from 'components/Products/ProductAddButton'
import type { CartItem } from 'types'

// FIXME: TEMP PROP ITEM TYPE
export default function NewProductCard({ item }: { item: CartItem }) {
    return (
        <div className='box-content bg-white w-64 h-64 p-6 rounded-xl cursor-pointer hover:shadow-2xl duration-300 novo-section'>
            <div className='rounded-xl justify-center content-center text-center'>
                <Image src={item.image} alt={item.name} width={200} height={200} />
            </div>
            <div className='text-center content-center justify-center'>
                {item.name}
            </div>
            <div className='flex-grow'></div>
            <div className='mt-auto'>

            </div>
            <div className=''>
                <ProductAddButton product={item} />
            </div>
        </div>

    )
}
