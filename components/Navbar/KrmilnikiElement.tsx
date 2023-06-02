import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function KrmilnikiElement({ item }: { item: { name: string, link: string } }) {
    const [krmilnikiDropDown, setKrmilnikiDropDown] = useState(false)
    const handleKrmilnikiDropDown = () => {
        setKrmilnikiDropDown(!krmilnikiDropDown)
    }

    return (
        <div>
            <div onMouseEnter={() => {
                setKrmilnikiDropDown(true)
            }} className='p-2 rounded-xl hover:translate-x-1 duration-300 '>
                <Link href={item.link}>{item.name}</Link>
            </div>
            <div className=''>
                {krmilnikiDropDown ? (
                    <div onMouseLeave={() => {
                        setKrmilnikiDropDown(!krmilnikiDropDown)
                    }} className={`absolute bg-white rounded-md box-content p-4 w-auto h-auto ${krmilnikiDropDown ? "slide-down-container" : ""} `}>
                        <div className="flex flex-col">
                            {/* Fracture this stuff to a component it would be much better*/}
                            <div className="p-2 rounded-xl duration-300">
                                <div className='flex space-x-10'>
                                    <div className='flex-col text-black'>
                                        <div>
                                            <Image src='https://www.pngfind.com/pngs/m/336-3361370_arduino-uno-r3-png-png-download-arduino-uno.png' alt='fknarduino' width={100} height={100} />
                                        </div>
                                        <div className='font-medium text-sm text-black mb-3'>
                                            <Link href='/krmilniki'>ARDUINO</Link>
                                        </div>
                                        <div className='flex-col space-y-3 text-sm text-slate-400'>
                                            <div>
                                                <Link href='/krmilniki'>UNO</Link>
                                            </div>
                                            <div>
                                                <Link href='/krmilniki'>Nano</Link>
                                            </div>
                                            <div>
                                                <Link href='/krmilniki'>Mega</Link>
                                            </div>
                                            <div>
                                                <Link href='/krmilniki'>Pro Mini</Link>
                                            </div>
                                            <div>
                                                <Link href='/krmilniki'>Pro Micro</Link>
                                            </div>
                                            <div>
                                                <Link href='/krmilniki'>Leonardo</Link>
                                            </div>
                                            <div>
                                                <Link href='/krmilniki'>Ostali Arduino Krmilniki</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex-col' >
                                            <div>
                                                <Image src={"https://media.elektor.com/media/catalog/product/cache/9cc822bfc6a57f9729d464b8b5e0e0df/j/o/joy-it-nodemcu-esp32-development-board.png"} alt='fknarduino' width={100} height={100} />
                                            </div>
                                            <div className='text-black font-medium text-md'>
                                                <Link href={"/category/esp32"}>ESP32</Link>
                                            </div>
                                            <div className='flex-col space-y-1 text-sm text-slate-400'>
                                                <div>
                                                    <Link href={"/subcategory/esp32"}>Wroom32</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/subcategory/esp32"}>S3</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/subcategory/esp32"}>Wroom32U</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/subcategory/esp32"}>Wroom32D</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/subcategory/esp32"}>Wroom32E</Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex-col text-black'>
                                            <div className='text-black font-medium text-sm'>
                                                <Link href={"/esp8266"}>ESP8266</Link>
                                            </div>
                                            <div className='flex-col space-y-1 text-sm text-slate-400'>
                                                <div>
                                                    <Link href={"/esp8266"}>ESP-01</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/esp8266"}>ESP-02</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/esp8266"}>ESP-03</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/esp8266"}>ESP-04</Link>
                                                </div>
                                                <div>
                                                    <Link href={"/esp8266"}>ESP-05</Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex-col'>
                                        <div className='font-medium text-sm text-black'>
                                            <Link href='/raspberry'>Raspberry Pi</Link>
                                        </div>
                                        <div className='flex-col space-y-1 text-sm text-slate-400'>
                                            <div>
                                                <Link href='/raspberry'>Raspberry Pi 4</Link>
                                            </div>
                                            <div>
                                                <Link href='/raspberry'>Raspberry Pi 3</Link>
                                            </div>
                                            <div>
                                                <Link href='/raspberry'>Raspberry Pi 2</Link>
                                            </div>
                                            <div>
                                                <Link href='/raspberry'>Raspberry Pi 1</Link>
                                            </div>
                                            <div>
                                                <Link href='/raspberry'>Ostali Raspberry Pi</Link>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>


                        </div>

                    </div>) : null}
            </div>


        </div>
    )
}
