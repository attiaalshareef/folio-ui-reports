import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CatalogingReportBuilder from './CatalogingReportBuilder';
import { useCatalogingFieldLabels } from '../../../../helpers/catalogingFieldLabels';
import {
  getInitialValuesFromURL,
  generateQueryFromFormState,
  extractValues,
  getDefaultFormValues,
} from './utils/catalogingReportUtils';

function CatalogingReportManager(props) {
  const fieldLabels = useCatalogingFieldLabels();
  const initialValues = useMemo(() => getInitialValuesFromURL(fieldLabels), []);

  // Auto-execute query if form state exists in URL
  useEffect(() => {
    const query = generateQueryFromFormState(initialValues);
    if (query.dimensions.length > 0 || query.measures.length > 0) {
      props.setQuery(query);
    }
  }, []);

  const onFormSubmit = (values, form) => {
    // Generate and execute query from form state
    const query = generateQueryFromFormState(values);

    // Validate that we have at least some data to query
    if (query.dimensions.length === 0 && query.measures.length === 0) {
      console.warn('No dimensions or measures selected');
      return;
    }

    // Save to URL immediately
    const cleanFormState = {
      ...values,
      instanceFields: extractValues(values.instanceFields),
      holdingsFields: extractValues(values.holdingsFields),
      itemFields: extractValues(values.itemFields),
      measures: extractValues(values.measures),
      // Convert filter objects to strings for URL storage
      instanceFilters: (values.instanceFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
        // Keep startDate and endDate in URL for date range filters
        ...(filter.startDate && filter.endDate ? {
          startDate: filter.startDate,
          endDate: filter.endDate
        } : {}),
        // Ensure values is always array
        values: filter.startDate && filter.endDate ? [filter.startDate, filter.endDate] : 
                (filter.values ? (Array.isArray(filter.values) ? filter.values : [filter.values]) : [])
      })),
      holdingsFilters: (values.holdingsFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
        ...(filter.startDate && filter.endDate ? {
          startDate: filter.startDate,
          endDate: filter.endDate
        } : {}),
        values: filter.startDate && filter.endDate ? [filter.startDate, filter.endDate] : 
                (filter.values ? (Array.isArray(filter.values) ? filter.values : [filter.values]) : [])
      })),
      itemFilters: (values.itemFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
        ...(filter.startDate && filter.endDate ? {
          startDate: filter.startDate,
          endDate: filter.endDate
        } : {}),
        values: filter.startDate && filter.endDate ? [filter.startDate, filter.endDate] : 
                (filter.values ? (Array.isArray(filter.values) ? filter.values : [filter.values]) : [])
      })),
      measuresFilters: (values.measuresFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
        ...(filter.startDate && filter.endDate ? {
          startDate: filter.startDate,
          endDate: filter.endDate
        } : {}),
        values: filter.startDate && filter.endDate ? [filter.startDate, filter.endDate] : 
                (filter.values ? (Array.isArray(filter.values) ? filter.values : [filter.values]) : [])
      })),
    };
    props.setFormState(JSON.stringify(cleanFormState));

    // Execute query - only reinitialize form on success
    props.setQuery(query, {
      onSuccess: () => {
        form.initialize(values);
      },
    });
  };

  const onReset = (form) => {
    // Clear form_state from URL to return to default values
    props.setFormState('');
    // Clear current query (useQuery hook will handle cancellation)
    props.setQuery('');
    // Reset form to default empty values
    form.reset(getDefaultFormValues());
  };

  const onCancel = () => {
    // Clear current query to stop loading (useQuery hook will handle cancellation)
    props.setQuery('');
  };

  return (
    <CatalogingReportBuilder
      {...props}
      onSubmit={onFormSubmit}
      onReset={onReset}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
}

CatalogingReportManager.propTypes = {
  showBuilderPane: PropTypes.bool.isRequired,
  setShowBuilderPane: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  formState: PropTypes.string,
  setFormState: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CatalogingReportManager;
