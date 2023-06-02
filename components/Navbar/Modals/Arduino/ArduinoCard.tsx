import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import type { DropDownItem } from 'types'

//!This can be optimized to use just 1 compeonent for all the dropdown cards and items whatever but i just want to make it straight
export default function ArduinoCard({ item }: { item: DropDownItem }) {
    const router = useRouter();
    return (
        <div onClick={() => {
            router.push(`/arduino/${item.name}`).catch(err => console.log(err))
        }} className='box-content w-32 h-32 p-6 cursor-pointer hover:shadow-2xl duration-300'>
            <div className='w-32 h-32  rounded-xl'>
                <Image src={item.image} width={300} height={300} alt={item.name} />
            </div>
            <div className='text-center content-center justify-center'>
                {item.name}
            </div>
        </div>
    )
}
