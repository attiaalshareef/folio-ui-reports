import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Paneset, Loading } from '@folio/stripes/components';
import { CubeContext } from '@cubejs-client/react';
import SaveNewReportManager from '../../components/reports/management/save/SaveNewReportManager';
import QueryBuilderManger from '../../components/reports/builders/advanced/QueryBuilderManger';
import useURLParams from '../../hooks/useURLParams';
import useReportsConfigs from '../../hooks/useReportsConfigs';
import ResultsPreview from '../../components/reports/results/preview/ResultsPreview';
import useCubeQuery from '../../hooks/useQuery';

function QueryBuilderRoute(props) {
  const cubejsApi = useContext(CubeContext);
  const [reportType, setReportType] = useURLParams('rt', 'dimMetric');

  const [displayMethod, setDisplayMethod] = useURLParams('dm', 'table');
  // const [selectedTables, setSelectedTables] = useURLParams('st', '');
  const [query, setQuery] = useURLParams('q', '');

  const [selectedTables, setSelectedTables] = useState([]);
  const [showQueryBuilderPane, setShowQueryBuilderPane] = useState(true);
  const [showSavePane, setShowSavePane] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryOptions, setQueryOptions] = useState({});
  const [resultSet, error, isLoading] = useCubeQuery(
    currentQuery,
    queryOptions,
  );

  const [initialValues, setInitialValues] = useState({
    tables: [],
    columns: {},
    dimFilters: [],
    metFilters: [],
    metrics: [],
    orders: [],
    timeDimentions: {
      timeColumn: '',
      timeUnit: 'day',
      dateRange: '',
    },
    segments: '',
  });

  const handleClose = () => {
    props.history.push('/reports/report-builder');
  };

  return (
    <>
      <Paneset>
        <QueryBuilderManger
          {...props}
          reportType={reportType}
          setReportType={setReportType}
          showQueryBuilderPane={showQueryBuilderPane}
          setShowQueryBuilderPane={setShowQueryBuilderPane}
          handleClose={handleClose}
          initialValues={initialValues}
          setQuery={(newQuery, options = {}) => {
            setQuery(newQuery);
            setCurrentQuery(newQuery);
            setQueryOptions(options);
          }}
          selectedTables={selectedTables}
          setSelectedTables={setSelectedTables}
        />
        <ResultsPreview
          {...props}
          showQueryBuilderPane={showQueryBuilderPane}
          setShowQueryBuilderPane={setShowQueryBuilderPane}
          showSavePane={showSavePane}
          setShowSavePane={setShowSavePane}
          handleClose={handleClose}
          query={currentQuery}
          resultSet={resultSet}
          error={error}
          isLoading={isLoading}
          reportType={reportType}
          displayMethod={displayMethod}
          setDisplayMethod={setDisplayMethod}
        />
        <SaveNewReportManager
          {...props}
          showQueryBuilderPane={showQueryBuilderPane}
          setShowQueryBuilderPane={setShowQueryBuilderPane}
          showSavePane={showSavePane}
          setShowSavePane={setShowSavePane}
          handleClose={handleClose}
          query={currentQuery}
          reportType={reportType}
        />
      </Paneset>
    </>
  );
}

QueryBuilderRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
};

export default QueryBuilderRoute;
