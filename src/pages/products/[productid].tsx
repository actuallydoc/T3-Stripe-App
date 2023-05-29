import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import ProductCard from 'components/Products/ProductCard';
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
            <h1>Product Details</h1>
            <div>
                {productData ? (
                    <div>
                        <h1>{productData.product.name}</h1>
                        <h1>{productData.product.description}</h1>
                    </div>
                ) : null}
            </div>
        </div>
    )
}






