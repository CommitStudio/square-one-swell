import { useState, useEffect } from 'react';

type State<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useFetch = <T>(url: string | null): State<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!url) return;

        const response = await fetch(url);
        if (!response.ok) throw new Error('An error occurred while fetching data.');

        const result = (await response.json()) as T;

        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unexpected error occurred.'));
      } finally {
        setLoading(false);
      }
    };

    fetchResource().catch((e) =>
      setError(e instanceof Error ? e : new Error('An unexpected error occurred.'))
    );
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
