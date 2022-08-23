import { atom, useAtom } from 'jotai';

type Store = {
  isMobileMenuOpen: boolean;
  showCourses: boolean;
};

export const store = atom({
  isMobileMenuOpen: false,
  showCourses: false
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
