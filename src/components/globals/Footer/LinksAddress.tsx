import React from 'react';

const LinksAddress = () => {
  return (
    <div className="p-10 flex justify-around">
      <div className="space-y-3">
        <p className="hover:text-primary hover:cursor-pointer">About us</p>
        <p className="hover:text-primary hover:cursor-pointer">Online store</p>
        <p className="hover:text-primary hover:cursor-pointer">Blog</p>
        <p className="hover:text-primary hover:cursor-pointer">Contact Us</p>
      </div>
      <div className="space-y-3">
        <p className="hover:text-primary hover:cursor-pointer">Login/ Register</p>
        <p className="hover:text-primary hover:cursor-pointer">Your Cart</p>
        <p className="hover:text-primary hover:cursor-pointer">Wishlist items</p>
        <p className="hover:text-primary hover:cursor-pointer">Your checkout</p>
      </div>
      <div className="space-y-3">
        <p className="hover:text-primary hover:cursor-pointer">FAQs</p>
        <p className="hover:text-primary hover:cursor-pointer">Terms of service</p>
        <p className="hover:text-primary hover:cursor-pointer">Privacy policy</p>
        <p className="hover:text-primary hover:cursor-pointer">Returns</p>
      </div>
      <div className="space-y-3">
        <p className="text-2xl text-primary">STORE FRONT</p>
        <p className="flex flex-col space-y-2">
          <span className="text-lg font-bold">Montevideo, Uruguay</span>
          <span>Blvr. Artigas 1182 +598 2706 5597</span>
        </p>
      </div>
    </div>
  );
};

export default LinksAddress;
