import React from 'react'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import Image from 'next/image';
import ProductAddButton from 'components/Products/ProductAddButton';
export default function ProductDetails() {

    const router = useRouter();
    //This is the product id from the url /products/[productid]
    const { productid } = router.query;
    const { data: productData } = api.products.getOne.useQuery(
        { id: productid as string },
        { enabled: router.isReady },
    )

    return (
        <div>
            <div>
                {productData ? (
                    <div className='box-content w-96  h-96 text-center'>
                        <div className='flex-col'>
                            {/*!TODO Center this whole component and make a description section with extra data */}
                            <div className='text-center'>
                                <Image className="w-full mt-10 h-32 object-cover" src={productData.product?.images[0] as string} alt={productData.product.name} width={200} height={200} />
                            </div>
                            <div>
                                <h1>{productData.product.name}</h1>
                            </div>
                            <div>
                                {/*!TODO Fix the field conflict */}
                                <ProductAddButton product={productData.product} />
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






