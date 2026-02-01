import { getQueryStringValue } from '../../../../../hooks/useURLParams';

// Convert string to option object with label
export const mapStringToOption = (value, fieldLabels) => ({
  value,
  label: fieldLabels[value] || value,
});

// Convert string arrays to option arrays
export const mapFieldArray = (fieldArray, fieldLabels) => {
  return Array.isArray(fieldArray)
    ? fieldArray.map((value) => mapStringToOption(value, fieldLabels))
    : fieldArray;
};

// Convert filter member strings to objects with labels
export const mapFilterArray = (filterArray, fieldLabels) => {
  if (!Array.isArray(filterArray)) return filterArray;
  return filterArray.map((filter) => ({
    ...filter,
    member: filter.member
      ? (typeof filter.member === 'string' 
          ? mapStringToOption(filter.member, fieldLabels)
          : filter.member) // Already an object
      : filter.member,
    // Handle date range values from URL - restore startDate/endDate from values or keep existing
    ...((['inDateRange', 'notInDateRange'].includes(filter.operator)) ? {
      startDate: filter.startDate || (filter.values && filter.values[0]) || undefined,
      endDate: filter.endDate || (filter.values && filter.values[1]) || undefined
    } : {})
  }));
};

// Extract values from MultiSelection objects
export const extractValues = (fieldArray) => {
  if (!Array.isArray(fieldArray)) return [];
  return fieldArray
    .map((item) => (typeof item === 'string' ? item : item.value))
    .filter(Boolean);
};

// Process filters from all categories
export const processFilters = (filterArray) => {
  if (!Array.isArray(filterArray)) return [];
  return filterArray
    .filter((filter) => {
      if (!filter || !filter.member || !filter.operator) return false;
      
      // For operators that don't require values (set/notSet)
      if (['set', 'notSet'].includes(filter.operator)) {
        return true;
      }
      
      // For date range operators, check startDate/endDate or values array
      if (['inDateRange', 'notInDateRange'].includes(filter.operator)) {
        return (filter.startDate && filter.endDate) || 
               (filter.values && Array.isArray(filter.values) && filter.values.length >= 2);
      }
      
      // For operators that require values, check if values exist
      const hasValues = filter.values && 
        (Array.isArray(filter.values) ? filter.values.length > 0 : filter.values);
      return hasValues;
    })
    .map((filter) => ({
      // Handle member as object or string (after page refresh, it comes from URL as object)
      member: typeof filter.member === 'string' ? filter.member : filter.member?.value || filter.member,
      operator: filter.operator,
      // Handle date range values from URL or form
      values: (['inDateRange', 'notInDateRange'].includes(filter.operator) && filter.startDate && filter.endDate)
        ? [filter.startDate, filter.endDate]
        : filter.values
          ? Array.isArray(filter.values)
            ? filter.values
            : [filter.values]
          : [],
    }));
};

// Generate Cube.js query from form state
export const generateQueryFromFormState = (formState) => {
  // Combine all selected fields from different categories
  const allDimensions = [
    ...extractValues(formState.instanceFields),
    ...extractValues(formState.holdingsFields),
    ...extractValues(formState.itemFields),
  ];

  const allMeasures = extractValues(formState.measures);

  // Build filters from all sources
  const filters = [
    ...processFilters(formState.instanceFilters),
    ...processFilters(formState.holdingsFilters),
    ...processFilters(formState.itemFilters),
    ...processFilters(formState.measuresFilters),
  ];

  return {
    dimensions: allDimensions,
    measures: allMeasures,
    filters,
    limit: 100,
    total: true,
  };
};

// Get default form values
export const getDefaultFormValues = () => ({
  instanceFields: undefined,
  holdingsFields: undefined,
  itemFields: undefined,
  measures: undefined,
  instanceFilters: undefined,
  holdingsFilters: undefined,
  itemFilters: undefined,
  measuresFilters: undefined,
});

// Get initial values from URL form_state parameter
export const getInitialValuesFromURL = (fieldLabels) => {
  const formStateFromURL = getQueryStringValue('form_state');
  if (formStateFromURL) {
    try {
      const parsed = JSON.parse(formStateFromURL);
      return {
        ...parsed,
        instanceFields: mapFieldArray(parsed.instanceFields, fieldLabels),
        holdingsFields: mapFieldArray(parsed.holdingsFields, fieldLabels),
        itemFields: mapFieldArray(parsed.itemFields, fieldLabels),
        measures: mapFieldArray(parsed.measures, fieldLabels),
        instanceFilters: mapFilterArray(parsed.instanceFilters, fieldLabels),
        holdingsFilters: mapFilterArray(parsed.holdingsFilters, fieldLabels),
        itemFilters: mapFilterArray(parsed.itemFilters, fieldLabels),
        measuresFilters: mapFilterArray(parsed.measuresFilters, fieldLabels),
      };
    } catch (e) {
      console.warn('Failed to parse form_state from URL:', e);
    }
  }
  return getDefaultFormValues();
};
