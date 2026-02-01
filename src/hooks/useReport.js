/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
import { useNamespace, useOkapiKy } from '@folio/stripes-core';
import { useQuery } from 'react-query';

function useReport(reportId) {
  const okapiKy = useOkapiKy();
  const [namespace] = useNamespace({ key: 'reports' });

  const {
    isLoading,
    isError,
    data = {},
    refetch,
    ...rest
  } = useQuery(
    [namespace, reportId],
    () =>
      okapiKy
        .get(reportId ? `reports/${reportId}` : 'reports?limit=2147483647')
        .json(),
    { enabled: reportId ? Boolean(reportId) : true },
  );

  // const defaultTemplate = data?.reports?.find(
  //   (template) => template.isDefault === true,
  // );

  return {
    isLoading,
    isError,
    reports: reportId ? data : data.reports,
    // defaultTemplate,
    // currentTemplate: reportId && data ? data : defaultTemplate,
    refetch,
    rest,
  };
}

export default useReport;
