import {
    useStripe,
} from '@stripe/react-stripe-js';
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "@/utils/api";
import CheckoutButton from "components/Stripe/CheckoutButton";
const AuthPage: React.FC = () => {

    //Get the stripe promise from the stripe context provider which gives you alot of features
    const stripePromise = useStripe();

    //NextAuth session context provider
    const { data: sessionData } = useSession();
    //Create a checkout sessioon tRPC mutation procedure which calls the backend and redirects the user to the checkout stripe page
    const checkOut = api.payment.createCheckout.useMutation();
    const { data: secretMessage } = api.example.getSecretMessage.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    );
    //Makes the checkout session mutation procedure and redirects the user to the checkout page 
    const handleCheckout = async () => {
        const response = await checkOut.mutateAsync();
        const stripe = stripePromise;
        //Redirects the user to the checkout page if the checkout session provider exist's and is not null
        //This is stripe magic
        if (stripe !== null) {
            await stripe.redirectToCheckout({
                sessionId: response.id,
            })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                {secretMessage && <span> - {secretMessage}</span>}
            </p>
            <div>
                {sessionData ? <CheckoutButton handleCheckout={handleCheckout} /> : <h1 className="text-white text-2xl font-semibold bg-white/10 animate-pulse duration-100 px-10 py-2 rounded-full">Sign in to pay with Stripe!</h1>}
            </div>

            <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
                {sessionData ? "Sign out" : "Sign in with NextAuth"}
            </button>


        </div >
    );
};

export default AuthPage;