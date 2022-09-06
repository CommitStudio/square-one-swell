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
  async getProducts(): Promise<Product[]> {
    const { results }: { results: SwellProduct[] } = await swell.get('/products', {
      active: true
    });

    return results.map((product) => ({
      name: product.name,
      enabled: product.active
    }));
  }
}
