import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '@/app/globals.css'
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      
      <div
        className="py-10 bg-gray-200 relative min-h-screen"
        style={{
          backgroundImage: `url('/car-and-calculator.jpg')`, // Replace 'background.jpg' with the path to your image
          backgroundSize: 'cover',
          backgroundPosition: 'top center',

        }}
      >
        <div className="absolute inset-0 bg-gray-700 opacity-50"></div>
        <main className="relative z-10">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
