import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Select } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';

function SortType({ field, index, disabled }) {
  const intl = useIntl();

  const dataOptions = [
    {
      label: 'ASC',
      value: 'asc',
    },
    {
      label: 'DESC',
      value: 'desc',
    },
  ];

  return (
    <>
      <Field
        id={`query-builder-form-sort-type-select-${index}`}
        component={Select}
        label={
          <FormattedMessage
            id="ui-reports.queryBuilder.sortType.label"
            defaultMessage="Type"
          />
        }
        name={`${field}.sortType`}
        placeholder={intl.formatMessage({
          id: 'ui-reports.queryBuilder.sortType.placeholder',
          defaultMessage: 'sort type',
        })}
        dataOptions={dataOptions}
        disabled={disabled}
        defaultValue="asc"
      />
    </>
  );
}

SortType.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SortType;
