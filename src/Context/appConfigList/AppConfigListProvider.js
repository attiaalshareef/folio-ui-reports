import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, sortBy } from 'lodash';
import { stripesConnect, withStripes } from '@folio/stripes-core';
import AppConfigListContext from './AppConfigListContext';

function AppConfigListProvider(props) {
  const [appConfigList, setAppConfigList] = useState([]);

  useEffect(() => {
    const configsList = sortBy((props.resources.reportsConfigs || {}).records || [], [
      'configName',
    ]);
    if (!isEqual(configsList, appConfigList)) {
      setAppConfigList(configsList);
    }
  }, [appConfigList, props.resources.reportsConfigs]);

  const getDefaultDashboardConfigs = () => {
    return appConfigList.find((config) => config.configName === 'defaultDashboard');
  };

  const getDefaultReportTypeConfigs = () => {
    return appConfigList.find((config) => config.configName === 'defaultReportType');
  };

  return (
    <AppConfigListContext.Provider
      value={{
        defaultDashboard: getDefaultDashboardConfigs(),
        defaultReportType: getDefaultReportTypeConfigs(),
      }}
    >
      {props.children}
    </AppConfigListContext.Provider>
  );
}

AppConfigListProvider.propTypes = {
  children: PropTypes.node,
  resources: PropTypes.shape({
    reportsConfigs: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  mutator: PropTypes.shape({
    reportsConfigs: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
};
AppConfigListProvider.manifest = {
  reportsConfigs: {
    type: 'okapi',
    path: 'reportsConfigs?limit=1000',
    records: 'reportsConfigs',
    resourceShouldRefresh: true,
  },
};
export default stripesConnect(AppConfigListProvider);
