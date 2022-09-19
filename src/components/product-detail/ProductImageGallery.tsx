// import { useState } from 'react';
import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

interface ProductProp {
  product: [Product];
}

const ProductImageGallery = ({ product }: ProductProp) => {
  const images: {
    original: string;
    thumbnail: string;
    originalAlt: string;
    thumbnailAlt: string;
  }[] = [];

  product[0].images?.forEach((product) => {
    return images.push({
      original: `${product.src}`,
      thumbnail: `${product.src}`,
      originalAlt: `${product.alt}`,
      thumbnailAlt: `${product.alt}`
    });
  });

  return (
    <div id="product-gallery" className="h-full w-full">
      <ImageGallery
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showNav={false}
        isRTL={false}
        useTranslate3D={false}
        useBrowserFullscreen={true}
        showFullscreenButton={true}
      />
    </div>
  );
};

export default ProductImageGallery;
