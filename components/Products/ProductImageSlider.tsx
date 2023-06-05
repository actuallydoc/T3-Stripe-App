import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import type Stripe from 'stripe';

export default function ProductImageSlider({ product }: { product: Stripe.Product }) {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView="auto"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide><Image src={product.images[0] as string} width={300} height={300} alt='product_image' /></SwiperSlide>
            {product.images.map((image, index) =>
                <SwiperSlide key={index}><Image key={index} src={image} width={300} height={300} alt='product_image' /></SwiperSlide>
            )}

        </Swiper>
    );
}
