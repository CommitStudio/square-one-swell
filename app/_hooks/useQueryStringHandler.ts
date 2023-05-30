import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as URLSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
};

export const useRemoveQueryString = () => {
  const searchParams = useSearchParams();

  const removeQueryString = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams as URLSearchParams);
      params.delete(key);

      return params.toString();
    },
    [searchParams]
  );

  return removeQueryString;
};
