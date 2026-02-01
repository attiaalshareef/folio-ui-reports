import React from 'react';
import PropTypes from 'prop-types';
import MetricField from '../fields/MetricField';
import ColumnField from '../fields/ColumnField';
import DimFilters from '../fields/filters/DimFilters';
import MetFilters from '../fields/filters/MetFilters';
import SortByOptions from '../fields/SortByOptions/SortByOptions';

function DimensionsMetricModel({ currentCubeMembers, disabled, formValues }) {
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
      <DimFilters 
        currentCubeMembers={currentCubeMembers} 
        disabled={disabled} 
        formValues={formValues}
      />
      <MetFilters 
        currentCubeMembers={currentCubeMembers} 
        disabled={disabled} 
        formValues={formValues}
      />
      <SortByOptions
        selectedColumns={formValues?.columns}
        selectedMetrics={formValues?.metrics}
        disabled={disabled}
      />
    </>
  );
}

DimensionsMetricModel.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  formValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DimensionsMetricModel;
