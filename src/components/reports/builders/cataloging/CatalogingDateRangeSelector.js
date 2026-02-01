import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Datepicker, Row, Col } from '@folio/stripes/components';

const CatalogingDateRangeSelector = () => {
  return (
    <Accordion
      label={
        <h3>
          <FormattedMessage
            id="ui-reports.catalogingReports.dateRange.title"
            defaultMessage="Date Range"
          />
        </h3>
      }
      id="cataloging-date-range"
    >
      <div style={{ marginBottom: '1rem' }}>
        <FormattedMessage
          id="ui-reports.catalogingReports.dateRange.description"
          defaultMessage="Select date range for your cataloging report:"
        />
      </div>
      <Row>
        <Col xs={12} sm={6}>
          <Field name="startDate">
            {({ input, meta }) => (
              <Datepicker
                {...input}
                label={
                  <FormattedMessage
                    id="ui-reports.catalogingReports.dateRange.startDate"
                    defaultMessage="Start Date"
                  />
                }
                id="cataloging-start-date"
                error={meta.touched && meta.error}
              />
            )}
          </Field>
        </Col>
        <Col xs={12} sm={6}>
          <Field name="endDate">
            {({ input, meta }) => (
              <Datepicker
                {...input}
                label={
                  <FormattedMessage
                    id="ui-reports.catalogingReports.dateRange.endDate"
                    defaultMessage="End Date"
                  />
                }
                id="cataloging-end-date"
                error={meta.touched && meta.error}
              />
            )}
          </Field>
        </Col>
      </Row>
    </Accordion>
  );
};

export default CatalogingDateRangeSelector;
