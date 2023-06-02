import { useRouter } from 'next/router';
import React from 'react'
import type { DropDownItem } from 'types';
import Image from 'next/image';
export default function EspCard({ item }: { item: DropDownItem }) {
    const router = useRouter();
    return (
        <div onClick={() => {
            router.push(`/esp/${item.name}`).catch(err => console.log(err))
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
