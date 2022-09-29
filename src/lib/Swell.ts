import { createClient } from 'swell-node';

/*****************************************************************************
 * Initialize Swell client
 ****************************************************************************/
const SWELL_STORE_ID = process.env.SWELL_STORE_ID as string;
const SWELL_SECRET_KEY = process.env.SWELL_SECRET_KEY as string;
const swell = createClient(SWELL_STORE_ID, SWELL_SECRET_KEY);

export default class Swell {
  /*****************************************************************************
   * Get products from Swell and transform into a list of Product objects
   ****************************************************************************/
  async getProducts(filterParams: FilterParams): Promise<Product[]> {
    const { maxProducts, category, slug } = filterParams;

    // Fetch filtered products from Swell
    const { results }: { results: SwellProduct[] } = await swell.get('/products', {
      active: true,
      category: category,
      limit: maxProducts,
      slug: slug,
      expand: ['variants:*'],
      where: this.parseProductsFilter(filterParams)
    });

    // Transform SwellProduct data to Product standard data format
    return results.map((product) => ({
      id: product.id,
      name: product.name,
      active: product.active,
      description: product.description,
      options: this.parseProductOptions(product),
      variants: this.parseVariants(product),
      slug: product.slug,
      price: product.price,
      sale: product.sale || null,
      salePrice: product.sale_price || null,
      sku: product.sku || null,
      images: this.parseImages(product),
      categories: product.category_index.id
    }));
  }

  /*****************************************************************************
   * Convert Swell images list to a generic format
   ****************************************************************************/
  parseImages = (item: SwellProduct | SwellCategory) => {
    if (item.images) {
      return item.images.map((image) => ({
        src: image.file.url,
        alt: item.name
      }));
    }

    return [{ src: '/img/default-images/image-not-found.webp', alt: 'No image available' }];
  };

  /*****************************************************************************
   * Convert Swell product options to generic format
   ****************************************************************************/
  parseProductOptions = (product: SwellProduct) => {
    return product.options.map((option) => ({
      label: option.name,
      active: option.active,
      values: option.values.map((value) => value.name)
    }));
  };

  /*****************************************************************************
   * Convert SwellProduct variants to a Product variants format
   ****************************************************************************/
  parseVariants = (item: SwellProduct) => {
    return item.variants.results.map((variant) => ({
      name: variant.name,
      active: variant.active
    }));
  };

  /*****************************************************************************
   * Parse a list of filters parameters expected Swell where format
   ****************************************************************************/
  parseProductsFilter = (filterParams: FilterParams): SwellProductWhere => {
    const { minPrice, maxPrice } = filterParams;

    const where: SwellProductWhere = {};

    // Add price filter
    if (minPrice || maxPrice) {
      where['price'] = {
        $gte: minPrice || undefined,
        $lte: maxPrice || undefined
      };
    }

    return where;
  };

  /*****************************************************************************
   * Get categories from Swell and convert to Category object
   ****************************************************************************/
  async getCategories(): Promise<Category[] | PromiseLike<Category[]>> {
    const { results }: { results: SwellCategory[] } = await swell.get('/categories', {
      where: {
        active: true
      }
    });

    return results.map((category) => ({
      id: category.id,
      name: category.name,
      images: this.parseImages(category),
      description: category.slug, // TODO: cambiar una vez que agreguemos description de la category
      active: category.active,
      slug: { category: category.slug }
    }));
  }
}
