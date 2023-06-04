import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from './Footer/Footer';
import CartModal from './LogoBar/CartModal/CartModal';
import { useDispatch } from 'react-redux';
import { shoppingCartSlice } from 'stores/shoppingCartStore';
import { Toaster } from 'react-hot-toast';
import LogoBar from './LogoBar/LogoBar';
import ShippingBar from './ShippingBar/ShippingBar';
import type { CartItem } from 'types';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const [openCart, setOpenCart] = React.useState(false);
    useEffect(() => {
        const fetchCart = () => {
            const items = localStorage.getItem("storeCart");
            if (items) {
                const itemsParsed = JSON.parse(items) as CartItem[];
                dispatch(shoppingCartSlice.actions.initializeCart(itemsParsed));
            } else {
                dispatch(shoppingCartSlice.actions.initializeCart([]));
                localStorage.setItem("storeCart", JSON.stringify([]));
            }
        };
        fetchCart();
    }, [dispatch]);
    return (
        <div className='relative'>
            <ShippingBar />
            <LogoBar setOpenCart={setOpenCart} />
            <Navbar />
            {openCart && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <CartModal setShowModal={setOpenCart} />
                </div>
            )}
            {children}
            <Footer />
            <Toaster />
        </div>
    );
};

export default Layout;