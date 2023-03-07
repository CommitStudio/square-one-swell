import { formatCurrency } from '~/utils/numbers';

type OrderProps = {
  order: Order;
};

export const DeliveryDetails = ({ order }: OrderProps) => {
  return (
    <>
      <h5 className="text-xl py-6 text-center">Delivery details</h5>
      <div className="px-24 ">
        <div className="pb-4">
          Method:{' '}
          <span>
            {order.shipping.service_name} ({order.currency}{' '}
            {formatCurrency(order.shipment_price || 0)})
          </span>
        </div>
        <div className="pb-4">Address:</div>
        <div> {order.shipping.address1}</div>
        <div>{order.shipping.address2}</div>
        <div>
          {order.shipping.city}, {order.shipping.state} - {order.shipping.country}
        </div>
        <div>{order.shipping.zip}</div>
        <div className="py-4">
          Phone: {order.shipping.phone ? order.shipping.phone : 'Not registered'}
        </div>
        <hr />
      </div>
    </>
  );
};
