import { useState } from 'react';

import type { SwellCard } from 'swell-js';

import DeleteCardModal from './DeleteCardModal';

type PaymentCardProps = {
  card: SwellCard;
  defaultCard: boolean;
};

const PaymentCard = ({ card, defaultCard }: PaymentCardProps) => {
  const [openConfModal, setOpenConfModal] = useState(false);

  return (
    <div className="flex rounded bg-primary-lightest p-4 shadow-md border border-gray-50 justify-between mb-2 text-sm">
      <div className="space-y-4 text-sm">
        <p>
          <span>Type </span>
          <span className="font-bold">{card.brand}</span>
        </p>
        <p>
          <span>Number </span>
          <span className="font-bold"> ···· ···· ···· {card.last4}</span>
        </p>
        <p>
          <span>Exp. date </span>
          <span className="font-bold">
            {card.exp_month}/{card.exp_year}
          </span>
        </p>
      </div>
      <div className={`flex flex-col ${defaultCard ? 'justify-between' : 'justify-end'}`}>
        {defaultCard && <p className="bg-gray-200 text-prigmary p-1 px-2 rounded">Default</p>}
        <button
          className="bg-secondary text-base text-primary p-1 px-2 rounded transition-all duration-300 hover:bg-primary hover:text-secondary"
          onClick={() => setOpenConfModal(true)}
        >
          Delete
        </button>
      </div>
      <DeleteCardModal
        cardId={card.id}
        openConfModal={openConfModal}
        setOpenConfModal={setOpenConfModal}
      />
    </div>
  );
};

export default PaymentCard;
