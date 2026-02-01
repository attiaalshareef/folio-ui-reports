import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CirculationReportBuilder from './CirculationReportBuilder';
import { useCirculationFieldLabels } from '../../../../helpers/circulationFieldLabels';
import {
  getInitialValuesFromURL,
  generateQueryFromFormState,
  extractValues,
  processFilters,
  getDefaultFormValues,
} from './utils/circulationReportUtils';

function CirculationReportManager(props) {
  const fieldLabels = useCirculationFieldLabels();
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
      loanFields: extractValues(values.loanFields),
      patronFields: extractValues(values.patronFields),
      itemFields: extractValues(values.itemFields),
      measures: extractValues(values.measures),
      // Convert filter objects to strings for URL storage
      loanFilters: (values.loanFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
        values: filter.startDate && filter.endDate ? [filter.startDate, filter.endDate] : 
                (filter.values ? (Array.isArray(filter.values) ? filter.values : [filter.values]) : [])
      })),
      patronFilters: (values.patronFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
        values: filter.startDate && filter.endDate ? [filter.startDate, filter.endDate] : 
                (filter.values ? (Array.isArray(filter.values) ? filter.values : [filter.values]) : [])
      })),
      itemFilters: (values.itemFilters || []).map(filter => ({
        ...filter,
        member: typeof filter.member === 'string' ? filter.member : filter.member?.value,
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
    <CirculationReportBuilder
      {...props}
      onSubmit={onFormSubmit}
      onReset={onReset}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
}

CirculationReportManager.propTypes = {
  showBuilderPane: PropTypes.bool.isRequired,
  setShowBuilderPane: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  formState: PropTypes.string,
  setFormState: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CirculationReportManager;