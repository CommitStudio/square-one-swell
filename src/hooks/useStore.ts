import { atom, useAtom } from 'jotai';

import type { AccountInformation } from 'swell-js';

import { useOrdersState, useCartState } from './GlobalStates/stateOrders';

import { swell } from './useSwellConection';

type Store = {
  isFilterOpen: boolean;
  breadcrumbSelectedCategory: string;
  breadcrumbMainRoute: string;
  isVariantActive: boolean;
  triggerFetchCart: boolean;
  user: AccountInformation | object;
  addresses: SwellAddress | object;
  cards: UserCards[] | object;
};

export const store = atom({
  isFilterOpen: false,
  breadcrumbSelectedCategory: '',
  breadcrumbMainRoute: '',
  isVariantActive: true,
  triggerFetchCart: false,
  user: {},
  addresses: {},
  cards: {}
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

export { useOrdersState, useCartState };
