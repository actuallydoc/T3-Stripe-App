import React from 'react'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import type { CartItem } from 'types'


export default function NewProducts() {
    const [products, setProducts] = React.useState<CartItem[]>([]);
    const router = useRouter();
    // TODO: Fetch the products from the api not the stripe api
    const { data: productData } = api.products.getAll.useQuery(
        (undefined),
        {
            enabled: router.isReady,
            refetchOnWindowFocus: false,
        }
    );
    return (
        <div>
            <div className="flex space-x-8 text-center content-center justify-center">
                {/* {productData?.products.map((item: CartItem, index: number) => {
                    return (
                        <div key={index} className="p-1 pb-20 rounded-xl hover:translate-x-1 duration-300 ">
                            <NewProductCard item={item} />
                        </div>
                    )
                })
                } */}
            </div>
        </div>
    )
}
