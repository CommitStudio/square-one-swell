'use client';

import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

import { useViewportWidth } from '~/_hooks/useWindowHooks';

interface ProductProp {
  product: Product;
}

const ProductImageGallery = ({ product }: ProductProp) => {
  const viewportWidth = useViewportWidth();
  const isMobile = viewportWidth <= 768;

  const images: {
    original: string;
    thumbnail: string;
    originalAlt: string;
    thumbnailAlt: string;
  }[] = [];

  product.images?.forEach((product) => {
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
        showThumbnails={isMobile ? false : true}
        items={images}
        thumbnailPosition={isMobile ? 'bottom' : 'left'}
        showPlayButton={false}
        showNav={false}
        showBullets={isMobile ? true : false}
        isRTL={false}
        useTranslate3D={false}
        useBrowserFullscreen={true}
        showFullscreenButton={true}
      />
    </div>
  );
};

export default ProductImageGallery;
