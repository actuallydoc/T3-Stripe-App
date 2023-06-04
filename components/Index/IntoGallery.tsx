import React, { useState } from 'react'
import Image from "next/image";
export default function IntoGallery({ photos }: { photos: string[] }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
    };

    const handleNext = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
    };

    const currentPhoto = photos[currentPhotoIndex];

    return (
        <div><div>
            <h1>Gallery</h1>
        </div>
            <div>
                <h2>Photo {currentPhotoIndex + 1} of {photos.length}</h2>
            </div>
            <div>
                <h3>{currentPhoto}</h3>
            </div>

            <div>
                <h4>Current Photo</h4>
            </div>
            <div>
                <Image src={currentPhoto as string} width={300} height={200} alt="Gallery" />
            </div>
            <div className='box-content w-auto h-auto'>
                <div className='flex space-x-5'>
                    <div>
                        <button className={"bg-sky-400 p-2 rounded-lg text-white"} onClick={handleNext}>Next</button>
                    </div>
                    <div>
                        <button className={"bg-sky-400 p-2 rounded-lg text-white"} onClick={handlePrevious}>Previous</button>
                    </div>
                </div>

            </div>



        </div>
    );

}
