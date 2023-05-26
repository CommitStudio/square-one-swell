import { Metadata } from 'next';

import Link from 'next/link';

import ProductSection from '~/components/product-detail/ProductSection';
import RelatedProducts from '~/components/product-detail/RelatedProducts';
import keywords from '~/data/keywords.json';
import Container from '~/layouts/Container';
import Store from '~/lib/Store';

interface Params {
  product: string;
}

const getData = async (params: Params) => {
  const slug = params?.product;
  const product = await Store.getProduct(slug);

  if (!product) {
    return { notFound: true };
  }
  const categories = await Store.getCategories();

  const { products: sameCategoryProducts } = await Store.getProducts({
    maxProducts: 4,
    category: product?.categories?.[0]
  });
  return { product, sameCategoryProducts, categories };
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product } = await getData(params);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL + '/product-detail/' + params.product),
    title: product?.name ? `Square One - ${product?.name}` : 'Square One',
    description: product?.description ? product?.description : 'Square One - Product Detail',
    keywords: keywords.product_detail
  };
}

interface ProductProp {
  product: Product;
  sameCategoryProducts: Product[];
  categories: Category[];
}

const ProductDetail = async ({ params }: { params: Params }) => {
  const { product, sameCategoryProducts, categories } = (await getData(params)) as ProductProp;

  return (
    <>
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
    </>
  );
};

export default ProductDetail;
