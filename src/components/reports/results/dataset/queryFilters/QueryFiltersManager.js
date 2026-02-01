import React from 'react';
import PropTypes from 'prop-types';
import QueryFiltersForm from './QueryFiltersForm';

function QueryFiltersManager(props) {
  const onFormSubmit = (values) => {
    console.log({ values });
  };
  return (
    <QueryFiltersForm
      {...props}
      onSubmit={onFormSubmit}
      // initialValues={props.initialValues}
      showFiltersPane={props.showFiltersPane}
      setShowFiltersPane={props.setShowFiltersPane}
    />
  );
}

QueryFiltersManager.propTypes = {
  showFiltersPane: PropTypes.bool,
  setShowFiltersPane: PropTypes.func,
};

export default QueryFiltersManager;
