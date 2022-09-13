import Swell from './Swell';

/*****************************************************************************
 * Wrapper class for given store client
 ****************************************************************************/
class Store {
  private storeClass;

  constructor() {
    const defaultStore = process.env.DEFAULT_STORE as string;

    if (defaultStore === 'swell') {
      this.storeClass = new Swell();
    } else {
      throw new Error('Store not found');
    }
  }

  async getProducts(maxProducts = 10): Promise<Product[]> {
    return await this.storeClass.getProducts(maxProducts);
  }
}

export default new Store();
