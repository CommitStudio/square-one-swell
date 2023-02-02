import Image from 'next/image';

interface OrderProps {
  order: UserOrder;
}

const OrderCard = ({ order }: OrderProps) => {
  console.log(order);
  return (
    <div className="flex rounded bg-primary-lightest p-4 shadow-md border border-gray-50 justify-between mb-2">
      <div className="h-auto">
        <Image src={order.image1} width={50} height={50} alt={order.image1} />
        <Image src={order.image1} width={50} height={50} alt={order.image1} />
      </div>
      <div className="space-y-2">
        <p className="font-bold text-lg">{order.status}</p>
        <p>
          <span>Order date</span>
          <span className="pl-3 font-semibold">{order.date}</span>
        </p>
        <p>
          <span>Order number</span>
          <span className="pl-3 font-semibold"># {order.number}</span>
        </p>
        <p>
          <span>Total</span>
          <span className="pl-3 font-semibold">
            {order.currency} {order.total}
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-end">
        <button className="px-3 py-1 rounded hover:bg-gray-200 transition-all duration-300">
          VIEW MORE
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
