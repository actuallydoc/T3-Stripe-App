import {
    useStripe,
} from '@stripe/react-stripe-js';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react"
import { api } from "@/utils/api";
import CheckoutButton from "components/Stripe/CheckoutButton";
import Cart from 'components/Cart/Cart';
import type Stripe from 'stripe';
import Image from 'next/image';
import ProductCard from 'components/Products/ProductCard';
import { Toaster, toast } from 'react-hot-toast';


const AuthPage: React.FC = () => {

    const [cartItems, setCartItems] = useState<Stripe.Product[]>({} as Stripe.Product[]);

    //Get the stripe promise from the stripe context provider which gives you alot of features
    const stripePromise = useStripe();
    //NextAuth session context provider
    const { data: sessionData } = useSession();
    const { data: productsData } = api.products.getAll.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    )
        ;
    //Create a checkout sessioon tRPC mutation procedure which calls the backend and redirects the user to the checkout stripe page
    const checkOut = api.payment.createCheckout.useMutation();
    const { data: secretMessage } = api.example.getSecretMessage.useQuery(

    );
    //Makes the checkout session mutation procedure and redirects the user to the checkout page 
    const handleCheckout = async () => {
        // Quantity state is passed to the backend
        // Product id is passed to the backend
        if (Object.keys(cartItems).length === 0) {
            toast.error("Shopping Cart is empty");
            return;
        }
        toast.success("Redirecting to checkout page");
        const response = await checkOut.mutateAsync({
            //Because the product type does not have a quantity property it is added here and the error appears
            products: cartItems,
            email: sessionData?.user?.email as string,
        });
        const stripe = stripePromise;
        //Redirects the user to the checkout page if the checkout session provider exist's and is not null
        //This is stripe magic
        if (stripe !== null) {
            await stripe.redirectToCheckout({
                sessionId: response.id,
            })
        }
    }
    const handleAddToCart = (default_price: string) => {


        //If the item is exists in the cart then add one to the quantity
        const item = productsData?.products.find((item) => item.default_price === default_price);
        //Find the item in the products available if the item is available then add it to the cart       
        if (item) {
            if (Object.keys(cartItems).length === 0) {
                console.log("Cart is empty");
                setCartItems((prevState) => {
                    return [{ ...[prevState ?? []], quantity: 1, ...item }]
                });
                toast.success("Item added to cart");


            } else {
                const itemExists = cartItems?.find((cartItem) => cartItem.id === item.id);
                if (itemExists) {
                    //!TODO The quantity is artificially created the "Product" type does not have a quantity property so it is added here idk how to fix the screaming error
                    setCartItems((prev) => prev.map((cartItem) => {
                        if (cartItem.id === item.id) {
                            return {
                                //Custom quantity property added to the product type
                                quantity: cartItem?.quantity + 1,
                                ...cartItem
                            }
                        }
                        return cartItem;
                    }))
                    toast.success("Item added to cart");

                } else {
                    //If the item does not exist in the cart then add it to the cart
                    setCartItems((prev) => [...prev, { ...item, quantity: 1, default_price: item.default_price as string, id: item.id, description: item.description as string, name: item.name }]);
                    toast.success("Item added to cart");

                }
            }
        }
    }
    return (
        <div className='flex'>
            <div>
                <Cart cartItems={cartItems} />
            </div>

            <div className="flex flex-col  items-center justwify-center gap-4">
                <div className='flex'>
                    <div className='flex-col  space-y-4'>
                        <div className=''>
                            <p className="text-center text-2xl ">
                                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                                {secretMessage && <span> - {secretMessage}</span>}
                            </p>
                        </div>
                        <div className='w-64 space-y-5'>
                            <div>
                                {/* Button for checking out
                              {sessionData ? <CheckoutButton handleCheckout={handleCheckout} /> : <h1 className="text-slate-200 text-2xl font-semibold bg-sky-400 animate-pulse duration-100 px-10 py-2 rounded-full">Sign in to pay with Stripe!</h1>}
                            
                             */}
                            </div>

                        </div>

                    </div>
                </div>
                <div>
                    <div>
                        <h1 className="text-black text-2xl font-semibold bg-white/10 px-10 py-2 rounded-full">Products</h1>
                    </div>
                </div>
                <div className='grid grid-cols-4 space-x-5 row-span-2  '>
                    {productsData?.products.map((item, index) => (
                        <div key={index} className='bg-white max-w-3xl max-h-3xl hover:scale-105 duration-300 box-content w-64 h-64'>
                            <ProductCard key={index} item={item} handleAddToCart={handleAddToCart} />
                        </div>

                    ))}
                </div>
            </div>
        </div >
    );
};

export default AuthPage;