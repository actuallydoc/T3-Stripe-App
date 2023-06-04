import Link from 'next/link'
import React, { useState } from 'react'
import ArduinoCard from './ArduinoCard'
import type { DropDownItem } from '@/../types'
import SubCategoryCard from '../SubCategoryCard'

const ArduinoItems: DropDownItem[] = [
    {
        name: "Uno",
        link: "/category/arduino/uno",
        image: "https://si.farnell.com/productimages/standard/en_GB/2075382-40.jpg"
    },
    {
        name: "Nano",
        link: "/category/arduino/nano",
        image: "https://asset.conrad.com/media10/isa/160267/c1/-/sl/1172623_BB_00_FB/image.jpg?x=400&y=400"
    },
    {
        name: "Mega",
        link: "/category/arduino/mega",
        image: "https://asset.conrad.com/media10/isa/160267/c1/-/sl/191790_BB_00_FB/image.jpg?x=400&y=400"
    },
    {
        name: "Pro Mini",
        link: "/category/arduino/pro-mini",
        image: "https://www.3dsvet.eu/wp-content/uploads/2019/08/Arduino-Mini-Pro-5V-002.jpg"
    },
    {
        name: "Pro Micro",
        link: "/category/arduino/pro-micro",
        image: "https://cdn.sparkfun.com//assets/parts/9/3/2/6/12640-01a.jpg"
    },
    {
        name: "Leonardo",
        link: "/category/arduino/leonardo",
        image: "https://www.3dsvet.eu/wp-content/uploads/2023/05/Arduino-LEONARDO-smd-microUSB-ITALIJA.jpg"
    },
]



export default function ArduinoModal({ item }: { item: { name: string, link: string, navbarName: string } }) {
    const [arduinoDropDown, setArduinoDropDown] = useState(false)
    const handleKrmilnikiDropDown = () => {
        setArduinoDropDown(!arduinoDropDown)
    }
    return (
        <div>
            <div onMouseEnter={() => {
                setArduinoDropDown(true)
            }} className='p-2 rounded-xl hover:translate-x-1 duration-300 '>
                <Link href={item.link}>{item.navbarName}</Link>
            </div>
            <div className=''>
                {arduinoDropDown ? (
                    <div onMouseLeave={() => {
                        setArduinoDropDown(!arduinoDropDown)
                    }} className={`absolute bg-white rounded-md box-content p-4 w-auto h-auto ${arduinoDropDown ? "slide-down-container" : ""} `}>
                        <div className="grid grid-cols-4  w-auto">
                            {ArduinoItems.map((item: DropDownItem, index: number) => {
                                return (
                                    <div key={index}>
                                        <SubCategoryCard item={item} categoryName='arduino' />
                                        {/* <ArduinoCard key={index} item={item} /> */}
                                    </div>
                                )
                            })}
                        </div>

                    </div>) : null}
            </div>


        </div>
    )
}
