/* eslint-disable nonblock-statement-body-position */
import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCallout } from '@folio/stripes/core';
import useURLParams from '../../../../hooks/useURLParams';
import ProductivityReportBuilder from './ProductivityReportBuilder';

function ProductivityReportManager(props) {
  const callout = useCallout();
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
      reportType: 'all',
      includeCreated: true,
      includeUpdated: false,
      includeSuppressed: false,
      includeInstances: true,
      includeHoldings: false,
      includeItems: true,
      selectedFields: {
        staff_username: false,
        first_name: true,
        last_name: true,
        instance_created_by: true, // ضروري للـ drill-down
      },
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

  const executeQuery = (values) => {
    // Validate required fields
    if (!values.reportType) {
      callout.sendCallout({
        type: 'error',
        message: 'Please select a report type.',
      });
      return;
    }

    if (['individual', 'team', 'comparison'].includes(values.reportType)) {
      const hasStaff =
        values.reportType === 'individual'
          ? values.selectedStaff // Selection returns string
          : values.selectedStaff && values.selectedStaff.length > 0; // MultiSelection returns array

      if (!hasStaff) {
        callout.sendCallout({
          type: 'error',
          message: 'Please select staff members for this report type.',
        });
        return;
      }
    }

    if (
      !values.includeCreated &&
      !values.includeUpdated &&
      !values.includeSuppressed
    ) {
      callout.sendCallout({
        type: 'error',
        message:
          'Please select at least one activity type (Created, Updated, or Suppressed).',
      });
      return;
    }

    if (
      !values.includeInstances &&
      !values.includeHoldings &&
      !values.includeItems
    ) {
      callout.sendCallout({
        type: 'error',
        message:
          'Please select at least one productivity type (Instances, Holdings, or Items).',
      });
      return;
    }

    const selectedFields = Object.keys(values.selectedFields || {}).filter(
      (key) => values.selectedFields[key],
    );

    if (selectedFields.length === 0) {
      callout.sendCallout({
        type: 'error',
        message: 'Please select at least one field to generate the report.',
      });
      return;
    }

    // Build Cube.js query for productivity report
    const cubeQuery = {
      measures: [],
      dimensions: [],
      timeDimensions: [],
      filters: [],
      order: {},
    };

    // Build field mapping based on activity types
    const buildFieldMapping = () => {
      const mapping = {
        // Staff Info
        staff_username: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'staff_username',
        },
        first_name: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'first_name',
        },
        last_name: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'last_name',
        },
        email: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'email',
        },
        phone: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'phone',
        },
        staff_barcode: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'staff_barcode',
        },
        departments: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'departments',
        },
        active: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'active',
        },
        type: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'type',
        },
        total_staff: {
          type: 'measure',
          cube: 'cataloging_productivity_view',
          field: 'total_staff',
        },

        // Created By (User ID) - ضروري للـ drill-down
        instance_created_by: {
          type: 'dimension',
          cube: 'cataloging_productivity_view',
          field: 'instance_created_by',
        },

        // Date Dimensions
        staff_created_date: {
          type: 'timeDimension',
          cube: 'cataloging_productivity_view',
          field: 'staff_created_date',
        },
      };

      // Add measures based on productivity types and activity types
      if (values.includeInstances) {
        if (values.includeCreated) {
          mapping.instances_created = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'instances_created',
          };
          mapping.instance_created_date = {
            type: 'timeDimension',
            cube: 'cataloging_productivity_view',
            field: 'instance_created_date',
          };
        }
        if (values.includeUpdated) {
          mapping.instances_updated = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'instances_updated',
          };
          mapping.instance_updated_date = {
            type: 'timeDimension',
            cube: 'cataloging_productivity_view',
            field: 'instance_updated_date',
          };
        }
        if (values.includeSuppressed) {
          mapping.instances_suppressed = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'instances_suppressed',
          };
        }
      }

      if (values.includeHoldings) {
        if (values.includeCreated) {
          mapping.holdings_created = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'holdings_created',
          };
        }
        if (values.includeUpdated) {
          mapping.holdings_updated = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'holdings_updated',
          };
        }
      }

      if (values.includeItems) {
        if (values.includeCreated) {
          mapping.items_created = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'items_created',
          };
        }
        if (values.includeUpdated) {
          mapping.items_updated = {
            type: 'measure',
            cube: 'cataloging_productivity_view',
            field: 'items_updated',
          };
        }
      }

      return mapping;
    };

    const fieldMapping = buildFieldMapping();

    // Add selected fields to query
    selectedFields.forEach((field) => {
      const mapping = fieldMapping[field];
      if (mapping) {
        const fullFieldName = `${mapping.cube}.${mapping.field}`;

        if (mapping.type === 'measure') {
          cubeQuery.measures.push(fullFieldName);
        } else if (mapping.type === 'dimension') {
          cubeQuery.dimensions.push(fullFieldName);
        } else if (mapping.type === 'timeDimension') {
          cubeQuery.timeDimensions.push({
            dimension: fullFieldName,
            granularity: 'day',
          });
        }
      }
    });

    // Add staff filters based on report type
    if (values.reportType !== 'all' && values.selectedStaff) {
      let staffUsernames = [];

      if (values.reportType === 'individual') {
        // Selection returns string
        staffUsernames = [values.selectedStaff];
      } else if (Array.isArray(values.selectedStaff)) {
        // MultiSelection returns array
        staffUsernames = values.selectedStaff.map((staff) => staff.value);
      }

      if (staffUsernames.length > 0) {
        cubeQuery.filters.push({
          member: 'cataloging_productivity_view.staff_username',
          operator: 'equals',
          values: staffUsernames,
        });
      }
    }

    // Add productivity measures automatically based on selected types and activities
    const autoMeasures = [];

    if (values.includeInstances) {
      if (values.includeCreated) {
        autoMeasures.push('cataloging_productivity_view.instances_created');
      }
      if (values.includeUpdated) {
        autoMeasures.push('cataloging_productivity_view.instances_updated');
      }
      if (values.includeSuppressed) {
        autoMeasures.push('cataloging_productivity_view.instances_suppressed');
        autoMeasures.push(
          'cataloging_productivity_view.instances_discovery_suppressed',
        );
        autoMeasures.push(
          'cataloging_productivity_view.instances_staff_suppressed',
        );
      }
    }

    if (values.includeHoldings) {
      if (values.includeCreated) {
        autoMeasures.push('cataloging_productivity_view.holdings_created');
      }
      if (values.includeUpdated) {
        autoMeasures.push('cataloging_productivity_view.holdings_updated');
      }
    }

    if (values.includeItems) {
      if (values.includeCreated) {
        autoMeasures.push('cataloging_productivity_view.items_created');
      }
      if (values.includeUpdated) {
        autoMeasures.push('cataloging_productivity_view.items_updated');
      }
    }

    // Add auto measures to query
    cubeQuery.measures.push(...autoMeasures);

    // Add default measures if none selected
    if (cubeQuery.measures.length === 0) {
      cubeQuery.measures.push('cataloging_productivity_view.total_staff');
    }

    // Add default dimensions if none selected
    if (cubeQuery.dimensions.length === 0) {
      cubeQuery.dimensions.push(
        'cataloging_productivity_view.first_name',
        'cataloging_productivity_view.last_name',
      );
    }

    // Add limit for performance
    cubeQuery.limit = 100;

    // ضروري: إضافة instance_created_by دائماً للـ drill-down
    if (
      !cubeQuery.dimensions.includes(
        'cataloging_productivity_view.instance_created_by',
      )
    ) {
      cubeQuery.dimensions.push(
        'cataloging_productivity_view.instance_created_by',
      );
    }

    // Add order by for comparison reports
    if (values.reportType === 'comparison') {
      cubeQuery.order = {
        'cataloging_productivity_view.instances_created': 'desc',
      };
    }

    // Add date range filters if provided
    if (values.dateRange) {
      const { startDate, endDate } = values.dateRange;

      if (startDate || endDate) {
        const dateFilter = {
          member: 'cataloging_productivity_view.instance_created_date',
        };

        if (startDate && endDate) {
          dateFilter.operator = 'inDateRange';
          dateFilter.values = [startDate, endDate];
        } else if (startDate) {
          dateFilter.operator = 'afterDate';
          dateFilter.values = [startDate];
        } else if (endDate) {
          dateFilter.operator = 'beforeDate';
          dateFilter.values = [endDate];
        }

        cubeQuery.filters.push(dateFilter);
      }
    }

    // Set query using props.setQuery
    props.setQuery({
      ...cubeQuery,
      total: true,
    });
  };

  const onFormSubmit = (values, form) => {
    // Save form state to URL
    setFormState(JSON.stringify(values));
    
    // Execute query with success callback
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
    const defaultValues = {
      reportType: 'all',
      includeCreated: true,
      includeUpdated: false,
      includeSuppressed: false,
      includeInstances: true,
      includeHoldings: false,
      includeItems: true,
      selectedFields: {
        staff_username: false,
        first_name: true,
        last_name: true,
        instance_created_by: true,
      },
    };
    if (form) {
      form.reset(defaultValues);
    }
  };

  const onCancel = () => {
    // Clear current query to stop loading
    props.setQuery('');
  };

  return (
    <ProductivityReportBuilder
      {...props}
      onSubmit={onFormSubmit}
      onReset={onReset}
      onCancel={onCancel}
      initialValues={initialValues}
      formState={formState}
      setFormState={setFormState}
    />
  );
}

ProductivityReportManager.propTypes = {
  showBuilderPane: PropTypes.bool.isRequired,
  setShowBuilderPane: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ProductivityReportManager;
