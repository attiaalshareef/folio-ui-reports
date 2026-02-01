import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paneset } from '@folio/stripes/components';
import SearchAndFilters from '../components/reports/management/list/searchAndFilters/SearchAndFilters';
import ReportsList from '../components/reports/management/list/ReportsList';

function ReportsListRoute(props) {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <Paneset isRoot>
      <SearchAndFilters
        {...props}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      <ReportsList
        {...props}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
    </Paneset>
  );
}

ReportsListRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default ReportsListRoute;
