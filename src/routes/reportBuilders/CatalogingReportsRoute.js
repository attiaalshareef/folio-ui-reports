import { useState } from 'react';
import PropTypes from 'prop-types';
import { Paneset } from '@folio/stripes/components';
import CatalogingReportManager from '../../components/reports/builders/cataloging/CatalogingReportManager';
import ResultsPreview from '../../components/reports/results/preview/ResultsPreview';
import SaveNewReportManager from '../../components/reports/management/save/SaveNewReportManager';
import useURLParams from '../../hooks/useURLParams';
import useCubeQuery from '../../hooks/useQuery';

function CatalogingReportsRoute(props) {
  const [formState, setFormState] = useURLParams('form_state', '');
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
      <CatalogingReportManager
        {...props}
        showBuilderPane={showBuilderPane}
        setShowBuilderPane={setShowBuilderPane}
        handleClose={handleClose}
        formState={formState}
        setFormState={setFormState}
        setQuery={(query, options = {}) => {
          setCurrentQuery(query);
          setQueryOptions(options);
        }}
        isLoading={isLoading}
      />

      <ResultsPreview
        showQueryBuilderPane={showBuilderPane}
        setShowQueryBuilderPane={setShowBuilderPane}
        showSavePane={showSavePane}
        setShowSavePane={setShowSavePane}
        handleClose={handleClose}
        query={currentQuery}
        resultSet={resultSet}
        error={error}
        isLoading={isLoading}
        reportType="statistical"
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
        reportType="statistical"
      />
    </Paneset>
  );
}

CatalogingReportsRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
};

export default CatalogingReportsRoute;
