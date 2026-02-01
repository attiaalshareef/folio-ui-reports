import React from 'react';
import PropTypes from 'prop-types';
import DashboardWidgets from '../components/dashboards/dashboardWidgets/DashboardWidgets';

function DashboardsRoute(props) {
  return <DashboardWidgets {...props} />;
}

DashboardsRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
};

export default DashboardsRoute;
