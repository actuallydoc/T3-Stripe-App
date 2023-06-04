import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import type { RootState } from 'stores/shoppingCartStore'
export default function CartElement() {
    const handleOpenCart = () => {
        // openCart(true)
    }
    const storeSelector = useSelector((state: RootState) => state.items.length)

    return (
        <div onClick={handleOpenCart} className='rounded-xl hover:bg-[#10A193] p-1 duration-300 hover:text-slate-300 cursor-pointer relative'>
            <div className='mt-2 px-1'>
                <AiOutlineShoppingCart size={25} />
            </div>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                {storeSelector}
            </span>
        </div>
    );
}
