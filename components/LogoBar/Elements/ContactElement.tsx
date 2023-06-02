import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
export default function ContactElement() {
    return (
        <div className="flex justify-center items-center text-white bg-[#05B3A2] rounded-xl px-3">
            <div>
                <AiOutlinePhone className="h-10 w-10" />
            </div>
            <div>
                <p className="text-xl">+386 40 123 456</p>
            </div>
        </div>

    )
}
