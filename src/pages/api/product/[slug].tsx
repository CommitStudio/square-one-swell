import type { NextApiRequest, NextApiResponse } from 'next';

import Store from '~/lib/Store';

export const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  const product = await Store.getProductBySlug(slug);

  res.status(200).json(product);
};

export default getProductBySlug;
