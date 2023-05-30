import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CartElement from './CartElement'
import ProfileElement from './ProfileElement'
import KrmilnikiElement from './KrmilnikiElement'
import KompletiElement from './KompletiElement'
import CartModal from './CartModal/CartModal'
import Stripe from 'stripe'

const NavTabItems = [
    {
        name: "Novo",
        link: "/"
    },
    {
        name: "Krmilniki",
        link: "/"
    },
    {
        name: "Kompleti",
        link: "/"
    },
    {
        name: "Moduli",
        link: "/"
    },
    {
        name: "Ostalo",
        link: "/"
    },

]
const NavUserItems = [
    {
        name: "Prijava",
        link: "/"
    },

    {
        name: "Košarica",
        link: "/"
    },

]

export default function Navbar({ setOpenCart }: { setOpenCart: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { data: sessionData } = useSession()
    const [cartRefreshCb, setCartRefreshCb] = useState<boolean>(false)
    const [itemCount, setItemCount] = useState<number>(0)
    useEffect(() => {
        const cart = localStorage.getItem('storeCart')
        if (cart) {
            const cartData = JSON.parse(cart) as Stripe.Product[]
            setItemCount(cartData.length)

        } else {
            localStorage.setItem('storeCart', JSON.stringify([]))
        }
    }, [cartRefreshCb])
    return (
        <nav>
            <div className="flex justify-between items-center  h-16  text-black relative shadow-xl rounded-b-xl font-semibold " role="navigation">
                <div>
                    <div className="flex items-center">
                        <div className='flex pl-8'>
                            <div className="flex space-x-10 ">
                                {NavTabItems.map((item, index) => {
                                    if (item.name === "Krmilniki") {
                                        return (
                                            <KrmilnikiElement key={index} item={item} />
                                        )
                                    } else if (item.name === "Kompleti") {
                                        return <KompletiElement key={index} item={item} />

                                    }
                                })}

                            </div>

                        </div>
                    </div>
                </div>
                <div className="flex pr-8">
                    <div className="flex space-x-4">
                        <div className="flex p-2 rounded-x space-x-5">
                            {NavUserItems.map((item, index) => {
                                if (!sessionData) {
                                    if (item.name === "Košarica") {
                                        return <CartElement openCart={setOpenCart} cartRefreshCb={setCartRefreshCb} key={index} itemCount={itemCount} />
                                    }
                                    return (
                                        <div key={index} className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300'>
                                            <button onClick={() => void signIn()}>Prijava</button>
                                        </div>
                                    )
                                } else {
                                    if ((item.name === "Prijava") && sessionData) {
                                        return <ProfileElement key={index} imageLink={sessionData?.user?.image as string} />
                                    } else if (item.name === "Registracija") {
                                        return null;
                                    }
                                    else if (item.name === "Košarica") {
                                        return (
                                            <div key={index} className=''>
                                                <CartElement openCart={setOpenCart} itemCount={itemCount} />
                                            </div>)
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
