import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { CubeContext } from '@cubejs-client/react';

export default function useCubeQuery(query, options = {}) {
  const { cubeApi } = useContext(CubeContext);

  const {
    data: resultSet,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['cube-query', JSON.stringify(query)],
    queryFn: async ({ signal }) => {
      // Handle empty query
      if (
        !query ||
        query === '' ||
        (typeof query === 'object' && Object.keys(query).length === 0)
      ) {
        return null;
      }

      // Cube.js v1.3.59 supports AbortSignal natively
      return cubeApi.load(query, { signal });
    },
    enabled:
      !!query &&
      query !== '' &&
      (typeof query !== 'object' || Object.keys(query).length > 0),
    staleTime: 2 * 60 * 1000, // 2 minutes - data stays fresh
    cacheTime: 10 * 60 * 1000, // 10 minutes - cache retention
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    onSuccess: options.onSuccess, // Pass onSuccess callback if provided
  });

  return [resultSet, error, isFetching];
}
