import { atom, useAtom } from 'jotai';

type Store = {
  testVariable: boolean;
  isFilterOpen: boolean;
  breadcrumbSelectedCategory: string;
  breadcrumbMainRoute: string;
  sortBy: string;
};

export const store = atom({
  testVariable: false, // Here we need to initialize de variable we want on the store, the testVariable is just as example it may be removed
  isFilterOpen: false,
  breadcrumbSelectedCategory: '',
  breadcrumbMainRoute: '',
  sortBy: 'Relevant'
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
