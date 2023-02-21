import { atom, useAtom } from 'jotai';

import type { AccountInformation } from 'swell-js';

import { swell } from '../useSwellConection';

type StateOrders = UserOrder[];
type StateCart = swell.Cart | null;
type StateAddresses = SwellAddress[];
type StateCards = SwellUserCards[];
type StateAccount = AccountInformation | null;

const stateOrdes = atom([] as StateOrders);
const stateCart = atom({} as StateCart);
const stateAddresses = atom([] as StateAddresses);
const stateCards = atom([] as StateCards);
const stateAccount = atom({} as StateAccount);

export function useOrdersState() {
  const [orders, setOrders] = useAtom(stateOrdes);
  return { orders, setOrders };
}

export function useCartState() {
  const [cart, setCart] = useAtom(stateCart);
  return { cart, setCart };
}

export function useAddressesState() {
  const [addresses, setAddresses] = useAtom(stateAddresses);
  return { addresses, setAddresses };
}

export function useCardsState() {
  const [cards, setCards] = useAtom(stateCards);
  return { cards, setCards };
}

export function useAccountState() {
  const [account, setAccount] = useAtom(stateAccount);
  return { account, setAccount };
}
