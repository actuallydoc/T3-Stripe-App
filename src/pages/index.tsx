import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { Toaster } from "react-hot-toast";
import HomePage from "components/Index/HomePage";
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
const GalleryPhotos: ReactImageGalleryItem = [{
  original: "https://m.media-amazon.com/images/I/61HWKZzJoyL._AC_UF894,1000_QL80_.jpg",
  thumbnail: "https://m.media-amazon.com/images/I/61HWKZzJoyL._AC_UF894,1000_QL80_.jpg",
  thumbnailHeight: 100,
  thumbnailWidth: 100,
},

{
  original: "https://m.media-amazon.com/images/I/61LzEJotT0L._AC_SX522_.jpg",
  thumbnail: "https://m.media-amazon.com/images/I/61LzEJotT0L._AC_SX522_.jpg",
  thumbnailHeight: 100,
  thumbnailWidth: 100,

},
{

  original: "https://m.media-amazon.com/images/I/61HWKZzJoyL._AC_UF894,1000_QL80_.jpg",
  thumbnail: "https://m.media-amazon.com/images/I/61HWKZzJoyL._AC_UF894,1000_QL80_.jpg",
  thumbnailHeight: 100,
  thumbnailWidth: 100,
},
{
  original: "https://m.media-amazon.com/images/I/61LzEJotT0L._AC_SX522_.jpg",
  thumbnail: "https://m.media-amazon.com/images/I/61LzEJotT0L._AC_SX522_.jpg",
  thumbnailHeight: 600,
  thumbnailWidth: 100
}
];
const Home: NextPage = () => {
  //!TODO Fetch the gallery photos from the API
  return (
    <>
      <Head>
        <title>Shop with T3 stack and Stripe</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-sky-400 rounded-lg mt-3 content-center text-center justify-center">
            <div>
              <h1 className="text-4xl font-bold text-white text-center p-3">Shop with T3 stack and Stripe</h1>
            </div>
          </div>
          <div className="gallery-container">
            {/* Replace this image gallery with something else its broken if the images are different sizes */}
            {/* <ImageGallery items={GalleryPhotos} showPlayButton={false} autoPlay={true} showFullscreenButton={false} /> */}
          </div>
          <HomePage />
          <Toaster />
        </div>
      </main>
    </>
  );
};

export default Home;
