import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, sortBy } from 'lodash';
import { stripesConnect } from '@folio/stripes-core';
import DashboardsContext from './DashboardsContext';

function DashboardsProvider(props) {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    const dashboardsList = sortBy(
      (props.resources.dashboards || {}).records || [],
      ['name']
    );
    if (!isEqual(dashboardsList, dashboards)) {
      setDashboards(dashboardsList);
    }
  }, [dashboards, props.resources.dashboards]);

  return (
    <DashboardsContext.Provider value={dashboards}>
      {props.children}
    </DashboardsContext.Provider>
  );
}

DashboardsProvider.propTypes = {
  children: PropTypes.node,
  resources: PropTypes.shape({
    dashboards: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  mutator: PropTypes.shape({
    dashboards: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
};
DashboardsProvider.manifest = {
  dashboards: {
    type: 'okapi',
    records: 'dashboards',
    path: 'dashboards?limit=1000',
  },
};
export default stripesConnect(DashboardsProvider);
