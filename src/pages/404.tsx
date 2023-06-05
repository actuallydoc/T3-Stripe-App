import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';


// TODO: Make a custom 404 page with a nice design
export default function Custom404() {
    const router = useRouter();
    //Just instantly redirect the user to the home page
    useEffect(() => {
        toast.error("Page not found");
        setTimeout(() => {
            router.push("/").catch((err) => {
                console.log(err);
            });
        }
            , 4000);

    }, [router]);
    return (
        <div>404
            <Toaster />
        </div>
    )
}
