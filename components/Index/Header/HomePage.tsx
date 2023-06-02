import React from 'react'
import BuyButton from './BuyButton';
import HomePageImage from './HomePageImage';
import NewProducts from '../NewProducts/NewProducts';
export default function HomePage() {
    return (
        <div>
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

                <div>
                    <div className='flex flex-col content-center justify-center text-center space-y-5 '>
                        <div>
                            <p className='text-4xl font-medium'>Nova ponudba</p>
                        </div>
                        <div>
                            <p className='text-xl'>Poglejte si našo novo ponudbo krmilnikov</p>
                        </div>
                        <div>
                            <NewProducts />
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}
