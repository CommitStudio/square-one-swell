import { formatCurrency } from '~/utils/numbers';

type OrderProps = {
  order: Order;
};

export const CostDetails = ({ order }: OrderProps) => {
  return (
    <div className="py-6 flex flex-row justify-between">
      <div className="">
        <p className="pb-3">Sub-Total</p>
        <p className="">Shipping</p>
        <p className="">Taxes</p>
        <p className="pt-3 font-bold">Grand Total</p>
      </div>
      <div className="text-end">
        <p className="pb-3">
          {order.currency} {formatCurrency(order.sub_total || 0)}
        </p>
        <p className="">
          {order.currency} {formatCurrency(order.shipment_price || 0)}
        </p>
        <p className="">
          {order.currency} {formatCurrency(order.tax_total || 0)}
        </p>
        <p className="pt-3 font-bold">
          {order.currency} {formatCurrency(order.grand_total || 0)}
        </p>
      </div>
    </div>
  );
};
