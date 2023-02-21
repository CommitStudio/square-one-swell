import { atom, useAtom } from 'jotai';

import { swell } from '../useSwellConection';

type StateOrders = UserOrder[];
type StateCart = swell.Cart;
type StateAddresses = SwellAddress[];
type StateCards = SwellUserCards[];

const stateOrdes = atom([] as StateOrders);
const stateCart = atom({} as StateCart);
const stateAddresses = atom([] as StateAddresses);
const stateCards = atom([] as StateCards);

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
