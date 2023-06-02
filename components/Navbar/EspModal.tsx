import Link from 'next/link'
import React from 'react'

export default function EspModal({ item }: { item: { name: string, link: string } }) {
    return (
        <div>
            <div className='p-2 rounded-xl hover:translate-x-1 duration-300'>
                <Link href={item.link}>{item.name}</Link>
            </div>
        </div>
    )
}
