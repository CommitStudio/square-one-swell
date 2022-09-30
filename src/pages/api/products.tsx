import type { NextApiRequest, NextApiResponse } from 'next';

import Store from '~/lib/Store';

const handler = async (req: NextApiRequest, res: NextApiResponse, filterParams: FilterParams) => {
  if (!filterParams) {
    filterParams = {};
  }
  const products = await Store.getProducts(filterParams);
  res.status(200).json(products);
};

export default handler;
