import Link from 'next/link'
import React, { useState } from 'react'
import type { DropDownItem } from '@/../types'
import SubCategoryCard from './SubCategoryCard'
import { api } from '@/utils/api'

export default function SubCategoryModal({ item }: { item: { name: string, link: string, navbarName: string } }) {
    const [categoryDropDown, setCategoryDropDown] = useState(false)
    const { data: subCategoryData } = api.categories.getSubCategores.useQuery(
        { name: item.name },
        { enabled: true, refetchOnWindowFocus: false }
    )

    return (
        <div>
            <div onMouseEnter={() => {
                setCategoryDropDown(true)
            }} className='p-2 rounded-xl hover:translate-x-1 duration-300 '>
                <Link href={"/category/" + item.link}>{item.navbarName}</Link>
            </div>
            <div className=''>
                {categoryDropDown ? (
                    <div onMouseLeave={() => {
                        setCategoryDropDown(!categoryDropDown)
                    }} className={`absolute bg-white rounded-md box-content p-4 w-auto h-auto ${categoryDropDown ? "slide-down-container" : ""} `}>
                        <div className="grid grid-cols-4  w-auto">
                            {subCategoryData?.map((item: DropDownItem, index: number) => {
                                return (
                                    <div key={index}>
                                        <SubCategoryCard item={item} />
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