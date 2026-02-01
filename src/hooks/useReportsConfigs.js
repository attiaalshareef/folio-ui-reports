/* eslint-disable implicit-arrow-linebreak */
import { useNamespace, useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

function useReportsConfigs() {
  const okapiKy = useOkapiKy();
  const [namespace] = useNamespace({ key: 'reportsConfigs' });

  const {
    isLoading,
    isError,
    data = {},
    refetch,
    isFetched,
    ...rest
  } = useQuery(
    [namespace],
    () =>
      okapiKy
        .get('reportsConfigs?query=(configName==defaultReportType)')
        .json(),
    {
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  );

  return {
    isLoading,
    isFetched,
    isError,
    refetch,
    defaultReportType:
      !isLoading && data?.reportsConfigs?.[0]
        ? data.reportsConfigs[0].configValue?.reportType
        : undefined,
    configId:
      !isLoading && data?.reportsConfigs?.[0]
        ? data.reportsConfigs[0].id
        : undefined,
    rest,
  };
}

export default useReportsConfigs;
