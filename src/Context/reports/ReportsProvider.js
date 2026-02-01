import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, sortBy } from 'lodash';
import { stripesConnect } from '@folio/stripes-core';
import ReportsContext from './ReportsContext';

function ReportsProvider(props) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const reportsList = sortBy((props.resources.reports || {}).records || [], [
      'name',
    ]);
    if (!isEqual(reportsList, reports)) {
      setReports(reportsList);
    }
  }, [props.resources.reports, reports]);

  return (
    <ReportsContext.Provider value={reports}>
      {props.children}
    </ReportsContext.Provider>
  );
}

ReportsProvider.propTypes = {
  children: PropTypes.node,
  resources: PropTypes.shape({
    reports: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  mutator: PropTypes.shape({
    reports: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }),
  }),
};
ReportsProvider.manifest = {
  reports: {
    type: 'okapi',
    records: 'reports',
    path: 'reports?limit=10000',
  },
};
export default stripesConnect(ReportsProvider);
