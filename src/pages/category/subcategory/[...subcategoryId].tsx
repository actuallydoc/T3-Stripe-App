import { api } from '@/utils/api';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Product } from 'types';



export default function SubCategoryPage() {
    const router = useRouter();
    const { subCategoryId } = router.query;
    //Fetch items for the category from backend
    const { data: categoryProducts } = api.category.getSubCategoryItems.useQuery(
        { name: subCategoryId as string },
        { enabled: router.isReady, refetchOnWindowFocus: false },
    )

    useEffect(() => {
        console.log(categoryProducts?.categoryItems)
    }, [])
    //!TODO Make category page with subcategories header and products grid , filter and sort options
    return (
        <div>
            <h1 className='text-3xl font-bold'>{subCategoryId}</h1>
            <div className='grid grid-cols-4 gap-4'>
                {categoryProducts?.categoryItems.map((product: Product, index) => {
                    return (
                        <div key={index} className='bg-white rounded-md p-4'>
                            <h1 className='text-2xl font-bold'>{product.name}</h1>
                            <Image src={product.image} alt="" width={100} height={100} />
                            <p className='text-xl font-bold'>{product.price}$</p>
                            <p className='text-xl font-bold'>Zaloga: {product.stock} kosov</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>

    )
}