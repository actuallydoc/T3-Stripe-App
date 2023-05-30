import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
export default function CartElement({ itemCount, openCart }: { itemCount: number, openCart: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [count, setItemCount] = React.useState<number>(0)
    //Get the number of items in the cart from local storage
    useEffect(() => {
        const data = localStorage.getItem('storeCart')
        if (data) {
            setItemCount(JSON.parse(data).length)
        }
    }, [])
    const handleOpenCart = () => {
        openCart(true)
    }
    return (
        <div className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300 cursor-pointer relative'>
            <AiOutlineShoppingCart onClick={handleOpenCart} size={24} />
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                    {count}
                </span>
            )}
        </div>
    );
}
