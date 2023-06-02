import React from 'react'
import { api } from '@/utils/api'
import HomePageImage from './HomePageImage';
import BuyButton from './BuyButton';
import { useRouter } from 'next/router';
export default function HomePage() {
    const { data: prodcutData } = api.products.getAll.useQuery();
    const router = useRouter();
    return (
        <div className='bg-[#D9D9D9]'>
            <div className='flex pl-32'>
                <div className='flex flex-col content-center justify-center space-y-10 '>
                    <div className='pb-7'>
                        <p className='text-4xl font-medium'>KRMILNIKI ZA VAŠE POTREBE</p>
                    </div>
                    <div className='flex-col'>
                        <div>
                            <p className='text-xl'>Velika ponudba krmilnikov za vaše projekte</p>
                        </div>
                        <div>
                            <p className='text-xl'>s katerimi boste izpolnili vaše načrte</p>
                        </div>

                    </div>
                    <BuyButton />
                </div>
                <div className='ml-auto mr-20'>
                    <HomePageImage />
                </div>


            </div>
        </div >
    )
}
