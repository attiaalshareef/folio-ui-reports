import React from 'react';
import PropTypes from 'prop-types';
import ReportBuilderSelection from '../../components/reports/builders/shared/ReportBuilderSelection';

function ReportBuilderSelectionRoute(props) {
  return <ReportBuilderSelection {...props} />;
}

ReportBuilderSelectionRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
};

export default ReportBuilderSelectionRoute;