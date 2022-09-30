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

  async getProducts(filterParams: FilterParams): Promise<GenericProductResult> {
    return await this.storeClass.getProducts(filterParams);
  }

  async getCategories(): Promise<Category[]> {
    return await this.storeClass.getCategories();
  }
}

export default new Store();
