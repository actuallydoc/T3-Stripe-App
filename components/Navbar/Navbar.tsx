'use client';
import React from 'react'

import ArduinoModal from './Modals/Arduino/ArduinoModal'
import EspModal from './Modals/Esp/EspModal';



const NavTabItems = [
    {
        name: "Novo!",
        link: "/"
    },
    {
        name: "Arduino",
        link: "/arduino"
    },
    {
        name: "ESP",
        link: "/esp"
    },
    {
        name: "STM",
        link: "/stm"
    },
    {
        name: "Micro:bit",
        link: "/microbit"
    },
    {
        name: "Raspberry Pi",
        link: "/raspberrypi"
    },
    {
        name: "Moduli & Dodatki",
        link: "/moduli"
    }
]
const scrollToSection = () => {
    const section = document.getElementById('novo-section')
    console.log("Scrolling to section")
    section?.scrollIntoView({ behavior: "smooth" })
}
export default function Navbar() {
    return (
        <nav className=''>
            <div className="flex space-x-20 gap-1 justify-center items-center  h-16  text-black relative shadow-xl rounded-b-xl font-semibold " role="navigation">
                {NavTabItems.map((item, index) => {
                    if (item.name === "Arduino") {
                        return <ArduinoModal key={index} item={item} />
                    }
                    else if (item.name === "ESP") {
                        return <EspModal key={index} item={item} />
                    }
                    else if (item.name === "Novo!") {
                        return <div onClick={scrollToSection} className='p-2  text-red-500 text-xl rounded-xl hover:translate-x-1 duration-300' key={index}>{item.name}</div>
                    } else {
                        return <div className='p-2 rounded-xl hover:translate-x-1 duration-300' key={index}>{item.name}</div>
                    }
                })}

            </div>
        </nav >
    )
}
