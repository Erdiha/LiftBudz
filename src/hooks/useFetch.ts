import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const json = await res.json();
          setError(json);
        } else {
          const json = await res.json();
          setData(json);
        }
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
