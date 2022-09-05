import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

import data from '~/data/products.json';
import Container from '~/layouts/Container';

const ProductImageGallery = () => {
  const { products } = data;

  const images: { original: string; thumbnail: string }[] = [];

  products.slice(0, 5).forEach((product) => {
    return images.push({
      original: `${product.image.src}`,
      thumbnail: `${product.image.src}`
    });
  });

  // const images = [
  //   {
  //     original: 'https://picsum.photos/id/1018/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/'
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/'
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/'
  //   }
  // ];

  return (
    <ImageGallery items={images} thumbnailPosition="left" showPlayButton={false} showNav={false} />
  );
};

export default ProductImageGallery;
