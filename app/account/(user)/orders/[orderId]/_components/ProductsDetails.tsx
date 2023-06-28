import Image from 'next/image';

import { formatCurrency } from '~/_utils/numbers';

export const ProductsDetails = ({ order }: { order: SwellAPI_Order }) => {
  return (
    <div>
      <h5 className="text-xl py-6 text-center font-libre">Products details</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6  mb-4 border rounded border-light">
        {order.items.map((item, i) => (
          <div key={i} className="flex flex-row text-sm">
            <div className="w-36 h-36 relative">
              <Image
                src={item.product?.images[0].file.url}
                fill
                style={{ objectFit: 'cover' }}
                alt={`'Image order ${order.number}`}
              />
            </div>
            <div className="px-3 flex flex-col justify-between">
              <div>
                <p>{item.product?.name}</p>
                {item.discountEach > 0 && (
                  <p className="text-sm">
                    Discount: {order.currency} {formatCurrency(item.discountEach)}{' '}
                  </p>
                )}
                <p>
                  Price: {order.currency} {formatCurrency(item.price)}{' '}
                </p>
                <p>Item quantity: {item.quantity}</p>
              </div>
              {item.variant?.name && (
                <div>
                  Size/Color/Material:
                  <p>{item.variant?.name}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
