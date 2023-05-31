'use client';

import { useState } from 'react';

import type { SwellCard } from 'swell-js';

import DeleteCardModal from './DeleteCardModal';

import TrashIcon from 'public/img/icons/TrashIcon';

type PaymentCardProps = {
  card: SwellCard;
  defaultCard: boolean;
};

const PaymentCard = ({ card, defaultCard }: PaymentCardProps) => {
  const [openConfModal, setOpenConfModal] = useState(false);

  return (
    <div className="flex rounded p-4 shadow-md border border-gray justify-between mb-2 text-sm">
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
      <div className={`flex flex-col ${defaultCard ? 'justify-between items-end' : 'justify-end'}`}>
        {defaultCard && <p className="bg-gray shadow p-1 px-2 text-xs">Default</p>}
        <button onClick={() => setOpenConfModal(true)}>
          <TrashIcon />
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
