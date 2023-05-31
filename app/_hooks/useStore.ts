import { atom, useAtom } from 'jotai';

import type { Cart } from 'swell-js';

/*****************************************************************************
 * Define and declare global state hook
 ****************************************************************************/
const stateCart = atom<Cart | null>(null);

export function useGlobalState() {
  const [cart, setCart] = useAtom(stateCart);
  return { cart, setCart };
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
