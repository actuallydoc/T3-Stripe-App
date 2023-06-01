import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from './Footer/Footer';
import CartModal from './Navbar/CartModal/CartModal';
import { useDispatch, useSelector } from 'react-redux';
import Stripe from 'stripe';
import { type RootState, shoppingCartSlice } from 'stores/shoppingCartStore';
import type CustomProduct from 'types';
//Page for the layout of the app (navbar, footer, etc.)
const Layout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const cartSelector = useSelector((state: RootState) => state.items)
    const [openCart, setOpenCart] = React.useState(false);
    useEffect(() => {
        const fetchCart = () => {
            const items = localStorage.getItem("storeCart");
            if (items) {
                console.log("items");
                const itemsParsed = JSON.parse(items) as CustomProduct[];
                dispatch(shoppingCartSlice.actions.initializeCart(itemsParsed));
            } else {
                console.log("no items");
            }
        };

        fetchCart();

    }, [dispatch]);
    return (
        <div className='relative'>
            <Navbar setOpenCart={setOpenCart} />
            {openCart && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <CartModal setShowModal={setOpenCart} />
                </div>
            )}
            {children}
            <Footer />
        </div>
    );
};

export default Layout;