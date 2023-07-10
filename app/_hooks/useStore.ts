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
  chosenOptionsId: string[];
  chosenVariant: {
    variantLabel: string | undefined;
    variantId: string | undefined;
    variantActive: boolean | undefined;
    variantStock: number | undefined;
  };
};

const stateProduct = atom<StateProduct>({
  chosenOptions: {},
  chosenOptionsId: [],
  chosenVariant: { variantId: '', variantActive: true, variantLabel: '', variantStock: 0 }
});

export function useProductState(): {
  productState: StateProduct;
  updateProductProp: (property: string, value: unknown) => void;
  updateProductState: (newState: StateProduct) => void;
} {
  const [productState, setProductState] = useAtom(stateProduct);

  const updateProductProp = (property: string, value: unknown) => {
    setProductState({
      ...productState,
      [property]: value
    });
  };

  const updateProductState = (newState: StateProduct) => {
    setProductState(newState);
  };

  return { productState, updateProductProp, updateProductState };
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
