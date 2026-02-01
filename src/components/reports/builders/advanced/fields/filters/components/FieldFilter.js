/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Select } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Selection } from '@folio/stripes-components';

function FieldFilter({
  field,
  index,
  currentCubeMembers,
  disabled,
  fieldType,
}) {
  const intl = useIntl();

  const getFieldDataOptions = () => {
    const columns = [];
    currentCubeMembers?.forEach((member) => {
      member[fieldType]?.map((option) =>
        columns.push({
          label: option.label || option.name,
          value: option.name,
        }),
      );
    });
    return columns;
  };

  return (
    <>
      <Field
        id={`query-builder-form-fieldFilter-select-${index}`}
        component={Selection}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.fieldFilter.label"
            defaultMessage="Field"
          />
        }
        name={`${field}.member`}
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.fieldFilter.placeholder',
          defaultMessage: 'Choose field name',
        })}
        dataOptions={getFieldDataOptions()}
        disabled={disabled}
      />
    </>
  );
}

FieldFilter.propTypes = {
  field: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentCubeMembers: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FieldFilter;
