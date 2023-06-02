import Link from 'next/link'
import React from 'react'
import type { DropDownItem } from 'types'
import EspCard from './EspCard'

const EspItems: DropDownItem[] = [
    {
        name: 'ESP32',
        link: '/esp/esp32',
        image: 'https://asset.conrad.com/media10/isa/160267/c1/-/sl/001925469PI00/image.jpg?x=400&y=400'

    },
    {
        name: 'ESP8266',
        link: '/esp/esp8266',
        image: 'https://asset.conrad.com/media10/isa/160267/c1/-/sl/001707668PI02/image.jpg?x=400&y=400/images/esp8266.jpg'
    },
    {
        name: 'ESP8265',
        link: '/esp/esp8265',
        image: '/8265.jpg'
    },
    {
        name: 'ESP32-S2',
        link: '/esp/esp32-s2',
        image: ""
    }
]

export default function EspModal({ item }: { item: { name: string, link: string } }) {
    const [espDropDown, setEspDropDown] = React.useState(false)
    return (
        <div>
            <div onMouseEnter={() => {
                setEspDropDown(true)
            }} className='p-2 rounded-xl hover:translate-x-1 duration-300 '>
                <Link href={item.link}>{item.name}</Link>
            </div>
            <div className=''>
                {espDropDown ? (
                    <div onMouseLeave={() => {
                        setEspDropDown(!espDropDown)
                    }} className={`absolute bg-white rounded-md box-content p-4 w-auto h-auto ${espDropDown ? "slide-down-container" : ""} `}>
                        <div className="grid grid-cols-4  w-auto">
                            {EspItems.map((item: DropDownItem, index: number) => {
                                return (
                                    <div key={index}>
                                        <EspCard key={index} item={item} />
                                    </div>
                                )
                            })}
                        </div>

                    </div>) : null}
            </div>


        </div>
    )
}