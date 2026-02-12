import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Paneset } from '@folio/stripes/components';
import { CubeContext } from '@cubejs-client/react';
import ProductivityReportManager from '../../components/reports/builders/productivity/ProductivityReportManager';
import ResultsPreview from '../../components/reports/results/preview/ResultsPreview';
import SaveNewReportManager from '../../components/reports/management/save/SaveNewReportManager';
import useURLParams from '../../hooks/useURLParams';
import useCubeQuery from '../../hooks/useQuery';

function ProductivityReportsRoute(props) {
  const cubejsApi = useContext(CubeContext);
  const [query, setQuery] = useURLParams('q', '');
  const [displayMethod, setDisplayMethod] = useURLParams('dm', 'table');

  const [showBuilderPane, setShowBuilderPane] = useState(true);
  const [showSavePane, setShowSavePane] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryOptions, setQueryOptions] = useState({});
  const [resultSet, error, isLoading] = useCubeQuery(
    currentQuery,
    queryOptions,
  );

  const handleClose = () => {
    props.history.push('/reports/report-builder');
  };

  return (
    <Paneset>
      <ProductivityReportManager
        {...props}
        showBuilderPane={showBuilderPane}
        setShowBuilderPane={setShowBuilderPane}
        handleClose={handleClose}
        setQuery={(newQuery, options = {}) => {
          setQuery(newQuery);
          setCurrentQuery(newQuery);
          setQueryOptions(options);
        }}
        isLoading={isLoading}
      />

      <ResultsPreview
        {...props}
        showQueryBuilderPane={showBuilderPane}
        setShowQueryBuilderPane={setShowBuilderPane}
        showSavePane={showSavePane}
        setShowSavePane={setShowSavePane}
        handleClose={handleClose}
        query={currentQuery}
        resultSet={resultSet}
        error={error}
        isLoading={isLoading}
        reportType="performance"
        displayMethod={displayMethod}
        setDisplayMethod={setDisplayMethod}
      />

      <SaveNewReportManager
        {...props}
        showQueryBuilderPane={showBuilderPane}
        setShowQueryBuilderPane={setShowBuilderPane}
        showSavePane={showSavePane}
        setShowSavePane={setShowSavePane}
        handleClose={handleClose}
        query={currentQuery}
        reportType="performance"
      />
    </Paneset>
  );
}

ProductivityReportsRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
};

export default ProductivityReportsRoute;
