import React from 'react';
import PropTypes from 'prop-types';
import MetricField from '../fields/MetricField';
import ColumnField from '../fields/ColumnField';
import DimFilters from '../fields/filters/DimFilters';
import MetFilters from '../fields/filters/MetFilters';
import TimeDimensionsField from '../fields/TimeDimensionsField';
import SortByOptions from '../fields/SortByOptions/SortByOptions';

function PeriodicalMetricModel({
  currentCubeMembers,
  disabled,
  formValues,
}) {
  return (
    <>
      <ColumnField
        currentCubeMembers={currentCubeMembers}
        disabled={disabled}
      />
      <MetricField
        currentCubeMembers={currentCubeMembers}
        disabled={disabled}
      />
      <DimFilters currentCubeMembers={currentCubeMembers} disabled={disabled} />
      <MetFilters currentCubeMembers={currentCubeMembers} disabled={disabled} />
      <TimeDimensionsField
        currentCubeMembers={currentCubeMembers}
        disabled={disabled}
      />
      <SortByOptions
        selectedColumns={formValues?.columns}
        selectedMetrics={formValues?.metrics}
        disabled={disabled}
      />
    </>
  );
}

PeriodicalMetricModel.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  formValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeriodicalMetricModel;
