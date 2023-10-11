import { useState, useCallback } from 'react';

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const get = useCallback((url) => fetchData(url, { method: 'GET' }),[]);
  const del = useCallback((url) => fetchData(url, { method: 'DELETE' }),[]);
  
  return {
    data,
    setData,
    get,
    del,
    loading,
    error,
  };
};
