import type { Subcategory } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export default function Header({ subcategories }: { subcategories: Subcategory[] }) {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {subcategories?.map((subcategory, index) => {
                return (
                    <div className='box-content w-32 h-32 p-4 border-2 rounded-xl hover:shadow-lg duration-300 cursor-pointer' key={index}>
                        <div className='flex justify-between items-center'>
                            <div className='flex-col'>
                                <div>
                                    <Image src={subcategory.image} width={100} height={100} alt='sub-image' />
                                </div>
                                <div className='text-lg font-bold text-gray-400 ml-2'>{subcategory.navbarName}</div>
                            </div>

                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}
