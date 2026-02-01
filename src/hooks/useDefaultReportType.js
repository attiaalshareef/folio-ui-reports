import useReportsConfigs from './useReportsConfigs';

function useDefaultReportType() {
  const { defaultReportType, isLoading } = useReportsConfigs();

  return {
    defaultReportType: defaultReportType || 'dimMetric',
    isLoading,
  };
}

export default useDefaultReportType;
