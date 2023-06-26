import { createClient } from 'swell-node';

/*****************************************************************************
 * Initialize Swell client
 ****************************************************************************/
const SWELL_STORE_ID = process.env.SWELL_STORE_ID as string;
const SWELL_SECRET_KEY = process.env.SWELL_SECRET_KEY as string;

const swell = createClient(SWELL_STORE_ID, SWELL_SECRET_KEY);

class Store {
  /*****************************************************************************
   * Get products from Swell and transform into a list of Product objects
   ****************************************************************************/
  async getProducts(filterParams: FilterParams): Promise<GenericProductsList> {
    const { maxProducts, category, slug, page, sort, search } = filterParams;

    const limit = maxProducts || 6;

    const response: SwellProductResponse = await swell.get('/products', {
      active: true,
      category: category,
      limit,
      slug: slug,
      page: page || 1,
      expand: ['variants:*'],
      sort: sort,
      where: this.parseProductsFilter(filterParams),
      search: search
    });

    const { results } = response;

    const products = results.map((product) => this.tranformProduct(product));
    const pagination = this.makePagination(response, limit);

    return { products, pagination };
  }

  /*****************************************************************************
   * Get Product by Slug from Swell and convert to individual Product object
   ****************************************************************************/
  async getProduct(slug: string): Promise<Product | undefined> {
    const product: SwellProduct = await swell.get(`/products/${slug}`, {
      active: true,
      expand: ['variants:*']
    });
    return product ? this.tranformProduct(product) : undefined;
  }

  /*****************************************************************************
   * Get categories from Swell and convert to Category object
   ****************************************************************************/
  async getCategories(): Promise<Category[] | PromiseLike<Category[]>> {
    const { results }: { results: SwellCategory[] } = await swell.get('/categories', {
      where: { active: true }
    });

    return results.map((category) => ({
      id: category.id,
      name: category.name,
      images: this.transformImages(category),
      description: category.slug,
      active: category.active,
      slug: { category: category.slug },
      parent_id: category.parent_id
    }));
  }

  /*****************************************************************************
   * Get last created Promotion from Swell and convert to last promotion
   ****************************************************************************/
  async getNextPromotionToBeExpired(): Promise<Promotion | undefined> {
    const { results }: { results: Promotion[] } = await swell.get('/promotions', {
      where: {
        date_end: { $gte: new Date() }
      },
      sort: 'date_end asc',
      limit: 1
    });

    return (
      results[0] || {
        discounts: [{ buy_items: [{ product_id: '' }] }]
      }
    );
  }

  /*****************************************************************************
   * Definition of One Individual Product
   ****************************************************************************/
  tranformProduct(product: SwellProduct) {
    return <Product>{
      id: product.id,
      name: product.name,
      active: product.active,
      dateCreated: product.date_created,
      description: product.description,
      options: this.transformProductOptions(product),
      variants: this.transformProductVariants(product),
      slug: product.slug,
      price: product.price,
      sale: product.sale || null,
      salePrice: product.sale_price || null,
      sku: product.sku || null,
      images: this.transformImages(product),
      categories: product.category_index?.id,
      stock: product.stock_level
    };
  }

  /*****************************************************************************
   * Convert a list of images into a generic format list
   ****************************************************************************/
  transformImages = (item: SwellProduct | SwellCategory) => {
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
  transformProductOptions(product: SwellProduct) {
    return product.options.map((option) => ({
      label: option.name,
      active: option.active,
      values: option.values
    }));
  }

  /*****************************************************************************
   * Convert SwellProduct variants to a Product variants format
   ****************************************************************************/
  transformProductVariants(product: SwellProduct) {
    return product.variants?.results?.map((variant) => ({
      name: variant.name,
      active: variant.active,
      value_ids: variant.option_value_ids
    }));
  }

  /*****************************************************************************
   * Parse a list of filters parameters expected Swell where format
   ****************************************************************************/
  parseProductsFilter(filterParams: FilterParams): SwellProductWhere {
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
  }

  /*****************************************************************************
   * Make a generic pagination object
   ****************************************************************************/
  makePagination(response: SwellProductResponse, limit: number): Pagination {
    const { count, pages, page } = response;

    return {
      total: count,
      pages: pages ? Object.keys(pages).map(Number) : [],
      current: page,
      limit
    };
  }
}

export default new Store();
