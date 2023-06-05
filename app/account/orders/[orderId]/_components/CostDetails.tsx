import { formatCurrency } from '~/_utils/numbers';

export const CostDetails = ({ order }: { order: SwellAPI_Order }) => {
  return (
    <div className="py-6 flex flex-row justify-between">
      <div>
        <p className="pb-3">Sub-Total</p>
        <p>Shipping</p>
        <p>Taxes</p>
        <p className="pt-3 font-bold">Total</p>
      </div>
      <div className="text-end">
        <p className="pb-3">
          {order.currency} {formatCurrency(order.subTotal || 0)}
        </p>
        <p>
          {order.currency} {formatCurrency(order.shipmentPrice || 0)}
        </p>
        <p>
          {order.currency} {formatCurrency(order.taxTotal || 0)}
        </p>
        <p className="pt-3 font-bold">
          {order.currency} {formatCurrency(order.grandTotal || 0)}
        </p>
      </div>
    </div>
  );
};
