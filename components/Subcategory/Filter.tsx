import { Slider } from 'components/ui/slider'
import React from 'react'
import { cn } from "@/lib/utils"
import { Label } from 'components/ui/label'
import { useState } from 'react'
type SliderProps = React.ComponentProps<typeof Slider>
export default function Filter({ className, ...props }: SliderProps) {

    const [slider, setSlider] = useState<number>(0)
    const handlePriceSlider = (e: React.FormEvent<HTMLDivElement>) => {
        console.log(e.currentTarget)
    }
    return (
        <div>
            <div className=''>
                <div>
                    <Label>Filter by price</Label>
                </div>
                <div>
                    {/* TODO: Get the highest price and lowest price and set as the "max" , "min" when you change the slider refilter the products from the min-max price */}
                    <Slider onChange={(e) => handlePriceSlider(e)} defaultValue={[slider]} min={0} max={100} step={1} />
                </div>
                <div>
                    <Label className='text-xl'>Filter by Model Name</Label>
                </div>
            </div>
        </div>
    )
}
