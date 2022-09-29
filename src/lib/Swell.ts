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
    // Destructuring filterParams incoming from query string
    const { maxProducts, category, slug } = filterParams;
    // Fetch filtered products from Swell
    const { results }: { results: SwellProduct[] } = await swell.get('/products', {
      active: true,
      limit: maxProducts,
      slug: slug,
      expand: ['variants:*'],
      category: category,
      where: this.filteringWhere(filterParams)
    });
    // Transform SwellProduct data to Product standard data format
    return results.map((product) => ({
      id: product.id,
      name: product.name,
      active: product.active,
      description: product.description,
      options: this.parseOptions(product),
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

  // Convert SwellProduct images to a Product images format
  parseImages = (item: SwellProduct | SwellCategory) => {
    if (item.images) {
      const imagesArray = item.images.map((image) => {
        return {
          src: image.file.url,
          alt: item.name
        };
      });
      return imagesArray;
    }
    return [{ src: '/img/default-images/image-not-found.webp', alt: 'Category without image' }];
  };

  // Convert SwellProduct options to a Product options format
  parseOptions = (item: SwellProduct) => {
    const options = item.options.map((option) => {
      return {
        label: option.name,
        active: option.active,
        values: option.values.map((value) => {
          return value.name;
        })
      };
    });
    return options;
  };

  // Convert SwellProduct variants to a Product variants format
  parseVariants = (item: SwellProduct) => {
    return item.variants.results.map((variant) => ({
      name: variant.name,
      active: variant.active
    }));
  };

  // Filtering logic (where: {})) for fetching products from Swell
  filteringWhere = (filterParams: FilterParams) => {
    const { minPrice, maxPrice } = filterParams;
    // Filtering between a min price and a max price
    if ((minPrice || minPrice === 0) && maxPrice) {
      return { price: { $gte: minPrice, $lte: maxPrice } };
    } else if (minPrice) {
      return { price: { $gte: minPrice } };
    }
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
    // Transform SwellCategory data to Category standard data format
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
