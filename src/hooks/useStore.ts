import { atom, useAtom } from 'jotai';

import { swell } from './useSwellCart';

type Store = {
  isFilterOpen: boolean;
  breadcrumbSelectedCategory: string;
  breadcrumbMainRoute: string;
  isVariantActive: boolean;
  triggerFetchCart: boolean;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  localCart: swell.Cart | object;
};

export const store = atom({
  isFilterOpen: false,
  breadcrumbSelectedCategory: '',
  breadcrumbMainRoute: '',
  isVariantActive: true,
  triggerFetchCart: false,
  user: {
    first_name: '',
    last_name: '',
    email: ''
  },
  localCart: {}
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
