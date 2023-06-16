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
 * Define and declare global state to be used on products
 ****************************************************************************/
type StateProduct = {
  chosenOptions: { [key: string]: string };
};

const stateProduct = atom({
  chosenOptions: {}
});

export function useProductState(): {
  productState: StateProduct;
  updateProductProp: (property: string, value: unknown) => void;
} {
  const [productState, setProductState] = useAtom(stateProduct);

  const updateProductProp = (property: string, value: unknown) => {
    setProductState({
      ...productState,
      [property]: value
    });
  };

  return { productState, updateProductProp };
}

/*****************************************************************************
 * Global state used for wishlist
 ****************************************************************************/
const stateWishlist = atom<string[] | null>(null);

export function useWishlistState() {
  const [wishlist, setWishlist] = useAtom(stateWishlist);
  return { wishlist, setWishlist };
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
