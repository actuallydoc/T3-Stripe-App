import React from 'react'

export default function SubCategoryCard() {
    return (
        <div>
            <div className='box-content w-64 h-64 p-4 border-4 border-black'>
                <div className='flex justify-between items-center'>
                    <div className='text-3xl font-bold'>Category</div>
                    <div className='text-sm text-gray-400 ml-2'>Subcategory</div>
                </div>
            </div>
        </div>
    )
}
