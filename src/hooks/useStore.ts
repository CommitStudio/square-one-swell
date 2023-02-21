import { atom, useAtom } from 'jotai';

import type { AccountInformation, Cart } from 'swell-js';

/*****************************************************************************
 * Define and declare global state hook
 ****************************************************************************/
const stateOrdes = atom([] as UserOrder[]);
const stateCart = atom(null as Cart | null);
const stateAddresses = atom([] as SwellAddress[]);
const stateCards = atom([] as SwellUserCards[]);
const stateAccount = atom(null as AccountInformation | null);

export function useGlobalState() {
  const [orders, setOrders] = useAtom(stateOrdes);
  const [cart, setCart] = useAtom(stateCart);
  const [addresses, setAddresses] = useAtom(stateAddresses);
  const [cards, setCards] = useAtom(stateCards);
  const [account, setAccount] = useAtom(stateAccount);

  return {
    orders,
    cart,
    addresses,
    cards,
    account,
    setOrders,
    setCart,
    setAddresses,
    setCards,
    setAccount
  };
}

/*****************************************************************************
 * Global state used for UI
 ****************************************************************************/
type Store = {
  isFilterOpen: boolean;
  breadcrumbSelectedCategory: string;
  breadcrumbMainRoute: string;
  isVariantActive: boolean;
};

const store = atom({
  isFilterOpen: false,
  breadcrumbSelectedCategory: '',
  breadcrumbMainRoute: '',
  isVariantActive: true
});

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
