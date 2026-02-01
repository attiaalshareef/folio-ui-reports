import React from 'react';
import PropTypes from 'prop-types';
import ColumnField from '../fields/ColumnField';
import DimFilters from '../fields/filters/DimFilters';
import SortByOptions from '../fields/SortByOptions/SortByOptions';

function SortedListModel({ currentCubeMembers, disabled, formValues }) {
  return (
    <>
      <ColumnField
        currentCubeMembers={currentCubeMembers}
        disabled={disabled}
      />
      <DimFilters currentCubeMembers={currentCubeMembers} disabled={disabled} />
      <SortByOptions
        selectedColumns={formValues?.columns}
        selectedMetrics={[]}
        disabled={disabled}
      />
    </>
  );
}

SortedListModel.propTypes = {
  currentCubeMembers: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  formValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SortedListModel;
