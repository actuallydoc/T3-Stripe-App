import Image from 'next/image'
import React from 'react'
import type { DropDownItem } from 'types'
import BuyButton from '../Header/BuyButton'
// import ProductAddButton from 'components/Products/ProductAddButton'


//!TEMP PROP ITEM TYPE
export default function NewProductCard({ item }: { item: DropDownItem }) {
    return (
        <div className='box-content bg-white w-32 h-auto p-6 rounded-xl cursor-pointer hover:shadow-2xl duration-300 novo-section'>
            <div className='w-32 h-32  rounded-xl'>
                <Image src={item.image} alt={item.name} width={300} height={300} />
            </div>
            <div className='text-center content-center justify-center'>
                {item.name}
            </div>
            <div className='pt-4'>
                <BuyButton />
                {/* TODO Active this button after you get real products on the page */}
                {/* <ProductAddButton /> */}
            </div>
        </div>

    )
}
