import type { NextApiRequest, NextApiResponse } from 'next';

import Store from '~/lib/Store';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  maxProducts: number,
  minPrice: number,
  maxPrice: number
) => {
  const products = await Store.getProducts(minPrice, maxPrice, maxProducts);
  res.status(200).json(products);
};

export default handler;
