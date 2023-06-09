
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import type { Category, Subcategory } from '@prisma/client';
export default function SubCategoryCard({ item }: { item: Subcategory & { category: Category | null } }) {
    const router = useRouter();
    return (
        <div onClick={() => {
            if (item.category) {
                router.push(`/category/${item.category.name}/${item.name}`).catch(err => console.log(err))
            }
        }} className='box-content w-32 h-32 p-8 cursor-pointer hover:shadow-lg rounded-lg  duration-300'>
            <div className='w-32 h-32  rounded-xl'>
                <Image src={item.image} width={300} height={300} alt={item.name} />
            </div>
            <div className='text-center content-center justify-center'>
                {item.navbarName}
            </div>
        </div>
    )
}