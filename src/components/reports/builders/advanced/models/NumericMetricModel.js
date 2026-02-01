import React from 'react';
import PropTypes from 'prop-types';
import MetricField from '../fields/MetricField';

function NumericMetricModel({ currentCubeMembers, disabled }) {
  return (
    <>
      <MetricField
        currentCubeMembers={currentCubeMembers}
        disabled={disabled}
      />
    </>
  );
}

NumericMetricModel.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default NumericMetricModel;
