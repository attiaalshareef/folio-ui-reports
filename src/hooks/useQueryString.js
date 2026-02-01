/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { CubeContext } from '@cubejs-client/react';

export default function useQueryString(query) {
  const { cubejsApi } = useContext(CubeContext);

  const [queryString, setQueryString] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const doFetch = async () => {
    setIsLoading(true);
    try {
      const res = await cubejsApi.sql(query);
      if (!signal.aborted) {
        setQueryString(res.sql());
      }
    } catch (e) {
      if (!signal.aborted) {
        setError(e);
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (query !== '') {
      doFetch();
    } else {
      setQueryString(null);
      setError(null);
      setIsLoading(false);
    }
    return () => {
      abortController.abort();
    };
  }, [query]);

  return [queryString, error, isLoading];
}
