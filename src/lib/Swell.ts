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
  async getProducts(filterParams: FilterParams): Promise<Product[]> {
    // Destructuring filterParams incoming from query string
    const { minPrice, maxPrice, maxProducts } = filterParams;
    // Fetch filtered products from Swell
    const { results }: { results: SwellProduct[] } = await swell.get('/products', {
      active: true,
      limit: maxProducts,
      where: {
        price:
          maxPrice && (minPrice || minPrice == 0) ? { $gte: minPrice, $lte: maxPrice } : { $gte: 0 }
      }
    });
    // Transform SwellProduct data to Product standard data format
    return results.map((product) => ({
      id: product.id,
      name: product.name,
      active: product.active,
      description: product.description,
      slug: product.slug,
      price: product.price,
      sale: product.sale || null,
      sku: product.sku || null,
      images: this.parseProductImages(product)
    }));
  }

  // Convert SwellProduct images to a Product images format
  parseProductImages = (product: SwellProduct) => {
    const imagesArray = product.images.map((image) => {
      return {
        src: image.file.url,
        alt: product.name
      };
    });
    return imagesArray;
  };
}
