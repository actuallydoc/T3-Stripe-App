import CartElement from 'components/LogoBar/CartElement';
import ProfileElement from 'components/LogoBar/ProfileElement';
import { useSession, signIn } from 'next-auth/react'
import { GoLocation } from "react-icons/go"
import React, { useState } from 'react'
import LocationButton from './LocationButton';
const NavUserItems = [
    {
        name: "Lokacija",
        link: "/"
    },
    {
        name: "Prijava",
        link: "/"
    },

    {
        name: "Košarica",
        link: "/"
    },


]

export default function LogoBar({ setOpenCart }: { setOpenCart: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { data: sessionData } = useSession();
    const [itemCount] = useState<number>(0)
    return (
        <div>
            <nav>
                <div className="flex justify-between items-center  h-16  text-black relative rounded-b-xl font-semibold " role="navigation">
                    <div className='pl-12'>
                        {/* Website name */}
                        <p className='text-4xl font-semibold underline'>Krmilko</p>
                    </div>
                    <div className="flex pr-8">
                        <div className="flex space-x-4">
                            <div className="flex p-2 rounded-x space-x-5">
                                {NavUserItems.map((item, index) => {
                                    if (!sessionData) {
                                        if (item.name === "Lokacija") {
                                            return <GoLocation key={index} size={30} />;
                                        }
                                        else if (item.name === "Košarica") {
                                            return <CartElement openCart={setOpenCart} key={index} itemCount={itemCount} />
                                        }
                                        return (
                                            <div key={index} className='p-2 rounded-xl hover:bg-sky-400 duration-300 hover:text-slate-300'>
                                                <button onClick={() => void signIn()}>Prijava</button>
                                            </div>
                                        )
                                    }
                                    else {
                                        if (item.name === "Lokacija") {
                                            return <LocationButton key={index} />
                                        }
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
        </div>
    )
}
