import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  postReviewAction,
  getReviewsAction,
  deleteReviewAction,
  editReviewAction
} from '../_actions/reviews';

import ProductSection from './_components/ProductSection';
import RelatedProducts from './_components/RelatedProducts';

import Reviews from './_components/Reviews';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';
import Store from '~/_lib/Store';
import { getLoggedUser } from '~/_lib/SwellAPI';

interface ProductProp {
  product: Product;
  sameCategoryProducts: Product[];
  categories: Category[];
  userId: string;
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

  // const { userId } = await getUserInfo();

  const user: SwellAPI_Customer | null = await getLoggedUser();

  const userId: string | null = user?.session?.accountId || null;

  return { product, sameCategoryProducts, categories, userId };
};

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const { product, sameCategoryProducts, categories, userId } = (await getData(
    params.slug
  )) as ProductProp;

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

      <Reviews
        getReviewsAction={getReviewsAction}
        postReviewAction={postReviewAction}
        deleteReviewAction={deleteReviewAction}
        editReviewAction={editReviewAction}
        userId={userId}
        productId={product.id}
      />

      <RelatedProducts
        title={'Related Products'}
        product={product}
        products={sameCategoryProducts}
      />
    </Container>
  );
};

export default ProductDetail;
