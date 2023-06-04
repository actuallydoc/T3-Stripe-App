
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import type { DropDownItem } from 'types';


export default function SubCategoryCard({ categoryName, item }: { categoryName: string, item: DropDownItem }) {
    const router = useRouter();
    return (
        <div onClick={() => {
            router.push(`/category/${categoryName}/${item.name}`).catch(err => console.log(err))
        }} className='box-content w-32 h-32 p-8 cursor-pointer hover:shadow-lg rounded-lg  duration-300'>
            <div className='w-32 h-32  rounded-xl'>
                <Image src={item.image} width={300} height={300} alt={item.name} />
            </div>
            <div className='text-center content-center justify-center'>
                {item.name}
            </div>
        </div>
    )
}