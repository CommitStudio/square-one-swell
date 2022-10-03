import type { NextApiRequest, NextApiResponse } from 'next';

import Store from '~/lib/Store';

export const getProductById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };
  const product = await Store.getProductById(id);
  res.status(200).json(product);
  //how to send a satus or response or error if doesnt found
};

export default getProductById;
