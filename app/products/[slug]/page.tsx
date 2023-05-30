import Link from 'next/link';
import { notFound } from 'next/navigation';

import ProductSection from './_components/ProductSection';
import RelatedProducts from './_components/RelatedProducts';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

import Store from '~/_lib/Store';

interface ProductProp {
  product: Product;
  sameCategoryProducts: Product[];
  categories: Category[];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { product } = await getData(params.slug);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL + '/products/' + params.slug),
    title: product?.name ? `Square One - ${product?.name}` : 'Square One',
    description: product?.description ? product?.description : 'Square One - Product Detail',
    keywords: keywords.product_detail
  };
}

const getData = async (slug: string) => {
  const product = await Store.getProduct(slug);

  if (!product) {
    return { product: null };
  }

  const categories = await Store.getCategories();

  const { products: sameCategoryProducts } = await Store.getProducts({
    maxProducts: 4,
    category: product?.categories?.[0]
  });

  return { product, sameCategoryProducts, categories };
};

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const { product, sameCategoryProducts, categories } = (await getData(params.slug)) as ProductProp;

  if (!product) {
    notFound();
  }

  return (
    <Container className="pt-8">
      <Link
        href="/products"
        className="font-quicksand inline-flex items-center gap-2 mb-8 hover:underline"
      >
        <svg
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L1 9L9 17" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Product list
      </Link>

      <hr className="bg-gray h-px border-none" />

      <ProductSection product={product} categories={categories} />

      <RelatedProducts
        title={'Related Products'}
        product={product}
        products={sameCategoryProducts}
      />
    </Container>
  );
};

export default ProductDetail;
