import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import type { RootState } from 'stores/shoppingCartStore'
export default function CartElement({ openCart }: { itemCount: number, openCart: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleOpenCart = () => {
        openCart(true)
    }
    const storeSelector = useSelector((state: RootState) => state.items.length)
    useEffect(() => {
        console.log('storeSelector changed');
        console.log(storeSelector);
    }, [])

    return (
        <div onClick={handleOpenCart} className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300 cursor-pointer relative'>
            <AiOutlineShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                {storeSelector}
            </span>
        </div>
    );
}
