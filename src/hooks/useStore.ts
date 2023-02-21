import { atom, useAtom } from 'jotai';

import type { AccountInformation, Cart } from 'swell-js';

/*****************************************************************************
 * Define states types
 ****************************************************************************/
type StateOrders = UserOrder[];
type StateCart = Cart | null;
type StateAddresses = SwellAddress[];
type StateCards = SwellUserCards[];
type StateAccount = AccountInformation | null;

type Store = {
  isFilterOpen: boolean;
  breadcrumbSelectedCategory: string;
  breadcrumbMainRoute: string;
  isVariantActive: boolean;
  triggerFetchCart: boolean;
};

/*****************************************************************************
 * Initialize states
 ****************************************************************************/
const stateOrdes = atom([] as StateOrders);
const stateCart = atom({} as StateCart);
const stateAddresses = atom([] as StateAddresses);
const stateCards = atom([] as StateCards);
const stateAccount = atom({} as StateAccount);

const store = atom({
  isFilterOpen: false,
  breadcrumbSelectedCategory: '',
  breadcrumbMainRoute: '',
  isVariantActive: true,
  triggerFetchCart: false
});

/*****************************************************************************
 * State hooks
 ****************************************************************************/
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

/** Global state used for UI */
export function useStore(): {
  state: Store;
  updateStateProp: (property: string, value: unknown) => void;
  updateState: (newState: Store) => void;
} {
  const [state, setState] = useAtom(store);

  const updateStateProp = (property: string, value: unknown) => {
    setState({
      ...state,
      [property]: value
    });
  };

  const updateState = (newState: Store) => {
    setState(newState);
  };

  return { state, updateStateProp, updateState };
}
