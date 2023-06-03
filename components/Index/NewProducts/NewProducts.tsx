import React from 'react'
import type { DropDownItem } from 'types'
import NewProductCard from './NewProductCard'
import { api } from '@/utils/api'
import router, { useRouter } from 'next/router'
import Stripe from 'stripe'

// const tempNewProducts: DropDownItem[] = [
//     {
//         name: "Uno",
//         link: "/arduino/uno",
//         image: "https://si.farnell.com/productimages/standard/en_GB/2075382-40.jpg"
//     },
//     {
//         name: "Nano",
//         link: "/arduino/nano",
//         image: "https://asset.conrad.com/media10/isa/160267/c1/-/sl/1172623_BB_00_FB/image.jpg?x=400&y=400"
//     },
//     {
//         name: "Mega",
//         link: "/arduino/mega",
//         image: "https://asset.conrad.com/media10/isa/160267/c1/-/sl/191790_BB_00_FB/image.jpg?x=400&y=400"
//     },
//     {
//         name: "Pro Mini",
//         link: "/arduino/pro-mini",
//         image: "https://www.3dsvet.eu/wp-content/uploads/2019/08/Arduino-Mini-Pro-5V-002.jpg"
//     },
//     {
//         name: "Pro Micro",
//         link: "/arduino/pro-micro",
//         image: "https://cdn.sparkfun.com//assets/parts/9/3/2/6/12640-01a.jpg"
//     },
//     {
//         name: "Leonardo",
//         link: "/arduino/leonardo",
//         image: "https://www.3dsvet.eu/wp-content/uploads/2023/05/Arduino-LEONARDO-smd-microUSB-ITALIJA.jpg"
//     },
// ]

export default function NewProducts() {
    const router = useRouter();
    const { data: productData } = api.products.getAll.useQuery(
        (undefined),
        {
            enabled: router.isReady,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60 * 24,
        }
    );
    return (
        <div>
            <div className="flex space-x-8 text-center content-center justify-center">
                {productData?.products.map((item: Stripe.Product, index: number) => {
                    return (
                        <div key={index} className="p-1 pb-20 rounded-xl hover:translate-x-1 duration-300 ">
                            <NewProductCard item={item} />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
