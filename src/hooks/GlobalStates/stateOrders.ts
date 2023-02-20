import { atom, useAtom } from 'jotai';

import { swell } from '../useSwellConection';

type StateOrders = UserOrder[];
type StateCart = swell.Cart;

const stateOrdes = atom([] as StateOrders);
const stateCart = atom({} as StateCart);

export function useOrdersState() {
  const [orders, setOrders] = useAtom(stateOrdes);
  return { orders, setOrders };
}

export function useCartState() {
  const [cart, setCart] = useAtom(stateCart);
  return { cart, setCart };
}
