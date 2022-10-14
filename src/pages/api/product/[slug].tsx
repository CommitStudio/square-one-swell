import type { NextApiRequest, NextApiResponse } from 'next';

import Store from '~/lib/Store';

export const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  const product = await Store.getProduct(slug);

  res.status(200).json(product);
};

export default getProduct;
