import React from 'react';

import ProductList from '~/components/ProductList';
import { Footer } from '~/components/globals/Footer';

import Navbar from '~/components/globals/navbar/Navbar';

const index = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
        <Navbar />
        {/* TODO eliminar div cuando agreguemos contenido */}
        <ProductList />
        <div className="min-h-[500px]"></div>
      </div>
      <Footer />
    </>
  );
};

export default index;
