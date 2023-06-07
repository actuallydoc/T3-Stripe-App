
import React, { useState } from 'react'
import SubCategoryCard from './SubCategoryCard'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'

export default function SubCategoryModal({ item }: { item: { name: string, link: string, navbarName: string } }) {
    const [categoryDropDown, setCategoryDropDown] = useState(false)
    const { data: subCategoryData } = api.categories.getSubcategories.useQuery(
        { name: item.name },
        { enabled: true, refetchOnWindowFocus: false }
    )
    const router = useRouter()
    const handleMouseEnter = () => {
        setCategoryDropDown(true);
    }

    const handleMouseLeave = () => {
        setCategoryDropDown(false);
    }

    return (
        <div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='p-2 rounded-xl hover:translate-x-1 duration-300 '
            >
                <div onClick={() => {
                    router.push(`/category` + item.link).catch(err => console.log(err))
                }}>{item.navbarName}</div>
            </div>
            <div className=''>
                {categoryDropDown && (
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={`absolute bg-white rounded-md box-content p-4 w-auto h-auto ${categoryDropDown ? "slide-down-container" : ""} `}
                    >
                        <div className="grid grid-cols-4  w-auto">
                            {subCategoryData?.map((item, index: number) => (
                                <div key={index}>
                                    <SubCategoryCard item={item} />
                                    {/* <ArduinoCard key={index} item={item} /> */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}