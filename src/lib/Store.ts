import Swell from './Swell';

/*****************************************************************************
 * Wrapper class for given store client
 ****************************************************************************/
class Store {
  private storeClass;

  constructor() {
    this.storeClass = new Swell();
  }

  async getProducts(): Promise<Product[]> {
    return await this.storeClass.getProducts();
  }
}

export default new Store();
