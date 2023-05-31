import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
export default function CartElement({ openCart, itemCount }: { itemCount: number, openCart: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleOpenCart = () => {
        openCart(true)
    }
    return (
        <div className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300 cursor-pointer relative'>
            <AiOutlineShoppingCart onClick={handleOpenCart} size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                {itemCount}
            </span>
        </div>
    );
}
