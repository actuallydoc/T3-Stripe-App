import React from 'react'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import ProductAddButton from 'components/Products/ProductAddButton';
import ProductImageSlider from 'components/Products/ProductImageSlider';
import type { CartItem } from 'types';
export default function ProductDetails() {

    const router = useRouter();
    //This is the product id from the url /products/[productid]
    const { productid } = router.query;
    const { data: productData } = api.products.getOne.useQuery(
        { id: productid as string },
        { enabled: router.isReady },
    )
    return (
        <div className='flex justify-center mt-36'>
            <div>
                {productData ? (
                    <div className='box-content  border-4 rounded-lg p-24 w-96 h-fit  justify-center text-center'>
                        <div className='flex-col'>
                            <div>
                                <h1 className='text-4xl font-bold'>{productData.product.name}</h1>
                            </div>
                            {/*!TODO Center this whole component and make a description section with extra data */}
                            <div>
                                <ProductImageSlider product={productData.product} />
                                <h1>{productData.product.name}</h1>
                            </div>
                            <div>
                                {/*!TODO Fix the field conflict */}
                                <ProductAddButton product={productData.product as unknown as CartItem} />
                            </div>
                            <div>
                                <p className='text-xl font-bold'>Opis</p>
                            </div>
                            <div className=''>
                                <p>{productData.product.description}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}






