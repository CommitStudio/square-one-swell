import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

import data from '~/data/products.json';

const ProductImageGallery = () => {
  const { products } = data;

  const images: {
    original: string;
    thumbnail: string;
    originalAlt: string;
    thumbnailAlt: string;
  }[] = [];

  products.slice(0, 5).forEach((product) => {
    return images.push({
      original: `${product.image.src}`,
      thumbnail: `${product.image.src}`,
      originalAlt: `${product.image.alt}`,
      thumbnailAlt: `${product.image.alt}`
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
      />
    </div>
  );
};

export default ProductImageGallery;
