'use client';
import React, { useEffect } from 'react'
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import SubCategoryModal from './Modals/SubCategoryModal';



const scrollToSection = () => {
    const section = document.getElementById('novo-section')
    console.log("Scrolling to section")
    section?.scrollIntoView({ behavior: "smooth" })
}
export default function Navbar() {
    const router = useRouter()
    const { data: categoryData } = api.categories.getCategories.useQuery(
        (undefined),
        {
            enabled: router.isReady,
            refetchOnWindowFocus: false,
        }
    )
    useEffect(() => {
        console.log(categoryData)
    }, [categoryData])
    return (
        <nav className=''>
            <div className="flex space-x-20 gap-1 justify-center items-center  h-16  text-black relative shadow-xl rounded-b-xl font-semibold " role="navigation">
                {categoryData?.map((item, index) => {
                    return (
                        <SubCategoryModal key={index} item={item} />
                    )
                })}

            </div>
        </nav >
    )
}
