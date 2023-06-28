export const PaymentDetail = ({ order }: { order: SwellAPI_Order }) => {
  return (
    <>
      <h5 className="text-xl py-8 text-center">Payment details</h5>
      <div className="px-6 md:px-24 flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2">
          <p>
            <span>Type: </span>
            <span className="font-bold">{order.billing.card.brand}</span>
          </p>
          <p>
            <span>Number: </span>
            <span className="font-bold"> ···· ···· ···· {order.billing.card.last4}</span>
          </p>
          <p>
            <span>Exp. date: </span>
            <span className="font-bold">
              {order.billing.card.expMonth}/{order.billing.card.expYear}
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <div className="">{order.billing.address1}</div>
          <div className="">
            {order.billing.city}, {order.billing.state}
          </div>
          <div className="">
            {order.billing.zip}, {order.billing.country}
          </div>
        </div>
      </div>
    </>
  );
};
