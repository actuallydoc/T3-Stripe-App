import {
    useStripe,
} from '@stripe/react-stripe-js';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react"
import { api } from "@/utils/api";
import CheckoutButton from "components/Stripe/CheckoutButton";
import Cart from 'components/Cart/Cart';
import type Stripe from 'stripe';


const AuthPage: React.FC = () => {

    //Quantity state
    const [quantity, setQuantity] = useState(1);
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
        const response = await checkOut.mutateAsync({
            //Because the product type does not have a quantity property it is added here and the error appears
            products: cartItems,
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
                return setCartItems((prevState) => {
                    return [{ ...[prevState ?? []], quantity: 1, ...item }]
                }
                );
            }
            const itemExists = cartItems?.find((cartItem) => cartItem.id === item.id);
            console.log(item);
            if (itemExists) {
                //!TODO The quantity is artificially created the "Product" type does not have a quantity property so it is added here idk how to fix the screaming error
                setCartItems((prev) => prev.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            //Custom quantity property added to the product type
                            quantity: cartItem?.quantity + 1,
                        }
                    }
                    return cartItem;
                }))
            } else {
                //If the item does not exist in the cart then add it to the cart
                setCartItems((prev) => [...prev, { ...item, quantity: 1, default_price: item.default_price as string, id: item.id, description: item.description as string, name: item.name }]);
            }
        }
        else {

        }
    }
    return (
        <div>
            <div>
                <Cart cartItems={cartItems} />
            </div>

            <div className="flex flex-col items-center justwify-center gap-4">
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
                <div>
                    <h1 className="text-white text-2xl font-semibold bg-white/10 px-10 py-2 rounded-full">Products</h1>

                </div>

                <div className='grid grid-cols-3 space-x-10'>
                    {productsData?.products.map((item, index) => (
                        <div key={index} className='box-content w-64 h-64 hover:translate-x-2 duration-500 cursor-pointer'>
                            <div key={index} className='flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-lg'>
                                <h1 className='text-xl font-bold text-gray-900'>{item.name}</h1>
                                <p className='mt-2 text-sm text-gray-600'>{item.description}</p>
                                <p className='mt-2 text-sm text-gray-600'>Quantity: {quantity}</p>
                                <p className='mt-2 text-sm text-gray-600'>Price: 10$</p>
                                <div className='flex space-x-28'>
                                    <div className=' px-3 py-2 rounded-full'>
                                        {/* Quantity broken */}
                                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <div>
                                        <button onClick={() => setQuantity(quantity - 1)}>-</button>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        handleAddToCart(item.default_price as string);
                                    }} className='mt-4 bg-sky-500 px-3 py-2 rounded-full'>Add to cart</button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default AuthPage;