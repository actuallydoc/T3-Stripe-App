import { api } from '@/utils/api';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'



export default function CategoryPage() {
    const router = useRouter();
    const { categoryId } = router.query;
    //Fetch items for the category from backend
    const { data: categoryProducts } = api.category.getCategoryItems.useQuery(
        { id: categoryId as string },
        { enabled: router.isReady },
    )
    useEffect(() => {
        console.log(categoryProducts?.categoryItems);
    }, [])
    return (
        <div></div>
    )
}
