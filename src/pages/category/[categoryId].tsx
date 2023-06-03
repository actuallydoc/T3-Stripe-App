import { api } from '@/utils/api';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Product } from 'types';



export default function CategoryPage() {
    const router = useRouter();
    const { categoryId } = router.query;
    //Fetch items for the category from backend
    const { data: categoryProducts } = api.category.getCategoryItems.useQuery(
        { name: categoryId as string },
        { enabled: router.isReady, refetchOnWindowFocus: false },
    )
    //!TODO Make category page with subcategories header and products grid , filter and sort options
    return (
        <div>
            <h1 className='text-3xl font-bold'>{categoryId}</h1>
            <div className='grid grid-cols-4 gap-4'>
                {categoryProducts?.products.map((product: Product, index) => {
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
