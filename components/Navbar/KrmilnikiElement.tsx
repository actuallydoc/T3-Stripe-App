import Link from 'next/link'
import React, { useState } from 'react'

export default function KrmilnikiElement({ item }: { item: { name: string, link: string } }) {
    const [krmilnikiDropDown, setKrmilnikiDropDown] = useState(false)
    const handleKrmilnikiDropDown = () => {
        setKrmilnikiDropDown(!krmilnikiDropDown)
    }

    return (
        <div>
            <div onClick={handleKrmilnikiDropDown} className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300'>
                <Link href={item.link}>{item.name}</Link>
            </div>
            <div className=''>
                {krmilnikiDropDown ? (
                    <div className="absolute bg-sky-400 shadow-md rounded-md box-content w-64 h-64">
                        <div className="flex flex-col">
                            <div className="p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300">
                                <Link href='/krmilniki'>Arduino</Link>
                            </div>
                            <div className="p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300">
                                <Link href='/kompleti'>Raspberry Pi🍒</Link>
                            </div>
                        </div>

                    </div>) : null}
            </div>


        </div>
    )
}
