import React from 'react'
import { BsTruck } from 'react-icons/bs'
export default function ShippingBar() {
    return (
        < div className="w-full h-12 flex space-x-3 items-center justify-center text-center bg-[#05B3A2]" >
            <div>
                <p className="text-white text-xl">Brezplačna dostava pri naročilih nad 40€!</p>
            </div>
            <div>
                <BsTruck size={30} className='text-white' />
            </div>
        </div >
    )
}
