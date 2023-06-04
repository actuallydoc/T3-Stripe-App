import { api } from '@/utils/api';
import type { Product, Subcategory } from '@prisma/client';
import ProductCard from 'components/Products/ProductCard';
import { RootState, shoppingCartSlice } from 'stores/shoppingCartStore';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from 'types';
import cart from '../cart';
import Header from 'components/Subcategory/Header';
import Filter from 'components/Subcategory/Filter';


export default function CategoryPage() {
    const [items, setItems] = React.useState<CartItem[]>([]);
    const router = useRouter();
    const { categoryId } = router.query;
    const cartSelector = useSelector((state: RootState) => state.items);
    const dispatch = useDispatch();
    //Fetch items for the category from backend
    const { data: categoryProducts, isFetched } = api.category.getCategoryItems.useQuery(
        { name: categoryId as string[] },
        { enabled: router.isReady, refetchOnWindowFocus: false },
    )
    //!TODO Fetch subcategories for the category from backend broken for now 
    const { data: subcategories } = api.categories.getSubCategores.useQuery(
        { name: categoryId as string },
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
    //!TODO Make category page with subcategories header and products grid , filter and sort options
    return (
        <div className='flex'>
            <div>
                <Filter />
            </div>
            <div className='flex-col'>
                <div>
                    <Header subcategories={subcategories as Subcategory[]} />
                </div>
                <div className='grid grid-cols-4 gap-4 pt-10'>
                    {items?.map((product: CartItem, index) => {
                        return (
                            <ProductCard id={index} key={index} item={product} />
                        )
                    }
                    )}
                </div>
            </div>

        </div>

    )
}
