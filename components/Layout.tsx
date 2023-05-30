import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from './Footer/Footer';
import CartModal from './Navbar/CartModal/CartModal';
//Page for the layout of the app (navbar, footer, etc.)
const Layout = ({ children }: { children: React.ReactNode }) => {
    const [openCart, setOpenCart] = React.useState(false);
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