import React, { useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
const ProfileButtons = [
    {
        name: 'Naročila',
        link: '/narocila'
    },
    {
        name: 'Uredi profil',
        link: '/uredi-profil'
    },
    {
        name: 'Odjava',
        link: '/odjava'
    }

]
export default function ProfileElement({ imageLink }: { imageLink: string }) {

    const [profileDropDown, setProfileDropDown] = useState(false)

    const openDropDown = () => {
        setProfileDropDown(!profileDropDown)
    }

    return (
        <div className="relative">
            <div>
                <Image onClick={openDropDown} className='rounded-full cursor-pointer hover:scale-105 duration-300' src={imageLink} alt="Picture of the author" width={40} height={32} />
            </div>
            {profileDropDown && (
                <div className="absolute right-0 top-10 w-auto h-auto mt-1 drop-shadow-2xl">
                    <div className="bg-white rounded-xl shadow-xl slide-down-container">
                        <div className="flex items-center gap-2 p-10">
                            <div className='flex-col'>
                                <div>
                                    <p className="text-sm text-gray-500">Prijavljeni ste kot:</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800">Janez Novak</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-32 gap-2">
                                <div className='space-y-2 '>
                                    {ProfileButtons.map((button, index) => {
                                        if (button.name === 'Odjava') {
                                            return <button onClick={() => void signOut()} key={index} className="bg-sky-600 text-white rounded-xl px-2 py-1 hover:bg-sky-400 duration-300">{button.name}</button>
                                        } else {
                                            return <button key={index} className="bg-sky-600 text-white rounded-xl px-2 py-1 hover:bg-sky-400 duration-300">{button.name}</button>
                                        }
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
