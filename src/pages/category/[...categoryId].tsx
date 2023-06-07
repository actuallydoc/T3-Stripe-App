import { api } from '@/utils/api';
import type { Product, Subcategory } from '@prisma/client';
import ProductCard from 'components/Products/ProductCard';
import { RootState, shoppingCartSlice } from 'stores/shoppingCartStore';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { CartItem } from 'types';
import Filter from 'components/Subcategory/Filter';
import Header from 'components/Subcategory/Header';
export default function CategoryPage() {
    const [items, setItems] = React.useState<CartItem[]>([]);
    const router = useRouter(); const { categoryId } = router.query;
    const { data: categoryProducts, isFetched } = api.category.getCategoryItems.useQuery(
        { name: categoryId as string[] },
        { enabled: router.isReady, refetchOnWindowFocus: false },
    )
    useEffect(() => {

        if (isFetched) {
            const items = categoryProducts?.categoryItems?.map((item: Product) => {
                return {
                    default_price: item.default_price,
                    image: item.image,
                    price: item.price,
                    name: item.name,
                    description: item.description,
                    quantity: 1
                }
            })
            setItems(items as CartItem[])
        }
    }, [isFetched, categoryProducts])
    // TODO Make category page with subcategories header and products grid , filter and sort options
    return (
        <div className='flex pt-10'>
            <div>
                <Filter />
            </div>
            <div className='flex text-center content-center ml-auto mr-10 '>
                <div>
                    {/*Best way to get subcategories from db would be to store it in a redux state 😏*/}
                    <Header subcategories={subcategories} />
                </div>
                <div className='grid grid-cols-4 gap-4 pt-10'>
                    {items?.map((product: CartItem, index) => {
                        return (
                            <ProductCard key={index} item={product} />
                        )
                    }
                    )}
                </div>
            </div>

        </div>

    )
}
