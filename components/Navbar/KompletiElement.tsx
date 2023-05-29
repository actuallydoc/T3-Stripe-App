import Link from 'next/link'
import React from 'react'

export default function KompletiElement({ item }: { item: { name: string, link: string } }) {
    return (
        <div>
            <div className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300'>
                <Link href={item.link}>{item.name}</Link>
            </div>
        </div>
    )
}
