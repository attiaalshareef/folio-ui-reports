/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paneset } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes-core';
import { get, isEqual } from 'lodash';
import useURLParams from '../hooks/useURLParams';
import QueryFiltersManager from '../components/reports/results/dataset/queryFilters/QueryFiltersManager';
import QueryResultSet from '../components/reports/results/dataset/QueryResultSet';

function QueryResultSetRoute(props) {
  const [displayMethod, setDisplayMethod] = useURLParams('dm', '');
  const [currentReport, setCurrentReport] = useState([]);

  const [showFiltersPane, setShowFiltersPane] = useState(false);

  const handleClose = () => {
    props.history.push(props.location.pathname.replace('run', 'view'));
  };

  useEffect(() => {
    const report = get(props.resources.report, [
      'records',
      '0',
      'reports',
      '0',
    ]);
    if (!isEqual(currentReport, report)) {
      setCurrentReport(report);
      setDisplayMethod(report?.defaultDisplayMethod);
    }
  }, [props.resources.report]);

  return (
    <Paneset>
      <QueryFiltersManager
        {...props}
        showFiltersPane={showFiltersPane}
        setShowFiltersPane={setShowFiltersPane}
        currentReport={currentReport}
      />
      <QueryResultSet
        {...props}
        handleClose={handleClose}
        showFiltersPane={showFiltersPane}
        setShowFiltersPane={setShowFiltersPane}
        currentReport={currentReport}
        displayMethod={displayMethod}
        setDisplayMethod={setDisplayMethod}
      />
    </Paneset>
  );
}

QueryResultSetRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  resources: PropTypes.shape({
    report: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

QueryResultSetRoute.manifest = Object.freeze({
  report: {
    type: 'okapi',
    GET: {
      path: 'reports',
      params: {
        query: 'query=(id==:{id})',
        limit: '1',
      },
    },
  },
});

export default stripesConnect(QueryResultSetRoute);
