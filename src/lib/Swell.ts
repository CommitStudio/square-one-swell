import { createClient } from 'swell-node';

/*****************************************************************************
 * Initialize Swell client
 ****************************************************************************/
const SWELL_STORE_ID = process.env.SWELL_STORE_ID as string;
const SWELL_SECRET_KEY = process.env.SWELL_SECRET_KEY as string;
const swell = createClient(SWELL_STORE_ID, SWELL_SECRET_KEY, {
  host: 'api-staging.swell.store',
  verifyCert: false
});

export default class Swell {
  /*****************************************************************************
   * Get products from Swell and transform into a list of Product objects
   ****************************************************************************/
  async getProducts(maxProducts = 10, minPrice = 0, maxPrice = 10000): Promise<Product[]> {
    const { results }: { results: SwellProduct[] } = await swell.get('/products', {
      active: true,
      limit: maxProducts,
      where: {
        price: { $gte: minPrice, $lte: maxPrice }
      }
    });

    const getImages = (product: SwellProduct) => {
      const imagesArray = product.images.map((image) => {
        return (
          {
            src: image.file.url,
            alt: product.name
          } || []
        );
      });
      return imagesArray;
    };

    return results.map((product) => ({
      id: product.id,
      name: product.name,
      active: product.active,
      description: product.description,
      slug: product.slug,
      price: product.price,
      sale: product.sale || null,
      sku: product.sku || null,
      images: getImages(product)
    }));
  }
}
