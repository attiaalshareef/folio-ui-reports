/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Select } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';

function SortByField({ field, index, selectedColumns, selectedMetrics, disabled }) {
  const intl = useIntl();

  const getColumnsValues = (values) => {
    const columns = [];
    for (const key in values) {
      if (key) {
        columns.push(...values[key]);
      }
    }
    return columns;
  };

  return (
    <>
      <Field
        id={`query-builder-form-fieldFilter-select-${index}`}
        component={Select}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.fieldFilter.label"
            defaultMessage="Field"
          />
        }
        name={`${field}.fieldName`}
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.sortByField.placeholder',
          defaultMessage: 'Field name',
        })}
        dataOptions={[...getColumnsValues(selectedColumns), ...selectedMetrics]}
        disabled={disabled}
      />
    </>
  );
}

SortByField.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selectedColumns: PropTypes.object.isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SortByField;
