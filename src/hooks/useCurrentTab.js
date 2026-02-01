import { useLocation } from 'react-router-dom';

const useCurrentTab = () => {
  const location = useLocation();
  
  if (location.pathname.includes('/dashboards')) return 'dashboard';
  if (location.pathname.includes('/reports-list')) return 'reportsList';
  if (location.pathname.includes('/preffered-reports')) return 'prefferedReports';
  if (location.pathname.includes('/scheduled-reports')) return 'scheduledReports';
  if (location.pathname.includes('/report-builder')) return 'reportBuilder';
  
  return 'dashboard'; // default
};

export default useCurrentTab;