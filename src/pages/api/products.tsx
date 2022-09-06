import type { NextApiRequest, NextApiResponse } from 'next';

import Store from '~/lib/Store';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await Store.getProducts();
  res.status(200).json(products);
};

export default handler;
