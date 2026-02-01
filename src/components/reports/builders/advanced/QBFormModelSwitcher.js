import React from 'react';
import PropTypes from 'prop-types';
import NumericMetricModel from './models/NumericMetricModel';
import DimensionsMetricModel from './models/DimensionsMetricModel';
import PeriodicalMetricModel from './models/PeriodicalMetricModel';
import SortedListModel from './models/SortedListModel';

function QBFormModelSwitcher({
  reportType,
  currentCubeMembers,
  disabled,
  formValues,
}) {
  const renderModelSwitcher = () => {
    switch (reportType) {
      case 'numMetric':
        return (
          <NumericMetricModel
            currentCubeMembers={currentCubeMembers}
            disabled={disabled}
            isMulti={false}
          />
        );
      case 'dimMetric':
        return (
          <DimensionsMetricModel
            currentCubeMembers={currentCubeMembers}
            disabled={disabled}
            formValues={formValues}
          />
        );
      case 'periodMetric':
        return (
          <PeriodicalMetricModel
            currentCubeMembers={currentCubeMembers}
            disabled={disabled}
            formValues={formValues}
          />
        );
      case 'list':
        return (
          <SortedListModel
            currentCubeMembers={currentCubeMembers}
            disabled={disabled}
            formValues={formValues}
          />
        );
      default:
        return <div />;
    }
  };

  return <>{renderModelSwitcher()}</>;
}

QBFormModelSwitcher.propTypes = {
  reportType: PropTypes.string.isRequired,
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  formValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QBFormModelSwitcher;
