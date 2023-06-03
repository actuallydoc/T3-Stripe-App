import React, { useEffect } from 'react'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { toast } from 'react-hot-toast';
export default function Success() {

    const router = useRouter();
    //Get the session_id from the url parameter https://localhost:3000/success?session_id=cs_test_a1b2c3d4e5f6g7h8i9j0k1l2
    const sessionId = useRouter().query.session_id as string;
    //Get the session data from the api
    const session = api.payment.getStripeSession.useQuery({
        sessionId: sessionId
    },
        {
            enabled: router.isReady
        }
    );
    useEffect(() => {
        //After the session is created and payment is done redirect the user to the order page with the order data 
        if (session.data?.email) {
            toast.success("Payment successful");
            setTimeout(() => {
                //Redirect the user to the order page with the order data
                router.push(`/order/${sessionId}}`).catch((err) => {
                    toast.error(err as string);
                });
            }, 3000);
        }
    }, [session, router]);

    return (
        <>
            <Head>
                <title>Success</title>
                <meta name="description" content="Success" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        Payment successful
                    </h1>
                </div>
            </main>
        </>
    )
}
