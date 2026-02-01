/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import WidgetFormManager from '../components/dashboards/widgetForm/WidgetFormManager';

function WidgetFormRoute(props) {
  const handleClose = () => {
    props.history.push('/reports/dashboards');
  };

  return (
    <>
      <WidgetFormManager {...props} handleClose={handleClose} />
    </>
  );
}

WidgetFormRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object,
};

export default WidgetFormRoute;
