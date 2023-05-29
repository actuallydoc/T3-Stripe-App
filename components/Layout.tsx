import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from './Footer/Footer';
//Page for the layout of the app (navbar, footer, etc.)
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;