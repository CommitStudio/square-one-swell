import Image from 'next/image';

import { formatCurrency } from '~/utils/numbers';

type OrderProps = {
  order: Order;
};

export const ProductsDetails = ({ order }: OrderProps) => {
  return (
    <div>
      <h5 className="text-xl py-6 text-center">Products details</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6  mb-4 border rounded border-light">
        {order.items.map((item, i) => (
          <div key={i} className="flex flex-row">
            <div className="w-36 h-36 relative">
              <Image
                src={item.product.images[0].file.url}
                layout="fill"
                objectFit="cover"
                alt={`'Image order ${order.number}`}
              />
            </div>
            <div className="px-3 flex flex-col justify-between">
              <div>
                <p>{item.product.name}</p>
                {item.discount_each > 0 && (
                  <p className="text-sm text-gray-500">
                    Discount: {order.currency} {formatCurrency(item.discount_each)}{' '}
                  </p>
                )}
                <p>
                  Price: {order.currency} {formatCurrency(item.price)}{' '}
                </p>
              </div>
              <div>
                Size/Color/Material:
                <p>{item.variant.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
