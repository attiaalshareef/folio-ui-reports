import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Datepicker, Row, Col } from '@folio/stripes/components';
import { FormattedMessage, useIntl } from 'react-intl';

function DateRangeFilter({ field, index, disabled }) {
  const intl = useIntl();

  return (
    <Row>
      <Col xs={6}>
        <Field
          id={`query-builder-form-dateRange-start-${index}`}
          component={Datepicker}
          name={`${field}.startDate`}
          label={
            <FormattedMessage
              id="ui-reports.filters.dateRange.startDate.label"
              defaultMessage="Start Date"
            />
          }
          placeholder={intl.formatMessage({
            id: 'ui-reports.filters.dateRange.startDate.placeholder',
            defaultMessage: 'Select start date',
          })}
          backendDateStandard="ISO8601"
          disabled={disabled}
        />
      </Col>
      <Col xs={6}>
        <Field
          id={`query-builder-form-dateRange-end-${index}`}
          component={Datepicker}
          name={`${field}.endDate`}
          label={
            <FormattedMessage
              id="ui-reports.filters.dateRange.endDate.label"
              defaultMessage="End Date"
            />
          }
          placeholder={intl.formatMessage({
            id: 'ui-reports.filters.dateRange.endDate.placeholder',
            defaultMessage: 'Select end date',
          })}
          backendDateStandard="ISO8601"
          disabled={disabled}
        />
      </Col>
    </Row>
  );
}

DateRangeFilter.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DateRangeFilter;