/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useCubeMeta } from '@cubejs-client/react';
import useURLParams from '../../../../hooks/useURLParams';
import QueryBuilderForm from './QueryBuilderForm';

function QueryBuilderManger(props) {
  const cubeMetaData = useCubeMeta();
  const [formState, setFormState] = useURLParams('form_state', '');

  // Get initial values from URL or use defaults
  const getInitialValues = () => {
    if (formState) {
      try {
        return JSON.parse(formState);
      } catch (e) {
        console.warn('Failed to parse form state from URL:', e);
      }
    }
    return {
      tables: [],
      columns: {},
      dimFilters: [],
      metFilters: [],
      metrics: [],
      orders: [],
      timeDimentions: {
        timeColumn: '',
        timeUnit: 'day',
        dateRange: '',
      },
      segments: '',
    };
  };

  const initialValues = useMemo(() => getInitialValues(), [formState]);

  // Auto-execute query if form state exists in URL
  useEffect(() => {
    if (formState) {
      const values = getInitialValues();
      executeQuery(values);
    }
  }, []);

  const getFieldValues = (values, selectedTables) => {
    const columns = [];
    const selectedTableNames =
      selectedTables?.map((table) => table.value) || [];

    for (const key in values) {
      // Only include columns from tables that are currently selected
      if (key && selectedTableNames.includes(key)) {
        columns.push(...(values[key] || []));
      }
    }
    return columns.map((col) => col.value);
  };

  const getFiltersValues = (values) => {
    const filtersValues = [];
    values.map((val) => {
      if (val.member) {
        // Handle date range filters
        if (val.startDate && val.endDate) {
          filtersValues.push({
            member: val.member,
            operator:
              val.operator === 'notEquals' ? 'notInDateRange' : 'inDateRange',
            values: [val.startDate, val.endDate],
          });
        } else if (['set', 'notSet'].includes(val.operator)) {
          // Handle set/notSet filters without values
          filtersValues.push({
            member: val.member,
            operator: val.operator,
          });
        } else if (val.values) {
          // Handle regular filters
          let processedValues = val.values;

          if (typeof processedValues === 'string') {
            processedValues = processedValues.split(',');
          }

          filtersValues.push({
            member: val.member,
            operator: val.operator,
            values: Array.isArray(processedValues)
              ? processedValues
              : [processedValues],
          });
        }
      }
      return null;
    });
    return filtersValues;
  };

  const getOrdersValues = (orders) => {
    const orderObject = {};
    orders.forEach((order) => {
      orderObject[order.fieldName] = order.sortType;
    });
    return orderObject;
  };

  const executeQuery = (values) => {
    props.setQuery({
      measures:
        values?.metrics.length !== 0
          ? values?.metrics?.map((met) => met.value)
          : [],
      dimensions: Object.keys(values.columns || {}).length
        ? getFieldValues(values.columns, props.selectedTables)
        : [],
      filters:
        values?.dimFilters?.length || values?.metFilters?.length
          ? getFiltersValues([
              ...(values.dimFilters || []),
              ...(values.metFilters || []),
            ])
          : [],
      timeDimensions:
        values?.timeDimentions?.timeColumn && values?.timeDimentions?.timeUnit
          ? [
              {
                dimension: values?.timeDimentions?.timeColumn
                  ? values.timeDimentions.timeColumn
                  : '',
                granularity: values?.timeDimentions?.timeUnit
                  ? values.timeDimentions.timeUnit
                  : '',
              },
            ]
          : [],
      total: true,
      ungrouped: false,
      order: values?.orders?.length ? getOrdersValues(values.orders) : [],
    });
  };

  const onFormSubmit = (values, form) => {
    // Save form state to URL
    setFormState(JSON.stringify(values));

    // Execute query
    executeQuery(values);

    // Reinitialize form on success
    if (form) {
      form.initialize(values);
    }
  };

  const onReset = (form) => {
    // Clear form_state from URL
    setFormState('');
    // Clear current query
    props.setQuery('');
    // Reset form to default values
    const defaultValues = getInitialValues();
    if (form) {
      form.reset(defaultValues);
    }
  };

  const onCancel = () => {
    // Clear current query to stop loading
    props.setQuery('');
  };

  return (
    <QueryBuilderForm
      {...props}
      onSubmit={onFormSubmit}
      onReset={onReset}
      onCancel={onCancel}
      initialValues={initialValues}
      cubeMetaData={cubeMetaData?.response}
      setQuery={props.setQuery}
      reportType={props.reportType}
      setReportType={props.setReportType}
      formState={formState}
      setFormState={setFormState}
    />
  );
}

QueryBuilderManger.propTypes = {
  handleClose: PropTypes.func.isRequired,
  showQueryBuilderPane: PropTypes.bool.isRequired,
  setShowQueryBuilderPane: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  reportType: PropTypes.string.isRequired,
  setReportType: PropTypes.func.isRequired,
  selectedTables: PropTypes.arrayOf(PropTypes.object),
  setSelectedTables: PropTypes.func.isRequired,
};

export default QueryBuilderManger;
